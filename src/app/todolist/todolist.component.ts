import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  taskArray = [{ taskName: '', isCompleted: false, isEditable: false }];

  constructor() { 
    const savedTasks = localStorage.getItem('tasks');
    this.taskArray = savedTasks ? JSON.parse(savedTasks) : [{ taskName: '', isCompleted: false, isEditable: false }];
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form);

    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditable: false
    })

    localStorage.setItem('tasks', JSON.stringify(this.taskArray));

    form.reset();
  }

  onDelete(index: number) {
    console.log(index);

    this.taskArray.splice(index, 1);

    localStorage.setItem('tasks', JSON.stringify(this.taskArray));
  }

  onCheck(index: number) {
    console.log(this.taskArray);

    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  
    localStorage.setItem('tasks', JSON.stringify(this.taskArray));
  }

  onEdit(index: number) {
    this.taskArray[index].isEditable = true;
  }

  onSave(index: number, newtask: string) {
    this.taskArray[index].taskName = newtask;
    this.taskArray[index].isEditable = false;
    
    localStorage.setItem('tasks', JSON.stringify(this.taskArray));
  }
}