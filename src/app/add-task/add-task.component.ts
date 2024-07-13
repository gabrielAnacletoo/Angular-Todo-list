import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Tasks } from '../models/tasks.models';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  title = '';
  description = '';
  completed = false;
  
  constructor(private taskService: TaskService) {}

  addTask() {
    if (!this.title || !this.description) {
      return;
    }
    
    const newTask: Tasks = {
      title: this.title,
      description: this.description,
      completed: this.completed,
      created_at: new Date(),
      updated_at: new Date()
    };

    this.taskService.addTask(newTask).subscribe(() => {
      this.taskService.getTasks();
      this.resetForm();
    });
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.completed = false;
  }
}
