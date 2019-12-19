import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginService } from './shared';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
      LoginService
  ]
})
export class LoginModule { }
