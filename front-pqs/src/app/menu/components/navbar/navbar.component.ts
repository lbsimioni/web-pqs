import { isString } from 'util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    private readonly rotaLogin: string[] = ['/login'];
    private rotaPerfil: string = '/menu/funcionario/editar';
    private user: any;

    private nome;
    private profissao;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        let reload = localStorage['reload'];
        if (isString(reload) && (reload === "true")) {
            localStorage['reload'] = "";
            window.location.reload();
        }

        this.consultar();        
    }

    consultar(): void {
        this.user = JSON.parse(localStorage['usuario']);

        if (this.user !== "") {
            this.nome = this.user.nome;
            this.profissao = this.user.profissao;
        } else {
            this.sair();
        }

    }

    sair(): void {
        localStorage['usuario'] = JSON.stringify("");
        this.router.navigate(this.rotaLogin);
    }

    perfil(): void {
        this.router.navigate([this.rotaPerfil, this.user.codigo])
    }

}
