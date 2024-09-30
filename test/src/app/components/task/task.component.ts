import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'; 
import { Router } from '@angular/router'; 

import { PersonComponent } from '../person/person.component'; 

import { Person, Task } from '../../models/task.model'; 

import { TaskService } from '../../services/task.service';



@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, 
    MatToolbarModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    PersonComponent, 
    MatTooltipModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatCardModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  // Acceso al Tooltip desde el template
  @ViewChild('tooltip', { static: false }) tooltip!: MatTooltip; // Referencia al Tooltip
   
  // Control para el nombre de la tarea
  nombreFormControl = new FormControl('', [Validators.required]);

   // Control para la fecha límite de la tarea
   fechaFormControl = new FormControl(new Date(), [Validators.required]);

    // Lista de personas para la tarea
    persons: Person[] = [];

  // Lista de todas las tareas (obtenidas del servicio)
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    // Suscribirse a las tareas del servicio
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

    // Función para recibir la lista de personas del componente hijo
    onPersonsChanged(updatedPersons: Person[]) {
      this.persons = updatedPersons;
      console.log('Personas actualizadas:', this.persons);
      this.showTooltip('Personas actualizadas exitosamente', 8000);
    }

    // Función para crear la tarea
    createTask() {
      if (this.nombreFormControl.valid && this.fechaFormControl.valid) {

        // Validar si hay personas añadidas
        if (this.persons.length === 0) {
          this.showTooltip('Debes agregar al menos una persona.', 8000);
          return; // Detener si no hay personas
        }

        // Validar habilidades de cada persona
        for (const person of this.persons) {
          if (person.skills.length === 0) {
            this.showTooltip(`La persona ${person.fullName} debe tener al menos una habilidad.`, 8000);
            return; // Detener si alguna persona no tiene habilidades
          }
        }


        const newTask: Task = {
          id: this.tasks.length + 1, // Generar un ID incrementado
          name: this.nombreFormControl.value!,
          dueDate: this.fechaFormControl.value!,
          assignedPersons: [...this.persons],
          completed: false
        };
  
        // Crear la tarea usando el servicio
        this.taskService.createTask(newTask);

        console.log('Tarea creada Exitosamente:', newTask);
        this.showTooltip('Tarea creada Exitosamente', 8000);

        // Redirigir a la página anterior después de crear la tarea
        this.router.navigate(['..']); // Navegar a la página anterior
 
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
