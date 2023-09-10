import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {combineLatest} from 'rxjs';
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers';
import {Store} from '@ngrx/store';
import {authActions} from '../../store/actions';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BackendErrorMessages} from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';
import {LoginRequestInterface} from '../../types/loginRequest.interface';

@Component({
  selector: 'mc-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private fb: FormBuilder, private store: Store) {}
  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.login({request}));
  }
}
