import { Injectable } from '@angular/core';
import { Skill } from '../models/task.model'; 
import { Observable, of } from 'rxjs';

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
  getSkills(): Observable<Skill[]> {
    return of(this.skills);
  }
}
