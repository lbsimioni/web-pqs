import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  readonly rotaNovoFunc: string[] = ['/funcionario/cadastrar'];
  readonly rotaConsultarFunc: string[] = ['/funcionario/consultar'];

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  novo(): void {
    this.router.navigate(this.rotaNovoFunc);
  }

  consultar(): void {
    this.router.navigate(this.rotaConsultarFunc);
  }

}
