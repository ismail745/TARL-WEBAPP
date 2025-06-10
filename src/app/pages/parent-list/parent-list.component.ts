import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Database, ref, get, update, remove } from '@angular/fire/database';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ParentService } from '../../services/parent.service';
import { LanguageService } from '../../services/language.service';

interface ParentSchema {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  dataCompleted: boolean;
  frozen: boolean;
  password: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  childrenSchool: string;
  childrenCount: number;
  childrenList: string[];
  civility: 'Monsieur' | 'Madame';
  nationalId: string;
  role: string;
  academicRole: 'Mother' | 'Father' | 'Guardian';
  createdAt?: number;
  updatedAt?: string;
}

type Language = 'en' | 'ar';

type TranslationKey = 
  | 'parentsList'
  | 'addNewParent'
  | 'search'
  | 'searchPlaceholder'
  | 'filterByStatus'
  | 'filterByRole'
  | 'status'
  | 'role'
  | 'resetFilters'
  | 'refresh'
  | 'loading'
  | 'noParents'
  | 'name'
  | 'phone'
  | 'email'
  | 'children'
  | 'createdAt'
  | 'actions'
  | 'pendingActivation'
  | 'incompleteProfile'
  | 'active'
  | 'all'
  | 'allRoles'
  | 'father'
  | 'mother'
  | 'guardian'
  | 'view'
  | 'edit'
  | 'delete'
  | 'activate'
  | 'confirmActivate'
  | 'confirmDelete'
  | 'activationSuccess'
  | 'activationError'
  | 'deleteSuccess'
  | 'deleteError'
  | 'loadError'
  | 'noPhone'
  | 'noRole';

@Component({
  selector: 'app-parent-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css'],
  host: {
    'class': 'block min-h-screen px-6 py-10',
    'style': 'background-color: #f5f7fa;'
  }
})
export class ParentListComponent implements OnInit {
  parents: ParentSchema[] = [];
  filteredParents: ParentSchema[] = [];
  loading = false;
  error = '';
  success = '';
  searchQuery = '';
  
  sortField = 'name';
  sortDirection = 'asc';
  filterStatus = 'all';
  filterRole = 'all';
  public page = inject(DashboardComponent);
  private selectedParentId: string = '';

  private translations: Record<Language, Record<TranslationKey, string>> = {    'en': {
      'parentsList': 'Parents List',
      'addNewParent': 'Add New Parent',
      'search': 'Search',
      'searchPlaceholder': 'Search by name, email, phone...',
      'filterByStatus': 'Filter by Status',
      'filterByRole': 'Filter by Role',
      'status': 'Status',
      'role': 'Role',
      'resetFilters': 'Reset Filters',
      'refresh': 'Refresh',
      'loading': 'Loading...',
      'noParents': 'No parents found',
      'name': 'Name',
      'phone': 'Phone',
      'email': 'Email',
      'children': 'Children',
      'createdAt': 'Created At',
      'actions': 'Actions',
      'pendingActivation': 'Pending Activation',
      'incompleteProfile': 'Incomplete Profile',
      'active': 'Active',
      'all': 'All',
      'allRoles': 'All Roles',
      'father': 'Father',
      'mother': 'Mother',
      'guardian': 'Guardian',
      'view': 'View Details',
      'edit': 'Edit',
      'delete': 'Delete',
      'activate': 'Activate',      'noPhone': 'No phone',
      'noRole': 'Not specified',
      'confirmActivate': 'Are you sure you want to activate this parent account?',
      'confirmDelete': 'Are you sure you want to delete this parent? This action cannot be undone.',
      'activationSuccess': '✅ Parent account activated successfully',
      'activationError': '❌ Failed to activate parent account',
      'deleteSuccess': '🗑️ Parent deleted successfully',
      'deleteError': '❌ Failed to delete parent',
      'loadError': '❌ Failed to load parents list'
    },    'ar': {
      'parentsList': 'قائمة أولياء الأمور',
      'addNewParent': 'إضافة ولي أمر جديد',
      'search': 'بحث',
      'searchPlaceholder': 'ابحث بالاسم، البريد الإلكتروني، الهاتف...',
      'filterByStatus': 'تصفية حسب الحالة',
      'filterByRole': 'تصفية حسب الدور',
      'status': 'الحالة',
      'role': 'الدور',
      'resetFilters': 'إعادة تعيين الفلاتر',
      'refresh': 'تحديث',
      'loading': 'جاري التحميل...',
      'noParents': 'لم يتم العثور على أولياء أمور',
      'name': 'الاسم',
      'phone': 'الهاتف',
      'email': 'البريد الإلكتروني',
      'children': 'الأطفال',
      'createdAt': 'تاريخ الإنشاء',
      'actions': 'العمليات',
      'pendingActivation': 'في انتظار التفعيل',
      'incompleteProfile': 'الملف غير مكتمل',
      'active': 'نشط',
      'all': 'الكل',
      'allRoles': 'جميع الأدوار',
      'father': 'أب',
      'mother': 'أم',
      'guardian': 'وصي',
      'view': 'عرض التفاصيل',
      'edit': 'تعديل',
      'delete': 'حذف',
      'activate': 'تفعيل',      'noPhone': 'لا يوجد هاتف',
      'noRole': 'غير محدد',
      'confirmActivate': 'هل أنت متأكد من تفعيل حساب ولي الأمر هذا؟',
      'confirmDelete': 'هل أنت متأكد من حذف ولي الأمر؟ لا يمكن التراجع عن هذا الإجراء.',
      'activationSuccess': '✅ تم تفعيل حساب ولي الأمر بنجاح',
      'activationError': '❌ فشل في تفعيل حساب ولي الأمر',
      'deleteSuccess': '🗑️ تم حذف ولي الأمر بنجاح',
      'deleteError': '❌ فشل في حذف ولي الأمر',
      'loadError': '❌ فشل في تحميل قائمة أولياء الأمور'
    }
  };

  constructor(
    private db: Database, 
    private parentServer: ParentService,
    public langService: LanguageService
  ) {}

  async ngOnInit() {
    await this.loadParents();
  }

  private async loadParents() {
    try {
      this.loading = true;
      this.clearMessages();

      const snapshot = await get(ref(this.db, 'users'));

      if (snapshot.exists()) {
        const allUsers = Object.entries(snapshot.val())
          .map(([id, data]: [string, any]) => ({
            id,
            ...data,
            firstname: data.firstname || data.firstName,
            lastname: data.lastname || data.lastName
          }))
          .filter(user => user.role === 'Parent');

        this.parents = allUsers.sort((a, b) => {
          if (a.frozen !== b.frozen) return a.frozen ? -1 : 1;
          return (a.firstname + a.lastname).localeCompare(b.firstname + b.lastname);
        });

        this.applyFilter();
      } else {
        this.parents = [];
        this.filteredParents = [];
      }
    } catch (error) {
      console.error('Error loading parents:', error);
      this.error = '❌ Failed to load parents list';
    } finally {
      this.loading = false;
    }
  }

  applyFilter() {
    const query = this.searchQuery.toLowerCase().trim();
    let filtered = this.parents;
    
    if (query) {
      filtered = filtered.filter(p => {
        const searchText = [
          p.firstname,
          p.lastname,
          p.email,
          p.phone,
          p.nationalId,
          p.childrenSchool,
          p.academicRole
        ].filter(Boolean).join(' ').toLowerCase();
        
        return searchText.includes(query);
      });
    }
    
    if (this.filterStatus !== 'all') {
      filtered = filtered.filter(p => {
        if (this.filterStatus === 'pending') return p.frozen;
        if (this.filterStatus === 'active') return !p.frozen;
        return true;
      });
    }
    
    if (this.filterRole !== 'all') {
      filtered = filtered.filter(p => p.academicRole === this.filterRole);
    }
    
    this.filteredParents = filtered;
    this.sortParents();
  }
  
  sortParents() {
    this.filteredParents.sort((a, b) => {
      let valueA, valueB;
      
      switch(this.sortField) {
        case 'name':
          valueA = `${a.firstname} ${a.lastname}`.toLowerCase();
          valueB = `${b.firstname} ${b.lastname}`.toLowerCase();
          break;
        case 'phone':
          valueA = a.phone || '';
          valueB = b.phone || '';
          break;
        case 'children':
          valueA = a.childrenCount || 0;
          valueB = b.childrenCount || 0;
          break;
        case 'role':
          valueA = a.academicRole || '';
          valueB = b.academicRole || '';
          break;
        case 'status':
          valueA = a.frozen ? 0 : 1;
          valueB = b.frozen ? 0 : 1;
          break;
        case 'createdAt':
          valueA = a.createdAt || 0;
          valueB = b.createdAt || 0;
          break;
        default:
          valueA = `${a.firstname} ${a.lastname}`.toLowerCase();
          valueB = `${b.firstname} ${b.lastname}`.toLowerCase();
      }
      
      const direction = this.sortDirection === 'asc' ? 1 : -1;
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction * valueA.localeCompare(valueB);
      } else {
        return direction * ((valueA as number) - (valueB as number));
      }
    });
  }
  
  changeSortField(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortParents();
  }
  
  resetFilters() {
    this.searchQuery = '';
    this.filterStatus = 'all';
    this.filterRole = 'all';
    this.sortField = 'name';
    this.sortDirection = 'asc';
    this.applyFilter();
  }

  async activateParent(parentId: string) {
    if (!confirm(this.getTranslation('confirmActivate'))) return;
    try {
      this.loading = true;
      this.clearMessages();
      await update(ref(this.db, `users/${parentId}`), {
        frozen: false,
        dataCompleted: true,
        updatedAt: new Date().toISOString()
      });
      await this.loadParents();
      this.success = this.getTranslation('activationSuccess');
    } catch (error) {
      console.error('Error activating parent:', error);
      this.error = this.getTranslation('activationError');
    } finally {
      this.loading = false;
      setTimeout(() => this.clearMessages(), 3000);
    }
  }

  viewParent(selectedParentId: string) {
    this.parentServer.setSelectedParent(selectedParentId);
    this.page.onSectionSelected('view-parent');
  }

  editParent(parentId: string) {
    this.selectedParentId = parentId;
    localStorage.setItem('selectedParentId', parentId);
    this.page.onSectionSelected('edit-parent');
  }

  async deleteParent(parentId: string) {
    if (!confirm(this.getTranslation('confirmDelete'))) return;
    try {
      this.loading = true;
      this.clearMessages();

      const parentSnapshot = await get(ref(this.db, `users/${parentId}`));
      if (!parentSnapshot.exists()) throw new Error('Parent not found');

      await remove(ref(this.db, `users/${parentId}`));
      this.parents = this.parents.filter(p => p.id !== parentId);
      this.applyFilter();
      this.success = this.getTranslation('deleteSuccess');
    } catch (error) {
      console.error('Error deleting parent:', error);
      this.error = this.getTranslation('deleteError');
    } finally {
      this.loading = false;
      setTimeout(() => this.clearMessages(), 3000);
    }
  }

  formatDate(timestamp: string | number): string {
    if (!timestamp) return 'N/A';
    const currentLang = this.langService.getCurrentLanguage();
    return new Date(timestamp).toLocaleDateString(currentLang === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTextAlign(): string {
    return this.langService.getCurrentLanguage() === 'ar' ? 'text-right' : 'text-left';
  }

  getFlexDirection(): string {
    return this.langService.getCurrentLanguage() === 'ar' ? 'flex-row-reverse' : 'flex-row';
  }

  getMarginClass(isIcon: boolean = false): string {
    if (!isIcon) return '';
    return this.langService.getCurrentLanguage() === 'ar' ? 'ml-2' : 'mr-2';
  }
  
  getStatusClass(parent: ParentSchema): string {
    if (parent.frozen) return 'bg-red-100 text-red-800';
    if (!parent.dataCompleted) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  }

  getStatusText(parent: ParentSchema): string {
    if (parent.frozen) return this.getTranslation('pendingActivation');
    if (!parent.dataCompleted) return this.getTranslation('incompleteProfile');
    return this.getTranslation('active');
  }

  clearMessages(): void {
    this.error = '';
    this.success = '';
  }

  refreshList(): void {
    this.loadParents();
  }

  getTranslation(key: TranslationKey): string {
    const currentLang = this.langService.getCurrentLanguage() as Language;
    return this.translations[currentLang]?.[key] || key;
  }

  getRoleTranslationKey(role: string | null | undefined): TranslationKey {
    if (!role) return 'noRole';
    switch(role.toLowerCase()) {
      case 'father': return 'father';
      case 'mother': return 'mother';
      case 'guardian': return 'guardian';
      default: return 'noRole';
    }
  }
}
