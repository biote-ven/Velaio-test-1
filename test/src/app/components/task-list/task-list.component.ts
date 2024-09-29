import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

interface Skill {
  name: string;
}

interface Person {
  fullName: string;
  age: number;
  skills: Skill[];
}

interface Task {
  id: number;
  name: string;
  dueDate: Date;
  assignedPersons: Person[];
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  tasks: Task[] = [
    {
      id: 1,
      name: 'Tarea A',
      dueDate: new Date('2024-10-01'),
      assignedPersons: [
        { fullName: 'Juan Pérez', age: 25, skills: [{ name: 'JavaScript' }, { name: 'Angular' }] },
        { fullName: 'María López', age: 30, skills: [{ name: 'TypeScript' }, { name: 'CSS' }] },
      ],
      completed: false,
    },
    {
      id: 2,
      name: 'Tarea B',
      dueDate: new Date('2024-09-25'),
      assignedPersons: [
        { fullName: 'Carlos Gómez', age: 40, skills: [{ name: 'HTML' }, { name: 'SCSS' }] },
      ],
      completed: true,
    },
  ];

  filteredTasks: Task[] = [...this.tasks];
  emptyMessage: string = 'disponibles';

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

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
  }

  // Nueva función para obtener las habilidades de una persona
  getPersonSkills(person: Person): string {
    return person.skills?.map(skill => skill.name).join(', ') || 'No tiene habilidades';
  }
}
