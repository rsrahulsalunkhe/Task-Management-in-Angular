import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  http: HttpClient = inject(HttpClient);

  CreateTask(task: Task) {
    return this.http.post<{ name: string }>('https://angularhttpclient-27b98-default-rtdb.firebaseio.com/tasks.json', task);
  }

  DeleteTask(id: string | undefined) {
    return this.http.delete('https://angularhttpclient-27b98-default-rtdb.firebaseio.com/tasks/' + id + '.json');
  }

  DeleteAllTask() {
    return this.http.delete('https://angularhttpclient-27b98-default-rtdb.firebaseio.com/tasks.json');
  }

  fetchAllTasks() {
    return this.http.get<{ [key: string]: Task }>('https://angularhttpclient-27b98-default-rtdb.firebaseio.com/tasks.json').pipe(map((response) => {
      let tasks = [];
      for (let key in response) {
        if (response.hasOwnProperty(key)) {
          tasks.push({ ...response[key], id: key });
        }
      }
      return tasks;
    }));
  }

  UpdateTask(id: string | undefined, data: Task) {
    return this.http.put('https://angularhttpclient-27b98-default-rtdb.firebaseio.com/tasks/' + id + '.json', data);
  }
}
