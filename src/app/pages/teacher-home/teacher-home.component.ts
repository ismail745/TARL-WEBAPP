import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TestService } from '../../services/test.service';
import { StudentService } from '../../services/student.service';
import { from, map } from 'rxjs';
import { Database, ref, query, orderByChild, limitToLast, get } from '@angular/fire/database';
import { DashboardComponent } from '../dashboard/dashboard.component';

interface Activity {
  description: string;
  time: Date;
  type: 'test' | 'student' | 'grade' | 'performance';
  details?: {
    score?: number;
    studentName?: string;
    testName?: string;
    grade?: string;
  };
}

interface Teacher {
  uid: string;
  firstName: string;
  lastName: string;
  role: string;
  emailVerified: boolean;
  schoolGrades?: TeacherClass[];
}

interface TeacherClass {
  classId: string;
  className: string;
}

interface ClassPerformance {
  students: number;
  averageScore: number;
  completionRate: number;
  totalSubmissions: number;
  highestScore: number;
  lowestScore: number;
}

interface Test {
  id: string;
  idTeacher: string;
  title: {
    ar: string;
    fr: string;
    en: string;
  };
  description: {
    ar: string;
    fr: string;
    en: string;
  };
  class: string;
  students: string[];
  games: string[];
  createdAt: number;
  updatedAt?: number;
  status: 'active' | 'inactive';
  isSent?: boolean;
}

interface PerformanceData {
  totalStudents: number;
  activeTests: number;
  completedTests: number;
  averageScore: number;
  classBreakdown: Record<string, ClassPerformance>;
  recentScores: number[];
  weeklyProgress: {
    labels: string[];
    data: number[];
  };
  studentEngagement: {
    active: number;
    inactive: number;
    total: number;
  };
}

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  imports: [CommonModule, RouterLink, DatePipe],
  standalone: true
})
export class TeacherHomeComponent implements OnInit {
  teacherName: string = '';
  today: Date = new Date();
  performanceData: PerformanceData = {
    totalStudents: 0,
    activeTests: 0,
    completedTests: 0,
    averageScore: 0,
    classBreakdown: {},
    recentScores: [],
    weeklyProgress: {
      labels: [],
      data: []
    },
    studentEngagement: {
      active: 0,
      inactive: 0,
      total: 0
    }
  };
  recentActivities: Activity[] = [];
  teacherClasses: TeacherClass[] = [];
  loading = true;
  error: string | null = null;
  constructor(
    private authService: AuthService,
    private testService: TestService,
    private studentService: StudentService,
    private db: Database,
    public page: DashboardComponent
  ) {
    console.log('TeacherHomeComponent initialized');
  }

  ngOnInit() {
    this.loadTeacherData();
  }

  private async loadTeacherData() {
    try {
      const user = await from(this.authService.getCurrentUserWithRole()).toPromise();
      if (!user) {
        this.error = 'Failed to load teacher data';
        return;
      }

      this.teacherName = `${user.firstName} ${user.lastName}`;
      this.teacherClasses = user.schoolGrades || [];

      await Promise.all([
        this.loadPerformanceData(user.uid),
        this.loadStudentData(user.uid),
        this.loadRecentActivities(user.uid),
        this.loadWeeklyProgress(user.uid)
      ]);

      this.loading = false;
    } catch (error) {
      console.error('Error loading teacher data:', error);
      this.error = 'Failed to load dashboard data';
      this.loading = false;
    }
  }

  private async loadPerformanceData(teacherId: string) {
    
    const testsSnapshot = await get(ref(this.db, 'tests'));
    const tests = testsSnapshot.exists() ? 
      Object.values(testsSnapshot.val()).filter((t: any) => t.idTeacher === teacherId) : [];
    
    this.performanceData.activeTests = tests.filter((t: any) => t.status === 'active').length;
    this.performanceData.completedTests = tests.filter((t: any) => t.status === 'inactive').length;

    
    const answersSnapshot = await get(ref(this.db, 'Answers'));
    if (answersSnapshot.exists()) {
      const answers = Object.values(answersSnapshot.val())
        .filter((a: any) => a.idTeacher === teacherId);

      
      const scores = answers.map((a: any) => a.totalScore || 0);
      this.performanceData.averageScore = scores.length > 0 ? 
        Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      this.performanceData.recentScores = scores.slice(-5);

      
      this.calculateClassBreakdown(answers);
    }
  }

  private calculateClassBreakdown(answers: any[]) {
    const breakdown: Record<string, {
      scores: number[],
      students: Set<string>,
      submissions: number
    }> = {};
    
    answers.forEach(answer => {
      const grade = answer.class || 'unknown';
      if (!breakdown[grade]) {
        breakdown[grade] = {
          scores: [],
          students: new Set(),
          submissions: 0
        };
      }
      breakdown[grade].scores.push(answer.totalScore || 0);
      breakdown[grade].students.add(answer.studentId);
      breakdown[grade].submissions++;
    });

    this.performanceData.classBreakdown = Object.entries(breakdown).reduce((acc, [grade, data]) => {
      const scores = data.scores;
      acc[grade] = {
        students: data.students.size,
        averageScore: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
        completionRate: Math.round((data.submissions / data.students.size) * 100),
        totalSubmissions: data.submissions,
        highestScore: Math.max(...scores, 0),
        lowestScore: Math.min(...scores, 0)
      };
      return acc;
    }, {} as Record<string, ClassPerformance>);
  }

  private async loadStudentData(teacherId: string) {
    const students = await this.studentService.getStudents();
    const teacherStudents = students.filter(s => s.linkedTeacherId === teacherId);
    
    this.performanceData.totalStudents = teacherStudents.length;
    
    // Calculate student engagement
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const answersSnapshot = await get(ref(this.db, 'Answers'));
    const recentActiveStudents = new Set();
    
    if (answersSnapshot.exists()) {
      Object.values(answersSnapshot.val())
        .filter((a: any) => a.idTeacher === teacherId)
        .forEach((a: any) => {
          if (new Date(a.date) >= oneWeekAgo) {
            recentActiveStudents.add(a.studentId);
          }
        });
    }

    this.performanceData.studentEngagement = {
      active: recentActiveStudents.size,
      inactive: teacherStudents.length - recentActiveStudents.size,
      total: teacherStudents.length
    };
  }

  private async loadRecentActivities(teacherId: string) {
    try {
      const activities: Activity[] = [];

      // Get test activities
      const testsSnapshot = await get(query(ref(this.db, 'tests'), 
        orderByChild('createdAt'), 
        limitToLast(10)
      ));

      if (testsSnapshot.exists()) {
        Object.entries(testsSnapshot.val())
          .filter(([_, test]: [string, any]) => test.idTeacher === teacherId)
          .forEach(([_, test]: [string, any]) => {
            activities.push({
              description: `New test created: ${test.title.en}`,
              time: new Date(test.createdAt),
              type: 'test',
              details: {
                testName: test.title.en,
                grade: test.class
              }
            });
          });
      }

      // Get student activities
      const answersSnapshot = await get(query(ref(this.db, 'Answers'),
        orderByChild('date'),
        limitToLast(10)
      ));

      if (answersSnapshot.exists()) {
        Object.entries(answersSnapshot.val())
          .filter(([_, answer]: [string, any]) => answer.idTeacher === teacherId)
          .forEach(([_, answer]: [string, any]) => {
            activities.push({
              description: `${answer.studentName || 'Student'} completed test with score: ${answer.totalScore}%`,
              time: new Date(answer.date),
              type: 'performance',
              details: {
                score: answer.totalScore,
                studentName: answer.studentName
              }
            });
          });
      }

      this.recentActivities = activities
        .sort((a, b) => b.time.getTime() - a.time.getTime())
        .slice(0, 10);
    } catch (error) {
      console.error('Error loading activities:', error);
    }
  }

  private async loadWeeklyProgress(teacherId: string) {
    const now = new Date();
    const labels: string[] = [];
    const data: number[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      data.push(0);
    }

    const answersSnapshot = await get(ref(this.db, 'Answers'));
    if (answersSnapshot.exists()) {
      Object.values(answersSnapshot.val())
        .filter((a: any) => a.idTeacher === teacherId)
        .forEach((answer: any) => {
          const answerDate = new Date(answer.date);
          const dayIndex = 6 - Math.floor((now.getTime() - answerDate.getTime()) / (24 * 60 * 60 * 1000));
          if (dayIndex >= 0 && dayIndex < 7) {
            data[dayIndex]++;
          }
        });
    }

    this.performanceData.weeklyProgress = { labels, data };
  }

  getClassPerformance(classId: string): ClassPerformance {
    return (
      this.performanceData.classBreakdown[classId] || {
        students: 0,
        averageScore: 0,
        completionRate: 0,
        totalSubmissions: 0,
        highestScore: 0,
        lowestScore: 0
      }
    );
  }
}
