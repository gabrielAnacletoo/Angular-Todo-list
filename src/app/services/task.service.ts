import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { BehaviorSubject, Observable } from "rxjs";
import { Tasks } from "../models/tasks.models";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private url = environment.api;
    private tasksSubject = new BehaviorSubject<Tasks[]>([]);

    constructor(private httpClient: HttpClient) {
        this.getTasks();
    }

    getTasks() {
        this.httpClient.get<Tasks[]>(this.url).subscribe(tasks => {
            this.tasksSubject.next(tasks);
        });
    }

    getTasksObservable(): Observable<Tasks[]> {
        return this.tasksSubject.asObservable();
    }

    addTask(task: Tasks): Observable<Tasks> {
        return this.httpClient.post<Tasks>(this.url, task);
    }

    updateTask(task: Tasks): Observable<Tasks> {
        return this.httpClient.put<Tasks>(`${this.url}${task.id}/`, task);
    }

    deleteTask(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.url}${id}`);
    }


}
