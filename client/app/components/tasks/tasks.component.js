"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var material_1 = require('@angular/material');
var tasks_service_1 = require('../../services/tasks.service');
var TasksComponent = (function () {
    function TasksComponent(snackBar, viewContainerRef, taskService) {
        var _this = this;
        this.snackBar = snackBar;
        this.viewContainerRef = viewContainerRef;
        this.taskService = taskService;
        this.taskService.getTasks()
            .subscribe(function (tasks) {
            _this.tasks = tasks;
        });
    }
    TasksComponent.prototype.showMessage = function (message, title) {
        var config = new material_1.MdSnackBarConfig(this.viewContainerRef);
        this.snackBar.open(message, title, config);
    };
    TasksComponent.prototype.addTask = function (event) {
        var _this = this;
        event.preventDefault();
        var newTask = {
            title: this.title,
            isDone: false
        };
        this.taskService.addTask(newTask)
            .subscribe(function (data) {
            _this.tasks.push(data.task);
            _this.showMessage(data.message, 'Close');
            _this.title = '';
        });
    };
    TasksComponent.prototype.deleteTask = function (id) {
        var _this = this;
        var tasks = this.tasks;
        this.taskService.deleteTask(id)
            .subscribe(function (data) {
            if (data.deletedId == id) {
                _this.showMessage(data.message, 'Close');
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id == id) {
                        tasks.splice(i, 1);
                    }
                }
            }
        });
    };
    TasksComponent.prototype.updateStatus = function (task) {
        var _this = this;
        var _task = {
            _id: task._id,
            title: task.title,
            isDone: !task.isDone
        };
        this.taskService.updateTask(_task)
            .subscribe(function (data) {
            task.isDone = _task.isDone;
            _this.showMessage(data.message, 'Close');
        });
    };
    TasksComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tasks',
            templateUrl: 'tasks.component.html',
            providers: [material_1.MdSnackBar]
        }), 
        __metadata('design:paramtypes', [material_1.MdSnackBar, core_1.ViewContainerRef, tasks_service_1.TaskService])
    ], TasksComponent);
    return TasksComponent;
}());
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map