import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card'; // Para las tarjetas visuales
import { MatButtonModule } from '@angular/material/button'; // Para los botones
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTooltip } from '@angular/material/tooltip';

import { SkillComponent } from '../skill/skill.component';
import { Person, Skill } from '../../models/task.model';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    SkillComponent
  ],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  @Output() personsChanged = new EventEmitter<Person[]>(); // Emitir cambios en la lista de personas


  nombreFormControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  edadFormControl = new FormControl(0, [Validators.required, Validators.min(19)]);

   // Para controlar si mostrar el tooltip de error
   showTooltip = false;

  // Lista de personas
  persons: Person[] = [];

   // Persona actual
   person: Person = {
    fullName: '',
    age: 0,
    skills: []
  };

  onSkillsChanged(updatedSkills: Skill[]) {
    this.person.skills = updatedSkills;
    console.log('Habilidades actualizadas:', updatedSkills);
  }

  addPerson() {
    if (this.nombreFormControl.valid && this.edadFormControl.valid) {
      if (this.person.skills.length > 0) {
      // Crear un nuevo objeto Person basado en los campos del formulario
      const newPerson: Person = {
        fullName: this.nombreFormControl.value!,
        age: this.edadFormControl.value!,
        skills: [...this.person.skills] // Copia de las habilidades seleccionadas
      };

      // Agregar la nueva persona a la lista
      this.persons.push(newPerson);

      // Emitir la lista actualizada de personas
      this.personsChanged.emit(this.persons);

      // Limpiar el formulario
      this.nombreFormControl.reset();
      this.edadFormControl.reset();
      this.person.skills = []; // Limpiar las habilidades

      console.log('Persona añadida:', newPerson);
      console.log('Lista de personas:', this.persons);
      }  else {
        // Si no hay habilidades seleccionadas, mostrar tooltip
        this.showTooltip = true;
        console.log('Por favor, selecciona al menos una habilidad.');
      }
    } else {
      console.log('Por favor, completa todos los campos correctamente.');
    }
  }

  // Eliminar persona de la lista
  removePerson(index: number) {
    if (index >= 0 && index < this.persons.length) {
      console.log('Persona eliminada:', this.persons[index]);
      this.persons.splice(index, 1); // Eliminar persona por índice
      this.personsChanged.emit(this.persons); // Emitir la lista actualizada después de eliminar
    }
  }
}
