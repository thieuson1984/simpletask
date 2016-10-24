import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AppComponent }   from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import 'hammerjs';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, MaterialModule.forRoot() ],
  declarations: [ AppComponent, TasksComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
