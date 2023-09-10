import {Component, Input, OnInit} from '@angular/core';
import {BackendErrorsInterface} from '../../types/backendErrors.interface';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorMessages implements OnInit {
  @Input() backendErrors: BackendErrorsInterface = {};
  errorMessages: string[] = [];

  ngOnInit(): void {
    console.log(this.backendErrors);
    console.log(Object.keys(this.backendErrors));
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      console.log(this.backendErrors[name]);
      const messages = this.backendErrors[name].join(' ');
      return `${messages}`;
    });
    console.log(this.errorMessages);
  }
}
