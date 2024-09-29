import { Injectable } from '@angular/core';
import { Skill } from '../models/task.model'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private skills: Skill[] = [
    { name: 'Programming' },
    { name: 'Communication' },
    { name: 'Leadership' },
    { name: 'Problem Solving' },
    { name: 'Teamwork' },
  ];

  constructor() { }

  // Método para obtener la lista de habilidades
  getSkills(): Skill[] {
    return this.skills;
  }
}
