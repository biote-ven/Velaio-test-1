export interface Skill {
    name: string; // Nombre de la habilidad
}
  
export interface Person {
    fullName: string; // Nombre completo
    age: number; // Edad
    skills: Skill[]; // Habilidades (arreglo anidado)
}
  
export interface Task {
    id: number; // Identificador único
    name: string; // Nombre de la tarea
    dueDate: Date; // Fecha límite
    assignedPersons: Person[]; // Personas asociadas
    completed: boolean; // Estado de la tarea
}
  
