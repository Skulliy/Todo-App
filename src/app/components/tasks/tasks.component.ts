import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[]= [];

  constructor(private taskservice: TaskService) { }

  ngOnInit(): void {
    this.taskservice.getTasks().subscribe((tasks)=>(this.tasks = tasks));
  }

  deleteTask(task: Task){
    this.taskservice.deleteTask(task).subscribe(()=>(this.tasks = this.tasks.filter((t)=> t.id !== task.id)));
  }
  ondbclick(task: Task){
    task.reminder = !task.reminder;
    this.taskservice.updateTaskReminder(task).subscribe();
  }
  AddTask(task: Task){
    this.taskservice.AddTask(task).subscribe((task) => (this.tasks.push(task)));  }
}
