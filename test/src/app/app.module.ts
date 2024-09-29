import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from './components/home/home.component'; // Ajusta la ruta según sea necesario
import { TaskComponent } from './components/task/task.component'; // Ajusta la ruta según sea necesario
import { PersonComponent } from './components/person/person.component';
import { AppRoutingModule } from './app-routing.module'; // Ajusta la ruta según sea necesario

import { SkillService } from './services/skill.service';

export function initializeApp(skillService: SkillService) {
  return () => skillService.getSkills();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    TaskComponent,
    HomeComponent,
    PersonComponent,
    AppRoutingModule
  ],
  providers: [
    SkillService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [SkillService],
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
