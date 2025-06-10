import { Injectable } from '@angular/core';
import { Database, ref, get, set, update, remove } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private currentTestId = new BehaviorSubject<string>('');
  currentTest = this.currentTestId.asObservable();

  constructor(private db: Database) {}

  setTestToView(testId: string) {
    localStorage.setItem('currentTestId', testId);
    this.currentTestId.next(testId);
  }

  async getTest(testId: string) {
    try {
      console.log('TestService: Loading test:', testId);
      const snapshot = await get(ref(this.db, `tests/${testId}`));
        if (!snapshot.exists()) {
        throw new Error('Test not found');
      }

      const data = snapshot.val();
      if (!data.title || !data.class) {
        throw new Error('Test data is incomplete');
      }

      return {
        id: testId,
        idTeacher: data.idTeacher || '',
        title: data.title,
        description: data.description || { ar: '', fr: '', en: '' },
        class: data.class,
        findcomposition: this.processGameData(data.findcomposition),
        WritetheFollowingNumberinLetters: this.processWriteNumberData(data.WritetheFollowingNumberinLetters),
        IdentifthUnitsTensHundredsandThousands: this.processPlaceValuesData(data.IdentifthUnitsTensHundredsandThousands),
        isActive: Boolean(data.isActive),
        createdAt: data.createdAt || Date.now()
      };
    } catch (error) {
      console.error('TestService: Error loading test:', error);
      throw error;
    }
  }

  async getTests(): Promise<any[]> {
    try {
      const snapshot = await get(ref(this.db, 'tests'));
      
      if (!snapshot.exists()) {
        return [];
      }

      return Object.entries(snapshot.val())
        .map(([key, value]: [string, any]) => ({
          id: key,
          ...value,
          title: value.title || { ar: '', fr: '', en: '' },
          description: value.description || { ar: '', fr: '', en: '' }
        }));
    } catch (error) {
      console.error('TestService: Error loading tests:', error);
      return [];
    }
  }

  async updateTest(testId: string, updates: any) {
    try {
      await update(ref(this.db, `tests/${testId}`), {
        ...updates,
        updatedAt: Date.now()
      });
      return true;
    } catch (error) {
      console.error('TestService: Error updating test:', error);
      throw new Error('Failed to update test');
    }
  }

  private processGameData(data: any) {
    if (!data) return undefined;
    return {
      time: data.time || 0,
      attemptsAllowed: data.attemptsAllowed || 0,
      number: data.number || 0,
      solution: data.solution || []
    };
  }

  private processWriteNumberData(data: any) {
    if (!data) return undefined;
    return {
      time: data.time || 0,
      attemptsAllowed: data.attemptsAllowed || 0,
      number: data.number || 0,
      solution: data.solution || []
    };
  }

  private processPlaceValuesData(data: any) {
    if (!data) return undefined;
    return {
      time: data.time || 0,
      attemptsAllowed: data.attemptsAllowed || 0,
      number: data.number || 0,
      solution: {
        units: data.solution?.units || 0,
        tens: data.solution?.tens || 0,
        hundreds: data.solution?.hundreds || 0,
        thousands: data.solution?.thousands || 0
      }
    };
  }

  async deleteTest(testId: string) {
    try {
      await remove(ref(this.db, `tests/${testId}`));
      return true;
    } catch (error) {
      console.error('TestService: Error deleting test:', error);
      throw new Error('Failed to delete test');
    }
  }
  async getTeacherTests(teacherId: string): Promise<Array<{id: string; idTeacher: string; status: 'active' | 'inactive'}>> {
    try {
      const testsRef = ref(this.db, 'tests');
      const snapshot = await get(testsRef);
      if (!snapshot.exists()) {
        return [];
      }

      const tests: Array<{id: string; idTeacher: string; status: 'active' | 'inactive'}> = [];
      snapshot.forEach((childSnapshot) => {
        const test = childSnapshot.val();
        if (test.idTeacher === teacherId) {
          tests.push({
            id: childSnapshot.key || '',
            idTeacher: test.idTeacher,
            status: test.status || 'inactive'
          });
        }
      });

      return tests;
    } catch (error) {
      console.error('Error getting teacher tests:', error);
      throw error;
    }
  }
}