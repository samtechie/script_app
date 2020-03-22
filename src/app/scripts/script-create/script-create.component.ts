import {
  Component,
  Output,
  OnInit,
  OnDestroy
}
  from '@angular/core';
import { from, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScriptsService } from '../scripts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Script } from '../script.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-script-create',
  templateUrl: './script-create.component.html',
  styleUrls: ['./script-create.component.css']
})
export class ScriptCreateComponent implements OnInit, OnDestroy {
   private mode = 'create';
   private scriptId: string;
   script: Script;
   isLoading = false;
   form: FormGroup;
   private authStatusSub: Subscription;

  constructor(public scriptsService: ScriptsService, public route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    this.form = new FormGroup({
      operation: new FormControl(null, {validators: [Validators.required]}),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('scriptId')) {
        this.mode = 'edit';
        this.scriptId = paramMap.get('scriptId');
        this.isLoading = true;
        this.scriptsService.getScript(this.scriptId).subscribe(scriptData => {
          this.isLoading = false;
          this.script = { id: scriptData._id,
                          operation: scriptData.operation,
                          result: scriptData.result,
                          creator: scriptData.creator
                        };
          this.form.setValue({
            operation: this.script.operation
          });
        });
      } else {
        this.mode = 'create';
        this.scriptId = null;
      }
    })
  }

  //scriptInput: string = "";

  onSaveScript(): void {
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.scriptsService.addScript(this.form.value.operation, "TestResult1");
    } else {
      this.scriptsService.updateScript(this.scriptId, this.form.value.operation, "TestResult1")
    }
    this.form.reset();
  }
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
