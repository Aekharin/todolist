import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  private  readonly _http = inject(HttpClient);




taskArray = [{ taskName: '', isCompleted: false, isEditable: false }];
is_check: boolean | null = null;
todo_name: string = '';
todo_list:any[] = [];

editID:number | null = null;
todo_namebefore:string ='';


  constructor() { 
    const savedTasks = localStorage.getItem('tasks');
    this.taskArray = savedTasks ? JSON.parse(savedTasks) : [{ taskName: '', isCompleted: false, isEditable: false }];
  }


  ngOnInit(): void {
    this.onSearch();
  }

  onCreate(){
    const req ={
        todo_name : this.todo_name,
        is_check: this.is_check,
    }

    this._http
    .post('http://localhost:3000/create-todo',req)
    .subscribe({
      next:(result) => console.log(result),
      error:(error)=>console.log(error),
      complete:() =>{
        this.onSearch();
      },
    });
  };

  onEdit(id:number,todo_name:string,is_check:boolean){
    const req ={
        id,
        todo_name,
        is_check,
    }

    this._http
    .post('http://localhost:3000/update',req)
    .subscribe({
      next:(result) => console.log(result),
      error:(error)=>console.log(error),
      complete:() =>{
        this.onSearch();
      },
    });
  };

  onSearch(){


    const req ={
      is_check:JSON.parse((this.is_check as any)),
      //JSON แปลงจาก string ให้is_check ในรูปแบบของตัวแปร any 

    }

    this._http
    .post('http://localhost:3000/read-todo',req)
    .subscribe({
      next:(result : any) => {
        const res = result.data;
        this.todo_list = res;
      },
      error:(error)=>console.log(error),
      complete:() =>console.log("Complete")
    });
  };

  onDelete(id:number){
    const req ={
      id : id,
    };
    this._http
    .delete('http://localhost:3000/delete',{body:req})
    .subscribe({
      next:(result) => console.log(result),
      error:(error)=>console.log(error),
      complete:() =>{
        this.onSearch();
      },
    });
  };
  

  }

//   onSubmit(form: NgForm) {
//     console.log(form);

//     this.taskArray.push({
//       taskName: form.controls['task'].value,
//       isCompleted: false,
//       isEditable: false
//     })

//     localStorage.setItem('tasks', JSON.stringify(this.taskArray));

//     form.reset();
//   }

//   onDelete(index: number) {
//     console.log(index);

//     this.taskArray.splice(index, 1);

//     localStorage.setItem('tasks', JSON.stringify(this.taskArray));
//   }

//   onCheck(index: number) {
//     console.log(this.taskArray);

//     this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  
//     localStorage.setItem('tasks', JSON.stringify(this.taskArray));
//   }

//   onEdit(index: number) {
//     this.taskArray[index].isEditable = true;
//   }

//   onSave(index: number, newtask: string) {
//     this.taskArray[index].taskName = newtask;
//     this.taskArray[index].isEditable = false;
    
//     localStorage.setItem('tasks', JSON.stringify(this.taskArray));
//   }
// }
