import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Database, ref, get, set } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-test-creation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './test-creation.component.html',
  styleUrls: ['./test-creation.component.css']
})
export class TestCreationComponent implements OnInit {
  testForm!: FormGroup;
  selectedGameTypes: string[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  schoolGrades: { classId: string; className: string; subject: string }[] = [];
  
  questionTypes = [
    { id: 'findcomposition', name: 'Find Composition' },
    { id: 'WritetheFollowingNumberinLetters', name: 'Write Number in Letters' },
    { id: 'IdentifthUnitsTensHundredsandThousands', name: 'Identify Place Value' }
  ];
  
  difficultyLevels = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' }
  ];
  
  activeTab = 'basic'; 

  constructor(
    private fb: FormBuilder,
    private db: Database,
    private auth: AuthService
  ) {
    this.initForm();
  }

  private initForm() {
    this.testForm = this.fb.group({
      titleAr: ['', [Validators.required]],
      titleEn: ['', [Validators.required]],
      titleFr: ['', [Validators.required]],
      descriptionAr: ['', [Validators.required]],
      descriptionEn: ['', [Validators.required]],
      descriptionFr: ['', [Validators.required]],
      classroomId: ['', Validators.required],
      selectedGames: [[]],
      endDate: ['', Validators.required],
      isActive: [true],
      isSent: [false],
      
      findcomposition: this.fb.group({
        easy: this.fb.group({
          time: [60, Validators.required],
          attemptsAllowed: [3, Validators.required],
          number: [null, Validators.required],
          solution: [[]]
        }),
        medium: this.fb.group({
          time: [45, Validators.required],
          attemptsAllowed: [2, Validators.required],
          number: [null, Validators.required],
          solution: [[]]
        }),
        hard: this.fb.group({
          time: [30, Validators.required],
          attemptsAllowed: [1, Validators.required],
          number: [null, Validators.required],
          solution: [[]]
        })
      }),

      WritetheFollowingNumberinLetters: this.fb.group({
        easy: this.fb.group({
          time: [60, Validators.required],
          attemptsAllowed: [3, Validators.required],
          number: [null, Validators.required],
          solution: [[]]
        }),
        medium: this.fb.group({
          time: [45, Validators.required],
          attemptsAllowed: [2, Validators.required],
          number: [null, Validators.required],
          solution: [[]]
        }),
        hard: this.fb.group({
          time: [30, Validators.required],
          attemptsAllowed: [1, Validators.required],
          number: [null, Validators.required],
          solution: [[]]
        })
      }),

      IdentifthUnitsTensHundredsandThousands: this.fb.group({
        easy: this.fb.group({
          time: [60, Validators.required],
          attemptsAllowed: [3, Validators.required],
          number: [null, Validators.required],
          solution: this.fb.group({
            units: [null, Validators.required],
            tens: [null, Validators.required],
            hundreds: [null, Validators.required],
            thousands: [null, Validators.required]
          })
        }),
        medium: this.fb.group({
          time: [45, Validators.required],
          attemptsAllowed: [2, Validators.required],
          number: [null, Validators.required],
          solution: this.fb.group({
            units: [null, Validators.required],
            tens: [null, Validators.required],
            hundreds: [null, Validators.required],
            thousands: [null, Validators.required]
          })
        }),
        hard: this.fb.group({
          time: [30, Validators.required],
          attemptsAllowed: [1, Validators.required],
          number: [null, Validators.required],
          solution: this.fb.group({
            units: [null, Validators.required],
            tens: [null, Validators.required],
            hundreds: [null, Validators.required],
            thousands: [null, Validators.required]
          })
        })
      }),

      MultipleChoice: this.fb.group({
        time: [30, Validators.required],
        attemptsAllowed: [2, Validators.required],
        question: ['', Validators.required],
        options: this.fb.array([]),
        correctOptionIndex: [0, Validators.required]
      }),

      TrueFalse: this.fb.group({
        time: [20, Validators.required],
        attemptsAllowed: [1, Validators.required],
        question: ['', Validators.required],
        isTrue: [false, Validators.required]
      }),

      ShortAnswer: this.fb.group({
        time: [60, Validators.required],
        attemptsAllowed: [2, Validators.required],
        question: ['', Validators.required],
        answer: ['', Validators.required],
        caseSensitive: [false]
      })
    });

    this.addMultipleChoiceOption();
    this.addMultipleChoiceOption();
  }

  ngOnInit() {
    this.loadSchoolGrades();
  }

  async loadSchoolGrades() {
    try {
      const user = await firstValueFrom(this.auth.getCurrentUserWithRole());
      if (user && user.role === 'Teacher') {
        this.schoolGrades = user.schoolGrades || [];
        if (this.schoolGrades.length > 0) {
          this.testForm.get('classroomId')?.setValue(this.schoolGrades[0].classId);
        }
      } else {
        this.errorMessage = 'Unauthorized access';
      }
    } catch (error) {
      console.error('Error loading school grades:', error);
      this.errorMessage = 'Error loading school grades';
    }
  }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    if (checkbox.checked) {
      if (!this.selectedGameTypes.includes(value)) {
        this.selectedGameTypes.push(value);
      }
    } else {
      this.selectedGameTypes = this.selectedGameTypes.filter(g => g !== value);
    }
    this.testForm.get('selectedGames')?.setValue(this.selectedGameTypes);
  }

  updateNumberArray(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    const values = input.value.split(',').map(x => +x);
    
    const fieldParts = field.split('.');
    if (fieldParts.length === 2) {
      const [exerciseType, difficultyLevel] = fieldParts;
      this.testForm.get(exerciseType)?.get(difficultyLevel)?.get('solution')?.setValue(values);
    } else {
      this.testForm.get(field)?.get('solution')?.setValue(values);
    }
  }

  updateStringArray(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    const values = input.value.split(',').map(x => x.trim());
    
    console.log(`Updating string array for ${field} with values:`, values);
    
    const fieldParts = field.split('.');
    if (fieldParts.length === 2) {
      const [exerciseType, difficultyLevel] = fieldParts;
      
      const exerciseGroup = this.testForm.get(exerciseType);
      const difficultyGroup = exerciseGroup?.get(difficultyLevel);
      
      if (!exerciseGroup || !difficultyGroup) {
        console.error(`Form group not found for ${exerciseType}.${difficultyLevel}`);
        return;
      }
      
      const solutionControl = difficultyGroup.get('solution');
      if (solutionControl) {
        solutionControl.setValue(values);
        solutionControl.markAsDirty();
        solutionControl.markAsTouched();
        console.log(`Value set for ${exerciseType}.${difficultyLevel}.solution:`, values);
      } else {
        console.error(`Control 'solution' not found for ${exerciseType}.${difficultyLevel}`);
      }
    } else {
      const control = this.testForm.get(field)?.get('solution');
      if (control) {
        control.setValue(values);
        control.markAsDirty();
        control.markAsTouched();
        console.log(`Value set for ${field}.solution:`, values);
      } else {
        console.error(`Control 'solution' not found for ${field}`);
      }
    }
  }
  
  get multipleChoiceOptions() {
    return this.testForm.get('MultipleChoice')?.get('options') as FormArray;
  }
  
  get multipleChoiceOptionsArray() {
    return this.multipleChoiceOptions.controls;
  }
  
  addMultipleChoiceOption() {
    this.multipleChoiceOptions.push(this.fb.control('', Validators.required));
  }
  
  removeMultipleChoiceOption(index: number) {
    if (this.multipleChoiceOptions.length > 2) {
      this.multipleChoiceOptions.removeAt(index);
      
      const currentCorrectIndex = this.testForm.get('MultipleChoice')?.get('correctOptionIndex')?.value;
      if (currentCorrectIndex === index) {
        this.testForm.get('MultipleChoice')?.get('correctOptionIndex')?.setValue(0);
      } else if (currentCorrectIndex > index) {
        this.testForm.get('MultipleChoice')?.get('correctOptionIndex')?.setValue(currentCorrectIndex - 1);
      }
    }
  }
  
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  
  private activeDifficultyLevels: Record<string, string> = {
    'findcomposition': 'easy',
    'WritetheFollowingNumberinLetters': 'easy',
    'IdentifthUnitsTensHundredsandThousands': 'easy'
  };
  
  setActiveDifficultyLevel(exerciseType: string, level: string) {
    const previousLevel = this.activeDifficultyLevels[exerciseType];
    
    if (previousLevel === level) return;
    
    this.activeDifficultyLevels[exerciseType] = level;
    
    const exerciseGroup = this.testForm.get(exerciseType);
    if (exerciseGroup) {
      
      
      
    }
  }
  
  getActiveDifficultyLevel(exerciseType: string): string {
    return this.activeDifficultyLevels[exerciseType] || 'easy';
  }

async submitTest() {
  try {
    
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = 'Saving test...';
    
    const user = await firstValueFrom(this.auth.getCurrentUserWithRole());
    if (!user) {
      this.errorMessage = 'Unauthorized access';
      this.loading = false;
      this.successMessage = '';
      return;
    }
    
    const timestamp = Date.now();
    const testId = `test_${timestamp}_${Math.random().toString(36).substring(2, 9)}`;
    
    const formValue = this.testForm.getRawValue();
    
    const testObject: any = {
      id: testId,
      idTeacher: user.uid,
      title: {
        ar: formValue.titleAr || '',
        en: formValue.titleEn || '',
        fr: formValue.titleFr || ''
      },
      description: {
        ar: formValue.descriptionAr || '',
        en: formValue.descriptionEn || '',
        fr: formValue.descriptionFr || ''
      },
      class: formValue.classroomId || '1',
      games: this.selectedGameTypes.length > 0 ? this.selectedGameTypes : ['findcomposition'],
      students: [],
      createdAt: timestamp,
      updatedAt: timestamp,
      endDate: formValue.endDate,
      isActive: formValue.isActive,
      isSent: formValue.isSent
    };
    
    if (this.selectedGameTypes.includes('findcomposition') || this.selectedGameTypes.length === 0) {
      testObject.findcomposition = {
        easy: {
          time: formValue.findcomposition?.easy?.time || 60,
          attemptsAllowed: formValue.findcomposition?.easy?.attemptsAllowed || 3,
          number: formValue.findcomposition?.easy?.number || 10,
          solution: formValue.findcomposition?.easy?.solution || [2, 5]
        },
        medium: {
          time: formValue.findcomposition?.medium?.time || 45,
          attemptsAllowed: formValue.findcomposition?.medium?.attemptsAllowed || 2,
          number: formValue.findcomposition?.medium?.number || 20,
          solution: formValue.findcomposition?.medium?.solution || [4, 5]
        },
        hard: {
          time: formValue.findcomposition?.hard?.time || 30,
          attemptsAllowed: formValue.findcomposition?.hard?.attemptsAllowed || 1,
          number: formValue.findcomposition?.hard?.number || 30,
          solution: formValue.findcomposition?.hard?.solution || [5, 6]
        },
        activeLevel: this.getActiveDifficultyLevel('findcomposition')
      };
    }
    
    if (this.selectedGameTypes.includes('WritetheFollowingNumberinLetters')) {
      testObject.WritetheFollowingNumberinLetters = {
        easy: {
          time: formValue.WritetheFollowingNumberinLetters?.easy?.time || 60,
          attemptsAllowed: formValue.WritetheFollowingNumberinLetters?.easy?.attemptsAllowed || 3,
          number: formValue.WritetheFollowingNumberinLetters?.easy?.number || 10,
          solution: formValue.WritetheFollowingNumberinLetters?.easy?.solution || ['ten']
        },
        medium: {
          time: formValue.WritetheFollowingNumberinLetters?.medium?.time || 45,
          attemptsAllowed: formValue.WritetheFollowingNumberinLetters?.medium?.attemptsAllowed || 2,
          number: formValue.WritetheFollowingNumberinLetters?.medium?.number || 20,
          solution: formValue.WritetheFollowingNumberinLetters?.medium?.solution || ['twenty']
        },
        hard: {
          time: formValue.WritetheFollowingNumberinLetters?.hard?.time || 30,
          attemptsAllowed: formValue.WritetheFollowingNumberinLetters?.hard?.attemptsAllowed || 1,
          number: formValue.WritetheFollowingNumberinLetters?.hard?.number || 30,
          solution: formValue.WritetheFollowingNumberinLetters?.hard?.solution || ['thirty']
        },
        activeLevel: this.getActiveDifficultyLevel('WritetheFollowingNumberinLetters')
      };
    }
    
    if (this.selectedGameTypes.includes('IdentifthUnitsTensHundredsandThousands')) {
      testObject.IdentifthUnitsTensHundredsandThousands = {
        easy: {
          time: formValue.IdentifthUnitsTensHundredsandThousands?.easy?.time || 60,
          attemptsAllowed: formValue.IdentifthUnitsTensHundredsandThousands?.easy?.attemptsAllowed || 3,
          number: formValue.IdentifthUnitsTensHundredsandThousands?.easy?.number || 1234,
          solution: formValue.IdentifthUnitsTensHundredsandThousands?.easy?.solution || {
            units: 4,
            tens: 3,
            hundreds: 2,
            thousands: 1
          }
        },
        medium: {
          time: formValue.IdentifthUnitsTensHundredsandThousands?.medium?.time || 45,
          attemptsAllowed: formValue.IdentifthUnitsTensHundredsandThousands?.medium?.attemptsAllowed || 2,
          number: formValue.IdentifthUnitsTensHundredsandThousands?.medium?.number || 5678,
          solution: formValue.IdentifthUnitsTensHundredsandThousands?.medium?.solution || {
            units: 8,
            tens: 7,
            hundreds: 6,
            thousands: 5
          }
        },
        hard: {
          time: formValue.IdentifthUnitsTensHundredsandThousands?.hard?.time || 30,
          attemptsAllowed: formValue.IdentifthUnitsTensHundredsandThousands?.hard?.attemptsAllowed || 1,
          number: formValue.IdentifthUnitsTensHundredsandThousands?.hard?.number || 9012,
          solution: formValue.IdentifthUnitsTensHundredsandThousands?.hard?.solution || {
            units: 2,
            tens: 1,
            hundreds: 0,
            thousands: 9
          }
        },
        activeLevel: this.getActiveDifficultyLevel('IdentifthUnitsTensHundredsandThousands')
      };
    }
    
    if (this.selectedGameTypes.includes('MultipleChoice')) {
      testObject.MultipleChoice = formValue.MultipleChoice || {
        time: 30,
        attemptsAllowed: 2,
        question: 'Example question',
        options: ['Option 1', 'Option 2'],
        correctOptionIndex: 0
      };
    }
    
    if (this.selectedGameTypes.includes('TrueFalse')) {
      testObject.TrueFalse = formValue.TrueFalse || {
        time: 20,
        attemptsAllowed: 1,
        question: 'Example question',
        isTrue: false
      };
    }
    
    if (this.selectedGameTypes.includes('ShortAnswer')) {
      testObject.ShortAnswer = formValue.ShortAnswer || {
        time: 60,
        attemptsAllowed: 2,
        question: 'Pregunta de ejemplo',
        answer: 'Answer',
        caseSensitive: false
      };
    }
    
    
    await set(ref(this.db, `tests/${testId}`), testObject);
    
    this.successMessage = 'Test saved successfully';
    setTimeout(() => this.successMessage = '', 5000);
    
    this.testForm.reset();
    this.selectedGameTypes = [];
    this.initForm();
    
    this.activeDifficultyLevels = {
      'findcomposition': 'easy',
      'WritetheFollowingNumberinLetters': 'easy',
      'IdentifthUnitsTensHundredsandThousands': 'easy'
    };
    
    return true;
    
  } catch (error) {
    console.error('Error saving the test:', error);
    this.errorMessage = `Error saving: ${error instanceof Error ? error.message : 'Unknown error'}`;
    return false;
  } finally {
    this.loading = false;
  }
}
}
