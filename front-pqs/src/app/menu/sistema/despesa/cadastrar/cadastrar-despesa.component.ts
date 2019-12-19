import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DespesaService } from '../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-cadastrar-despesa',
  templateUrl: './cadastrar-despesa.component.html',
  styleUrls: ['./cadastrar-despesa.component.css']
})
export class CadastrarDespesaComponent implements OnInit {

    form: FormGroup;

    private lstMes: string[][] = [['01', 'Janeiro'], ['02', 'Fevereiro'],   ['03', 'Março'], ['04', 'Abril'], ['05', 'Maio'], ['06', 'Junho'], 
    ['07', 'Julho'], ['08', 'Agosto'], ['09', 'Setembro'], 
    ['10', 'Outubro'], ['11', 'Novembro'], ['12', 'Dezembro']];

    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    constructor(
        private service: DespesaService
    ) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm(): void {
        this.form = new FormGroup({
            'mes': new FormControl('', [Validators.required]),
            'ano': new FormControl('', [Validators.required]),
            'contAgua': new FormControl('0.00', [Validators.required]),
            'contEnergia': new FormControl('0.00', [Validators.required]),
            'contInternet': new FormControl('0.00', [Validators.required]),
            'material': new FormControl('0.00', [Validators.required]),
            'compra': new FormControl('0.00', [Validators.required])
        });
        this.form.valueChanges.subscribe(
            (value: any) => {
                if (this.success) this.success = false;
                if (this.error) this.error = false;
                if (this.lstErrors.length > 0) this.lstErrors = [];
                if (this.lstSuccess.length > 0) this.lstSuccess = [];
            }
        );
    }

    salvar(): void {
        /*if (this.form.hasError) {
            this.error = true;
            this.lstErrors = ['testando'];
            return
        }*/

        this.service.salvar(this.form.value).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.error = true;
                    this.lstErrors = response.errors;
                    //to do -> tratar erro do jeito certo
                    return;
                }
                this.error = false;
                this.success = true;
                this.lstSuccess = ['Dados salvos com sucesso!'];
                this.initForm();
            }
        )
    }

}
