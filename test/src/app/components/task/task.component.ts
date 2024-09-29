import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTooltip } from '@angular/material/tooltip';

import { PersonComponent } from '../person/person.component'; 

import { Person, Task } from '../../models/task.model'; 



@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, PersonComponent, MatTooltipModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  // Acceso al Tooltip desde el template
  @ViewChild('tooltip', { static: false }) tooltip!: MatTooltip; // Referencia al Tooltip
  nombreFormControl = new FormControl('', [Validators.required]);

    // Lista de personas para la tarea
    persons: Person[] = [];

    // Objeto Task para crear la tarea
    task: Task = {
      id: 0, // Podría generarse dinámicamente
      name: '',
      dueDate: new Date(), // Fecha de vencimiento por defecto
      assignedPersons: [],
      completed: false
    };

    // Función para recibir la lista de personas del componente hijo
    onPersonsChanged(updatedPersons: Person[]) {
      this.persons = updatedPersons;
      console.log('Personas actualizadas:', this.persons);
      this.showTooltip('Personas actualizadas.', 8000);
    }

    // Función para crear la tarea
    createTask() {
      if (this.nombreFormControl.valid) {
        // Asignar el nombre y las personas a la tarea
        this.task.name = this.nombreFormControl.value!;
        this.task.assignedPersons = [...this.persons]; // Copia de las personas con sus habilidades

        console.log('Tarea creada:', this.task);
        this.showTooltip('Tarea creada.', 8000);
        // Aquí puedes realizar la lógica para guardar la tarea (enviar a un servicio, etc.)

        // Limpiar el formulario y la lista de personas
        this.nombreFormControl.reset();
        this.persons = [];
      } else {
        console.log('Por favor, completa todos los campos correctamente.');
        this.showTooltip('Por favor, completa todos los campos correctamente.', 8000);

      }
    } 
    
    // Función para mostrar el tooltip programáticamente
    showTooltip(message: string, duration: number) {
      if (this.tooltip) {
        this.tooltip.message = message; // Establecer el mensaje del tooltip
        this.tooltip.show(duration); // Mostrar el tooltip por la duración especificada (en milisegundos)
      } else {
        console.error('Tooltip no ha sido inicializado.');
      }
    }

}
