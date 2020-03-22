import { Script } from './script.model';
import { Injectable } from '@angular/core';
import { Subject, from} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/scripts/";

@Injectable({providedIn: 'root'})
export class ScriptsService {
  private scripts: Script[] = [];
  private scriptsUpdated = new Subject<{scripts: Script[], scriptsCount: number }>();

  constructor(private http: HttpClient, private router: Router){}

  getScripts(scriptsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${scriptsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, scripts: any, maxScripts: number}>(BACKEND_URL + queryParams)
    .pipe(map(scriptData => {
       return {scripts :scriptData.scripts.map(script => {
         return {
           operation: script.operation,
           result: script.result,
           id: script._id,
           creator: script.creator
         };
       }), maxScripts: scriptData.maxScripts };
    }))
    .subscribe((modifiedScriptsData) =>{
       this.scripts = modifiedScriptsData.scripts;
       this.scriptsUpdated.next({scripts: [...this.scripts]
        , scriptsCount: modifiedScriptsData.maxScripts});
    });
  }

  getScriptsUpdatedListener(){
    return this.scriptsUpdated.asObservable();
  }

  getScript(id: string){
    return this.http.get<{_id: string, operation: string, result: string, creator: string}>(BACKEND_URL + id);
    //return {...this.scripts.find(s => s.id === id)};
  }

  addScript(operation: string, result:string){
    const script: Script = {id: null, operation: operation, result: result, creator: null};
    this.http.post<{message: string, scriptId: string}>(BACKEND_URL, script)
     .subscribe((responseData) => {
       this.router.navigate(["/"]);
     });

  }

  updateScript(id: string, operation: string, result: string) {
    const script: Script = {id: id, operation: operation, result: result, creator: null }
    this.http.put(BACKEND_URL + id, script)
     .subscribe(response => {
       this.router.navigate(["/"]);
     });
  }

  deleteScript(scriptId: string){
    return this.http.delete(BACKEND_URL + scriptId)

  }
}
