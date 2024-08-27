import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../guard/auth.service';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const val = this.loginForm.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password).pipe(
        catchError(error => {
          this.snackBar.open(error.message, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          return throwError(() => error);
        })
      ).subscribe(
        () => {
          this.router.navigateByUrl('/');
        }
      );
    }
  }
}
