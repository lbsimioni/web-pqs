import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginService } from '../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    readonly rotaMenu: string[] = ['/menu/dashboard'];
    private password: string = "password";
    private visibility: string = "/assets/imagens/visibility_off-24px.svg";
    error: boolean = false;

    form: FormGroup;

    constructor(
        private router: Router,
        private service: LoginService
        ) { }

    ngOnInit() {
        let user = JSON.parse(localStorage['usuario']);
        if (user !== "") {
            this.router.navigate(this.rotaMenu);
        }
        this.initForm();
    }

    private initForm(): void {
        this.form = new FormGroup({
            'usuario': new FormControl('', [Validators.required]),
            'password': new FormControl('', [Validators.required])
        });
        this.form.valueChanges.subscribe(
            (value: any) => {
                if (this.error) this.error = false;
            }
        );
    }

    alterar(): void {
        if (this.password === "password") {
            this.password = "text";
            this.visibility = "/assets/imagens/visibility-24px.svg";
        } else {
            this.password = "password";
            this.visibility = "/assets/imagens/visibility_off-24px.svg";
        }
    }

    validar(): void {
        this.service.validar(this.form.value).subscribe(
            (response: Response) => {
                console.log(response);
                if (response.status === 401){
                    return;
                }

                if (response.errors && response.errors.length > 0) {
                    this.error = true;
                    return;
                }

                localStorage['reload'] = "true";
                localStorage['usuario'] = JSON.stringify(response.data);
                this.router.navigate(this.rotaMenu);
            }
        )
        
    }

}
