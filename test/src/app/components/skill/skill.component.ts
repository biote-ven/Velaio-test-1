import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SkillService } from '../../services/skill.service';
import { Person, Skill } from '../../models/task.model';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // Para el autocompletar

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatChipsModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent {
  skillCtrl = new FormControl('');
  filteredSkills: Observable<Skill[]> | undefined;
  availableSkills: Skill[] = [];

  @Input() person: Person | undefined;
  @Output() skillsChanged = new EventEmitter<Skill[]>();

  constructor(private skillService: SkillService) {
    this.skillService.getSkills().subscribe((skills: Skill[]) => {
      this.availableSkills = skills;
      this.filteredSkills = this.skillCtrl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    });
  }

  private _filter(value: string): Skill[] {
    const filterValue = value.toLowerCase();
    return this.availableSkills.filter(skill => skill.name.toLowerCase().includes(filterValue));
  }

  addSkill(skillName: string) {
    if (this.person) {
      const skill: Skill = { name: skillName };
      if (skillName && !this.person.skills.some(s => s.name === skillName)) {
        this.person.skills.push(skill);
        this.skillsChanged.emit(this.person.skills);
        this.skillCtrl.setValue('');
      }
    }
  }

  removeSkill(skill: Skill) {
    if (this.person) {
      const index = this.person.skills.findIndex(s => s.name === skill.name);
      if (index >= 0) {
        this.person.skills.splice(index, 1);
        this.skillsChanged.emit(this.person.skills);
      }
    }
  }
}
