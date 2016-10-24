import { Component, ViewContainerRef } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { TaskService } from '../../services/tasks.service';
import { Task } from '../../models/Task';

@Component({
    moduleId: module.id,
    selector: 'tasks',
    templateUrl: 'tasks.component.html',
    providers: [MdSnackBar]
})

export class TasksComponent { 
    tasks: Task[];
    title: string;

    constructor(private snackBar: MdSnackBar, 
                private viewContainerRef: ViewContainerRef,
                private taskService:TaskService){
        this.taskService.getTasks()
            .subscribe(tasks => {
                this.tasks = tasks;
            });
    }

    showMessage(message, title) {
        var config = new MdSnackBarConfig(this.viewContainerRef);
        this.snackBar.open(message, title, config);
    }

    addTask(event){
        event.preventDefault();
        var newTask = {
            title: this.title,
            isDone: false
        };
        this.taskService.addTask(newTask)
            .subscribe(data => {
                this.tasks.push(data.task);
                this.showMessage(data.message, 'Close');
                this.title = '';
            });
    }

    deleteTask(id){
        var tasks = this.tasks;
        this.taskService.deleteTask(id)
            .subscribe(data => {
                if(data.deletedId == id){
                    this.showMessage(data.message, 'Close');
                    for (var i = 0; i < tasks.length; i++) {
                        if(tasks[i]._id == id){
                            tasks.splice(i, 1);
                        }
                    }
                }
            });
    }

    updateStatus(task){
        var _task = {
            _id: task._id,
            title: task.title,
            isDone: !task.isDone
        };
        this.taskService.updateTask(_task)
            .subscribe(data => {
                task.isDone = _task.isDone;
                this.showMessage(data.message, 'Close');
            });
    }
}
