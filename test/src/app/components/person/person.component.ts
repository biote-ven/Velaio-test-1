import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SkillComponent } from '../skill/skill.component';
import { Person, Skill } from '../../models/task.model';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, SkillComponent],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  nombreFormControl = new FormControl('', [Validators.required]);
  edadFormControl = new FormControl('', [Validators.required]);

  person: Person = {
    fullName: 'John Doe',
    age: 30,
    skills: []
  };

  onSkillsChanged(updatedSkills: Skill[]) {
    console.log('Habilidades actualizadas:', updatedSkills);
  }

}
