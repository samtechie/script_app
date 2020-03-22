import { Component, OnInit, OnDestroy } from '@angular/core';
import { Script } from '../script.model';
import { Subscription } from 'rxjs';
import { ScriptsService } from '../scripts.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-script-list',
  templateUrl: './script-list.component.html',
  styleUrls: ['./script-list.component.css']
})
export class ScriptListComponent implements OnInit, OnDestroy {


  constructor(public scriptsService: ScriptsService, private authService: AuthService) { }

  scripts: Script[] = [];
  isLoading = false;
  totalScripts = 0;
  scriptsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private scriptsSub: Subscription;
  private authStatusSub: Subscription;


  ngOnInit(): void {
    this.isLoading = true;
    this.scriptsService.getScripts(this.scriptsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.scriptsSub = this.scriptsService.getScriptsUpdatedListener().
      subscribe((scriptData: { scripts: Script[], scriptsCount: number }) => {
        this.isLoading = false
        this.totalScripts = scriptData.scriptsCount;
        this.scripts = scriptData.scripts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
     .getAuthStatusListener()
     .subscribe(
      isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();


    });

  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.scriptsPerPage = pageData.pageSize;
    this.scriptsService.getScripts(this.scriptsPerPage, this.currentPage);

  }

  onDelete(scriptId: string) {
    this.isLoading = true;
    this.scriptsService.deleteScript(scriptId)
      .subscribe(() => {
        this.scriptsService.getScripts(this.scriptsPerPage, this.currentPage);
      },()=>{
        this.isLoading = false;
      });

  }

  ngOnDestroy(): void {
    this.scriptsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
  //scripts = [
  //  { operation: 'DoThisThing(string)', result: 'Test1' },
  //  { operation: 'DoThatThing(string)', result: 'Test2' },
  // { operation: 'DoTheOtherThing(string)', result: 'Test3' }
  //]

}
