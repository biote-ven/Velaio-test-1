import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { TaskService } from '../../services/task.service';
import { Task, Person } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule, MatToolbarModule, MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit{
  
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  emptyMessage: string = 'disponibles';
  hasChanges: boolean = false; // Bandera para detectar si hay cambios en las tareas

  constructor(private taskService: TaskService) {}

 // Al inicializar el componente, obtenemos las tareas del servicio
  ngOnInit() {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.filterTasks('all'); // Mostrar todas las tareas por defecto
    });
  }

   // Función para aplicar filtros de tareas
   filterTasks(filter: string) {
    if (filter === 'all') {
      this.filteredTasks = [...this.tasks];
      this.emptyMessage = 'disponibles';
    } else if (filter === 'completed') {
      this.filteredTasks = this.tasks.filter((task) => task.completed);
      this.emptyMessage = 'completadas';
    } else if (filter === 'pending') {
      this.filteredTasks = this.tasks.filter((task) => !task.completed);
      this.emptyMessage = 'pendientes';
    }
  }

 // Alternar el estado de completado de una tarea
 toggleTaskCompletion(task: Task) {
  task.completed = !task.completed;
  this.hasChanges = true; // Marcar que hay cambios
}

  // Función para eliminar una persona de una tarea
  removePersonFromTask(task: Task, personIndex: number) {
    task.assignedPersons.splice(personIndex, 1); // Eliminar persona de la lista
    this.hasChanges = true; // Marcar que hay cambios
  }

  // Función para eliminar una habilidad de una persona
  removeSkillFromPerson(task: Task, personIndex: number, skillIndex: number) {
    task.assignedPersons[personIndex].skills.splice(skillIndex, 1); // Eliminar habilidad de la persona
    this.hasChanges = true; // Marcar que hay cambios
  }

 // Función para actualizar las tareas mediante el servicio
 updateTasks() {
  if (this.hasChanges) {
    this.taskService.updateTasks(this.tasks); // Llamar al servicio para actualizar las tareas
    this.hasChanges = false; // Resetear la bandera de cambios
  }
}

// Función para obtener las habilidades de una persona
getPersonSkills(person: Person): string {
  return person.skills?.map((skill) => skill.name).join(', ') || 'No tiene habilidades';
}
}
