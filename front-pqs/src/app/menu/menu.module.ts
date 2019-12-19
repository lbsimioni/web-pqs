import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import { NavbarComponent, SideBarComponent } from './components';
import { MenuService } from './services';
import { CrudsModule } from './cruds';
import { SistemaModule } from './sistema';
import { MenuComponent } from './menu.component';
import { DashboardModule } from './dashboard';


@NgModule({
  declarations: [
    MenuComponent,
    NavbarComponent,
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CrudsModule,
    DashboardModule,
    SistemaModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    MenuService
  ],
  exports: [
    MenuComponent,
  ]
})
export class MenuModule { }
