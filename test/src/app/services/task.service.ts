import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, Person } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Lista de tareas gestionada como un BehaviorSubject para mantener el estado reactivo
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  // Obtener las tareas actuales
  getTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  // Crear una nueva tarea y actualizar la lista
  createTask(task: Task): void {
    const currentTasks = this.getTasks();
    this.tasksSubject.next([...currentTasks, task]);
  }

 // Método para actualizar las tareas
 updateTasks(updatedTasks: Task[]): void {
  const currentTasks = this.getTasks();
  const newTasks = currentTasks.map(task => {
    const updatedTask = updatedTasks.find(t => t.id === task.id);
    return updatedTask ? { ...task, completed: updatedTask.completed } : task;
  });
  this.tasksSubject.next(newTasks);
}  
}
