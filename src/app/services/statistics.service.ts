import { Injectable } from '@angular/core';
import { Database, ref, get, query, orderByChild, startAt, endAt } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

interface RecentActivity {
  id: string;
  studentName: string;
  activityType: 'test' | 'game' | 'practice';
  score: number;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(
    private db: Database,
    private auth: AuthService
  ) {}

  async getActiveStudentsCount(): Promise<number> {
    const currentUser = await firstValueFrom(this.auth.getCurrentUserWithRole());
    if (!currentUser?.uid) return 0;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const answersRef = ref(this.db, 'Answers');
    const recentAnswersQuery = query(
      answersRef,
      orderByChild('date'),
      startAt(sevenDaysAgo.toISOString())
    );

    const snapshot = await get(recentAnswersQuery);
    if (!snapshot.exists()) return 0;

    const activeStudents = new Set();
    Object.values(snapshot.val()).forEach((answer: any) => {
      if (answer.studentId && answer.idTeacher === currentUser.uid) {
        activeStudents.add(answer.studentId);
      }
    });

    return activeStudents.size;
  }

  async getOverallPerformance(): Promise<number> {
    const currentUser = await firstValueFrom(this.auth.getCurrentUserWithRole());
    if (!currentUser?.uid) return 0;

    const answersRef = ref(this.db, 'Answers');
    const snapshot = await get(answersRef);
    
    if (!snapshot.exists()) return 0;

    let totalScore = 0;
    let count = 0;

    Object.values(snapshot.val()).forEach((answer: any) => {
      if (answer.totalScore !== undefined && answer.idTeacher === currentUser.uid) {
        totalScore += answer.totalScore;
        count++;
      }
    });

    return count > 0 ? Math.round(totalScore / count) : 0;
  }

  async getPendingReviewsCount(): Promise<number> {
    const currentUser = await firstValueFrom(this.auth.getCurrentUserWithRole());
    if (!currentUser?.uid) return 0;

    const answersRef = ref(this.db, 'Answers');
    const snapshot = await get(answersRef);
    
    if (!snapshot.exists()) return 0;

    return Object.values(snapshot.val()).reduce((count: number, answer: any) => {
      if (answer.idTeacher === currentUser.uid && 
          (answer.needsReview || (answer.totalScore !== undefined && answer.totalScore < 60))) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  async getRecentActivities(limit: number = 10): Promise<RecentActivity[]> {
    const currentUser = await firstValueFrom(this.auth.getCurrentUserWithRole());
    if (!currentUser?.uid) return [];

    const answersRef = ref(this.db, 'Answers');
    const snapshot = await get(answersRef);
    
    if (!snapshot.exists()) return [];

    return Object.entries(snapshot.val())
      .filter(([_, value]: [string, any]) => value.idTeacher === currentUser.uid)
      .map(([key, value]: [string, any]) => ({
        id: key,
        studentName: value.studentName || 'غير معروف',
        activityType: this.determineActivityType(value),
        score: value.totalScore || 0,
        date: new Date(value.date)
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  }

  private determineActivityType(answer: any): 'test' | 'game' | 'practice' {
    if (answer.isTest) return 'test';
    if (answer.isGame) return 'game';
    return 'practice';
  }
}
