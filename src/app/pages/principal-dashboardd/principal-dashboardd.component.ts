import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassService } from '../../services/class.service';
import { Database, ref, get, update, push, remove, set } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

type Language = 'en' | 'ar';

type TranslationKey = 
  | 'dashboard'
  | 'classes'
  | 'teachers'
  | 'statistics'
  | 'totalStudents'
  | 'totalTeachers'
  | 'totalParents'
  | 'totalClasses'
  | 'newTeachers'
  | 'className'
  | 'level'
  | 'actions'
  | 'edit'
  | 'delete'
  | 'addNew'
  | 'save'
  | 'cancel'
  | 'teacher'
  | 'class'
  | 'subject'
  | 'assign'
  | 'deleteAssignment'
  | 'approve'
  | 'reject'
  | 'confirmDelete'
  | 'confirmReject'
  | 'noPhone'
  | 'noAssignments'
  | 'loading'
  | 'assignments'
  | 'reports'
  | 'affectations';

interface Test {
  idTeacher: string;
  class: string;
  games: string[];
}

@Component({
  selector: 'app-principal-dashboardd',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    BaseChartDirective
  ],
  templateUrl: './principal-dashboardd.component.html',
  styleUrls: ['./principal-dashboardd.component.scss']
})
export class PrincipalDashboarddComponent implements OnInit {
  private translations: Record<Language, Record<TranslationKey, string>> = {
    'en': {
      'dashboard': 'Dashboard',
      'classes': 'Classes',
      'teachers': 'Teachers',
      'statistics': 'Statistics',
      'totalStudents': 'Total Students',
      'totalTeachers': 'Total Teachers',
      'totalParents': 'Total Parents',
      'totalClasses': 'Total Classes',
      'newTeachers': 'New Teachers',
      'className': 'Class Name',
      'level': 'Level',
      'actions': 'Actions',
      'edit': 'Edit',
      'delete': 'Delete',
      'addNew': 'Add New',
      'save': 'Save',
      'cancel': 'Cancel',
      'teacher': 'Teacher',
      'class': 'Class',
      'subject': 'Subject',
      'assign': 'Assign',
      'deleteAssignment': 'Delete Assignment',
      'approve': 'Approve',
      'reject': 'Reject',
      'confirmDelete': 'Are you sure you want to delete this?',
      'confirmReject': 'Are you sure you want to reject this teacher?',
      'noPhone': 'No phone',
      'noAssignments': 'No assignments found',
      'loading': 'Loading...',
      'assignments': 'Assignments',
      'reports': 'Reports',
      'affectations': 'Class Assignments'
    },
    'ar': {
      'dashboard': 'لوحة التحكم',
      'classes': 'الفصول',
      'teachers': 'المعلمون',
      'statistics': 'الإحصائيات',
      'totalStudents': 'إجمالي الطلاب',
      'totalTeachers': 'إجمالي المعلمين',
      'totalParents': 'إجمالي أولياء الأمور',
      'totalClasses': 'إجمالي الفصول',
      'newTeachers': 'المعلمون الجدد',
      'className': 'اسم الفصل',
      'level': 'المستوى',
      'actions': 'الإجراءات',
      'edit': 'تعديل',
      'delete': 'حذف',
      'addNew': 'إضافة جديد',
      'save': 'حفظ',
      'cancel': 'إلغاء',
      'teacher': 'المعلم',
      'class': 'الفصل',
      'subject': 'المادة',
      'assign': 'تعيين',
      'deleteAssignment': 'حذف التعيين',
      'approve': 'موافقة',
      'reject': 'رفض',
      'confirmDelete': 'هل أنت متأكد من الحذف؟',
      'confirmReject': 'هل أنت متأكد من رفض هذا المعلم؟',
      'noPhone': 'لا يوجد هاتف',
      'noAssignments': 'لا توجد تعيينات',
      'loading': 'جاري التحميل...',
      'assignments': 'الواجبات',
      'reports': 'التقارير',
      'affectations': 'تعيينات الفصول'
    }
  };

  // Propriétés pour stocker les données des tests et des réponses
  private tests: any[] = [];
  private answers: any = {};

  activeSection: string = 'dashboard';
  isSidebarOpen: boolean = true;
  isLoading: boolean = false;
  
  statistiques = {
    totalEtudiants: 150,
    totalEnseignants: 25,
    totalParents: 280,
    totalClasses: 12
  };

  niveaux: string[] = ['1AP', '2AP', '3AP', '4AP', '5AP', '6AP'];
  classes: any[] = [];
  classeForm: FormGroup;
  editingClasse: any = null;

  newTeachers: any[] = [];
  currentPrincipalSchool: string = '';
  availableTeachers: any[] = [];
  assignments: any[] = [];
  assignmentForm: FormGroup;

  // Chart configurations
  public performanceChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Taux de Réussite',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }
    ]
  };

  public performanceChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Performance par Classe'
      }
    }
  };

  public performanceChartType = 'bar' as const;

  // Nouvelles propriétés pour les résultats et rapports
  studentResults: any[] = [];
  globalSuccessRate: number = 0;
  completedTestsCount: number = 0;
  globalAverage: number = 0;
  classStatistics: any[] = [];

  constructor(
    private fb: FormBuilder,
    private classService: ClassService,
    private db: Database,
    private auth: AuthService,
    public langService: LanguageService
  ) {
    this.classeForm = this.fb.group({
      name: ['', Validators.required],
      niveau: ['', Validators.required]
    });
    this.assignmentForm = this.fb.group({
      teacherId: ['', Validators.required],
      classId: ['', Validators.required],
      subject: ['', Validators.required]
    });
  }
  selectedSection = ''; 
  onSectionSelected(section: string) {
    this.selectedSection = section;
  }
  // Remplacer les statistiques codées en dur par des calculs dynamiques
  ngOnInit() {
    // Récupérer les données de Firebase
    const dbRef = ref(this.db);
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // Calculer les statistiques
        this.statistiques = {
          totalEtudiants: Object.keys(data.users || {}).filter(key => key.startsWith('stu_')).length,
          totalEnseignants: Object.keys(data.users || {}).filter(key => !key.startsWith('stu_')).length,
          totalParents: 0, // À implémenter selon la structure des parents
          totalClasses: Object.keys(data.classes || {}).length
        };
    
        // Mettre à jour les données pour les graphiques
        this.updateCharts();
      }
    });
    this.getCurrentPrincipalSchool();
    this.loadStatistiques();
    this.loadClasses();
  }

  async getCurrentPrincipalSchool() {
    try {
      this.auth.getCurrentUserWithRole().subscribe({
        next: (userData) => {
          if (userData) {
            this.currentPrincipalSchool = userData.ecole;
            this.loadNewTeachers();
            this.loadAvailableTeachers();
            this.loadAssignmentsFromTeachers(); // Changement ici
          }
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de l\'école du principal:', error);
        }
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'école du principal:', error);
    }
  }

  // Nouvelle méthode pour charger les affectations depuis les enseignants
  async loadAssignmentsFromTeachers() {
    try {
      const usersRef = ref(this.db, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const users = snapshot.val();
        this.assignments = [];
        
        Object.entries(users)
          .filter(([_, data]: [string, any]) => 
            data.role === 'Teacher' && 
            !data.frozen &&
            data.ecole === this.currentPrincipalSchool &&
            data.schoolGrades
          )
          .forEach(([id, data]: [string, any]) => {
            data.schoolGrades.forEach((grade: any) => {
              this.assignments.push({
                id: `${id}-${grade.classId}`,
                teacherId: id,
                teacherName: `${data.firstName} ${data.lastName}`,
                classId: grade.classId,
                className: grade.className,
                subject: grade.subject
              });
            });
          });
      } else {
        this.assignments = [];
      }
    } catch (error) {
      console.error('Erreur lors du chargement des affectations:', error);
    }
  }

  async onSubmitAssignment() {
    if (this.assignmentForm.valid) {
      try {
        const formData = this.assignmentForm.value;
        const teacher = this.availableTeachers.find(t => t.id === formData.teacherId);
        const classe = this.classes.find(c => c.id === formData.classId);
        
        // Mettre à jour schoolGrades de l'enseignant
        const teacherRef = ref(this.db, `users/${formData.teacherId}`);
        const teacherSnapshot = await get(teacherRef);
        if (teacherSnapshot.exists()) {
          const teacherData = teacherSnapshot.val();
          const currentGrades = teacherData.schoolGrades || [];
          
          // Ajouter la nouvelle classe si elle n'existe pas déjà
          const newGrade = {
            classId: formData.classId,
            className: `${classe.name} (${classe.niveau}AP)`,
            subject: formData.subject
          };
          
          if (!currentGrades.some((grade: any) => 
              grade.classId === newGrade.classId && 
              grade.subject === newGrade.subject)) {
            currentGrades.push(newGrade);
            
            await update(teacherRef, {
              schoolGrades: currentGrades
            });
          }
        }
        
        this.assignmentForm.reset();
        await this.loadAssignmentsFromTeachers();
      } catch (error) {
        console.error('Erreur lors de l\'affectation:', error);
      }
    }
  }

  async deleteAssignment(assignmentId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette affectation ?')) {
      try {
        // Extraire l'ID de l'enseignant et l'ID de la classe de l'assignmentId
        const [teacherId, classId] = assignmentId.split('-');
        
        // Mettre à jour schoolGrades de l'enseignant
        const teacherRef = ref(this.db, `users/${teacherId}`);
        const teacherSnapshot = await get(teacherRef);
        if (teacherSnapshot.exists()) {
          const teacherData = teacherSnapshot.val();
          const updatedGrades = (teacherData.schoolGrades || []).filter(
            (grade: any) => grade.classId !== classId
          );
          
          await update(teacherRef, {
            schoolGrades: updatedGrades
          });
        }

        await this.loadAssignmentsFromTeachers();
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'affectation:', error);
      }
    }
  }

  getMatieresForSelectedTeacher(): string[] {
    const teacherId = this.assignmentForm.get('teacherId')?.value;
    if (!teacherId) return [];
    
    const selectedTeacher = this.availableTeachers.find(t => t.id === teacherId);
    if (!selectedTeacher) return [];

    // Diviser la chaîne des matières en tableau et nettoyer les espaces
    return selectedTeacher.matieres_enseignees
      .split(',')
      .map((matiere: string) => matiere.trim())
      .filter((matiere: string) => matiere.length > 0);
  }

  async loadNewTeachers() {
    try {
      const usersRef = ref(this.db, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const users = snapshot.val();
        this.newTeachers = Object.entries(users)
          .map(([id, data]: [string, any]) => ({
            id,
            ...data
          }))
          .filter(user => 
            user.role === 'Teacher' && 
            user.frozen === true &&
            user.ecole === this.currentPrincipalSchool  // Ajout du filtre par école
          );
      }
    } catch (error) {
      console.error('Erreur lors du chargement des nouveaux enseignants:', error);
    }
  }

  async approveTeacher(teacherId: string) {
    try {
      await update(ref(this.db, `users/${teacherId}`), {
        frozen: false
      });
      await this.loadNewTeachers();
    } catch (error) {
      console.error('Erreur lors de l\'approbation de l\'enseignant:', error);
    }
  }

  async rejectTeacher(teacherId: string) {
    if (confirm('Êtes-vous sûr de vouloir rejeter cet enseignant ?')) {
      try {
        await update(ref(this.db, `users/${teacherId}`), {
          role: 'Rejected'
        });
        await this.loadNewTeachers();
      } catch (error) {
        console.error('Erreur lors du rejet de l\'enseignant:', error);
      }
    }
  }

  loadClasses() {
    this.isLoading = true;
    this.classService.getAllClasses().subscribe({
      next: (classes) => {
        this.classes = classes;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des classes:', error);
        this.isLoading = false;
      }
    });
  }

  editClasse(classe: any) {
    this.editingClasse = classe;
    this.classeForm.patchValue({
      name: classe.name,
      niveau: classe.niveau
    });
  }

  onSubmitClasse() {
    if (this.classeForm.valid) {
      this.isLoading = true;
      const formData = {
        ...this.classeForm.value,
        students: this.editingClasse?.students || [], // Ensure students is always an array
        teacher: this.editingClasse?.teacher || null
      };

      if (this.editingClasse) {
        // Mise à jour avec l'ID existant
        this.classService.updateClass(this.editingClasse.id, formData).subscribe({
          next: () => {
            this.loadClasses();
            this.resetForm();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
            this.isLoading = false;
          }
        });
      } else {
        // Création
        this.classService.createClass(formData).subscribe({
          next: () => {
            this.loadClasses();
            this.resetForm();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Erreur lors de la création:', error);
            this.isLoading = false;
          }
        });
      }
    }
  }

  private resetForm() {
    this.classeForm.reset();
    this.editingClasse = null;
  }

  deleteClasse(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette classe ?')) {
      this.isLoading = true;
      this.classService.deleteClass(id).subscribe({
        next: () => {
          this.loadClasses();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.isLoading = false;
        }
      });
    }
  }
    async loadStatistiques() {
        try {
            const usersRef = ref(this.db, 'users');
            const classesRef = ref(this.db, 'classes');
            const testsRef = ref(this.db, 'tests');
            const answersRef = ref(this.db, 'Answers');
            
            const [usersSnapshot, classesSnapshot, testsSnapshot, answersSnapshot] = await Promise.all([
                get(usersRef),
                get(classesRef),
                get(testsRef),
                get(answersRef)
            ]);
    
            let totalEtudiants = 0;
            let totalEnseignants = 0;
            let totalParents = 0;
            let totalClasses = 0;
    
            // Calculer le nombre total d'étudiants
            if (usersSnapshot.exists()) {
                const users = usersSnapshot.val();
                Object.entries(users).forEach(([_, user]: [string, any]) => {
                    if (user.role === 'Student') {
                        totalEtudiants++;
                    } else if (user.role === 'Teacher') {
                        totalEnseignants++;
                    } else if (user.role === 'Parent') {
                        totalParents++;
                    }
                });
            }
    
            // Calculer le nombre total de classes
            if (classesSnapshot.exists()) {
                const classes = classesSnapshot.val();
                totalClasses = Object.keys(classes).length;
            }
    
            // Mettre à jour les statistiques
            this.statistiques = {
                totalEtudiants,
                totalEnseignants,
                totalParents,
                totalClasses
            };

            // Mettre à jour les graphiques si nécessaire
            if (testsSnapshot.exists() && answersSnapshot.exists()) {
                this.updateCharts();
            }
        } catch (error) {
            console.error('Erreur lors du chargement des statistiques:', error);
        }
    }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  select(section: string) {
    this.activeSection = section;
    if (section === 'reports') {
      this.loadStudentResults();
    }
  }

  async loadAvailableTeachers() {
    try {
      const usersRef = ref(this.db, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const users = snapshot.val();
        this.availableTeachers = Object.entries(users)
          .map(([id, data]: [string, any]) => ({
            id,
            ...data
          }))
          .filter(user => 
            user.role === 'Teacher' && 
            user.frozen === false &&
            user.ecole === this.currentPrincipalSchool
          );
      }
    } catch (error) {
      console.error('Erreur lors du chargement des enseignants:', error);
    }
  }

  // Méthode pour mettre à jour les graphiques
  private updateCharts() {
    try {
    const classStats = new Map();
        
        // Regrouper les résultats par classe
    this.studentResults.forEach(result => {
            if (!classStats.has(result.className)) {
                classStats.set(result.className, {
          totalScore: 0,
                    totalAttempts: 0,
                    correctAnswers: 0,
                    count: 0
        });
      }
            
            const stats = classStats.get(result.className);
      stats.totalScore += result.averageScore;
            stats.totalAttempts += result.attempts;
      stats.correctAnswers += (result.successRate * result.attempts) / 100;
            stats.count++;
        });

        // Calculer les moyennes par classe
        const classAverages = new Map();
        classStats.forEach((stats, className) => {
            const averageScore = stats.count > 0 ? stats.totalScore / stats.count : 0;
            const successRate = stats.totalAttempts > 0 ? (stats.correctAnswers / stats.totalAttempts) * 100 : 0;
            classAverages.set(className, { averageScore, successRate });
        });

        // Mettre à jour les données du graphique
        this.performanceChartData = {
            labels: Array.from(classAverages.keys()),
            datasets: [{
                data: Array.from(classAverages.values()).map(stats => stats.successRate),
                label: 'Taux de Réussite',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1
            }]
        };
    } catch (error) {
        console.error('Erreur lors de la mise à jour des graphiques:', error);
    }
  }

  // Méthode améliorée pour charger les résultats
  async loadStudentResults() {
    try {
      const answersRef = ref(this.db, 'Answers');
      const testsRef = ref(this.db, 'tests');
      const usersRef = ref(this.db, 'users');

      const [answersSnapshot, testsSnapshot, usersSnapshot] = await Promise.all([
        get(answersRef),
        get(testsRef),
        get(usersRef)
      ]);
      
      if (answersSnapshot.exists() && testsSnapshot.exists() && usersSnapshot.exists()) {
        const answers = answersSnapshot.val();
        const tests = testsSnapshot.val() as Record<string, Test>;
        const users = usersSnapshot.val();

        this.studentResults = [];
        console.log('Données reçues:', { answers, tests, users });

        // Parcourir les réponses
        if (Array.isArray(answers)) {
          answers.forEach(answer => {
            // Récupérer les informations de l'étudiant
            const studentId = answer.studentId;
            const student = users[studentId];

            if (student) {
              // Récupérer les statistiques globales
              const totalScore = answer.totalScore || 0;
              const totalAttempts = answer.statistics?.totalAttemptsUsed || 0;
              const totalTime = answer.statistics?.totalTimeSpent || 0;
              const correctAnswers = answer.statistics?.correctAnswersCount || 0;
              const incorrectAnswers = answer.statistics?.incorrectAnswersCount || 0;
              const questionCount = correctAnswers + incorrectAnswers;

              // Récupérer les informations du professeur
              const teacherId = answer.idTeacher;
              const teacher = users[teacherId];
              const teacherName = teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Professeur inconnu';

              // Trouver le test associé pour obtenir la classe
              const test = Object.values(tests).find(t => 
                t.idTeacher === teacherId && 
                t.games.some(game => answer.answers[game])
              );

              const className = test?.class || 'Non assigné';

              console.log('Statistiques pour l\'étudiant:', {
                studentId,
                studentName: `${student.firstName} ${student.lastName}`,
                totalScore,
                totalAttempts,
                correctAnswers,
                questionCount,
                className,
                teacherName
              });

              // Calculer les moyennes seulement si l'étudiant a répondu à des questions
              if (questionCount > 0) {
                const averageScore = totalScore / questionCount;
                const successRate = (correctAnswers / questionCount) * 100;
                const averageTime = totalTime / questionCount;

                // Ajouter le résultat
                this.studentResults.push({
                  className: className,
                  studentName: `${student.firstName} ${student.lastName}`,
                  teacherName: teacherName,
                  averageScore: averageScore,
                  successRate: successRate,
                  attempts: totalAttempts,
                  averageTime: averageTime
                });
              }
            }
          });
        }

        // Calculer les statistiques globales
        const validResults = this.studentResults.filter(r => r.attempts > 0);
        this.completedTestsCount = validResults.length;
        
        if (this.completedTestsCount > 0) {
          this.globalAverage = validResults.reduce((acc, curr) => acc + curr.averageScore, 0) / this.completedTestsCount;
          this.globalSuccessRate = validResults.reduce((acc, curr) => acc + curr.successRate, 0) / this.completedTestsCount;
        } else {
          this.globalAverage = 0;
          this.globalSuccessRate = 0;
        }

        console.log('Résultats finaux:', {
          studentResults: this.studentResults,
          completedTestsCount: this.completedTestsCount,
          globalAverage: this.globalAverage,
          globalSuccessRate: this.globalSuccessRate
        });

        // Mettre à jour les graphiques
        this.updateCharts();
      }
    } catch (error) {
      console.error('Erreur lors du chargement des résultats:', error);
    }
  }

  getTranslation(key: TranslationKey): string {
    const lang = this.langService.getCurrentLanguage() as Language;
    return this.translations[lang][key];
  }

  private processStudentResults(answers: any, testsObj: any, classes: any, users: any) {
    if (answers && testsObj) {
        this.studentResults = [];
        console.log('Début du traitement des résultats:', { answers, testsObj });
        
        // Parcourir les tests
        Object.entries(testsObj).forEach(([testId, test]: [string, any]) => {
            const testData = test as any;
            const className = testData.class || 'Non assigné';
            
            // Trouver le professeur qui a créé le test
            const teacherId = testData.idTeacher;
            const teacher = users[teacherId];
            const teacherName = teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Professeur inconnu';
            
            console.log('Traitement du test:', { testId, className, teacherName, games: testData.games });
            
            // Pour chaque jeu dans le test
            testData.games.forEach((gameName: string) => {
                // Vérifier si nous avons des réponses pour ce jeu
                if (answers[gameName]) {
                    console.log('Traitement du jeu:', gameName);
                    
                    // Parcourir les niveaux (easy, medium, hard)
                    let totalScore = 0;
                    let totalAttempts = 0;
                    let totalTime = 0;
                    let correctAnswers = 0;
                    let questionCount = 0;

                    Object.entries(answers[gameName]).forEach(([level, levelData]: [string, any]) => {
                        if (levelData && typeof levelData === 'object') {
                            totalScore += levelData.score || 0;
                            totalAttempts += levelData.attemptsUsed || 0;
                            totalTime += levelData.time || 0;
                            if (levelData.isCorrect) {
                                correctAnswers++;
                            }
                            questionCount++;
                            
                            console.log('Niveau traité:', { 
                                level, 
                                score: levelData.score,
                                attempts: levelData.attemptsUsed,
                                time: levelData.time,
                                isCorrect: levelData.isCorrect
                            });
                        }
                    });

                    // Trouver l'étudiant qui a répondu à ce test
                    const studentId = Object.keys(users).find(userId => {
                        const user = users[userId];
                        return user.role === 'Student' && 
                               user.linkedTeacherId === testData.idTeacher &&
                               user.schoolGrade === className.split(' ')[0].replace('AP', '');
                    });

                    console.log('Étudiant trouvé:', { studentId, questionCount });

                    if (studentId && questionCount > 0) {
                        const student = users[studentId];
                        
                        // Calculer les moyennes
                        const averageScore = totalScore / questionCount;
                        const successRate = (correctAnswers / questionCount) * 100;
                        const averageTime = totalTime / questionCount;

                        console.log('Statistiques calculées:', {
                            studentName: `${student.firstName} ${student.lastName}`,
                            teacherName,
                            averageScore,
                            successRate,
                            attempts: totalAttempts,
                            averageTime
                        });

                        // Ajouter le résultat
                        this.studentResults.push({
                            className: className,
                            studentName: `${student.firstName} ${student.lastName}`,
                            teacherName: teacherName,
                            averageScore: averageScore,
                            successRate: successRate,
                            attempts: totalAttempts,
                            averageTime: averageTime
                        });
                    }
                }
            });
        });

        // Calculer les statistiques globales
        const validResults = this.studentResults.filter(r => r.attempts > 0);
        this.completedTestsCount = validResults.length;
        
        console.log('Résultats valides:', validResults);
        
        // Calculer la moyenne globale
        if (this.completedTestsCount > 0) {
            this.globalAverage = validResults.reduce((acc, curr) => acc + curr.averageScore, 0) / this.completedTestsCount;
            this.globalSuccessRate = validResults.reduce((acc, curr) => acc + curr.successRate, 0) / this.completedTestsCount;
            
            console.log('Statistiques globales:', {
                completedTestsCount: this.completedTestsCount,
                globalAverage: this.globalAverage,
                globalSuccessRate: this.globalSuccessRate
            });
        } else {
            this.globalAverage = 0;
            this.globalSuccessRate = 0;
            console.log('Aucun résultat valide trouvé');
        }

        // Mettre à jour les graphiques
        this.updateCharts();
    } else {
        console.log('Aucune donnée disponible pour le traitement');
    }
  }
}

