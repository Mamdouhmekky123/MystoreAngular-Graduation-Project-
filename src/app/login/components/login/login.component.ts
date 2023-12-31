import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from '../../helpers/validationform';
import { AuthService } from '../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { IssueService } from 'src/app/chatbot/services/issue.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // public loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toast: NgToastService,
    private serviceIssue: IssueService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPath() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(
        this.loginForm.value['email'],
        this.loginForm.value['password']
      );
      this.auth
        .signIn(
          this.convertSpecialCharsToHex(this.loginForm.value['email']),
          this.convertSpecialCharsToHex(this.loginForm.value['password'])
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            this.loginForm.reset();
            localStorage.setItem('token', res.token);
            //     this.auth.storeToken(res.accessToken);
            //     this.auth.storeRefreshToken(res.refreshToken);
            //     const tokenPayload = this.auth.decodedToken();
            //     this.userStore.setFullNameForStore(tokenPayload.name);
            //     this.userStore.setRoleForStore(tokenPayload.role);
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Login Successfully ',
              duration: 5000,
            });
            this.serviceIssue.userName = res.username;
            if (res.username === 'Admin_789') {
              localStorage.setItem('admin', JSON.stringify(res.username));
            } else {
              localStorage.setItem('login', JSON.stringify(res.username));
            }
            this.router.navigate(['/']);
          },
          error: (err) => {
            this.toast.error({
              detail: 'ERROR',
              summary: err.error,
              duration: 5000,
            });
            console.log(err);
          },
        });
    } else {
      console.log('Error');
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
  convertSpecialCharsToHex(inputString: string): string {
    let outputString = '';

    for (let i = 0; i < inputString.length; i++) {
      const char = inputString.charAt(i);

      if (/^[!$'()*+,/:-@_~-]+$/.test(char)) {
        outputString += '%' + char.charCodeAt(0).toString(16).toUpperCase();
      } else {
        outputString += char;
      }
    }

    return outputString;
  }
}
