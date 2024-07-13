import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Tasks } from '../models/tasks.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Tasks[]>;
  isMobile: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks$ = this.taskService.getTasksObservable();
    this.checkIfMobile();

  }

  toggleTaskCompletion(task: Tasks): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe(updatedTask => {
        task = updatedTask;
        this.tasks$ = this.taskService.getTasksObservable();
    });
  }

  editTask(task: Tasks): void {
    task.editing = true; 
  }

  saveTask(task: Tasks): void {
    task.editing = false; 
    this.taskService.updateTask(task).subscribe(updatedTask => {
        task = updatedTask;
        this.tasks$ = this.taskService.getTasksObservable();
    });
  }

  cancelEdit(task: Tasks): void {
    task.editing = false; 
  }

  deleteTask(taskId: string): void {
    const idAsNumber = parseInt(taskId);
    this.taskService.deleteTask(idAsNumber).subscribe(() => {
      this.taskService.getTasks(); 
    });
  }

  checkIfMobile() {
    if (window.innerWidth <= 768) { 
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  
}
