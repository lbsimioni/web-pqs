import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

import { DespesaService } from '../../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-cadastrar-despesa-extra',
  templateUrl: './cadastrar-despesa-extra.component.html',
  styleUrls: ['./cadastrar-despesa-extra.component.css']
})
export class CadastrarDespesaExtraComponent implements OnInit {

    form: FormGroup;

    private lstMes: string[][] = [['01', 'Janeiro'], ['02', 'Fevereiro'], ['03', 'Março'], ['04', 'Abril'], ['05', 'Maio'], ['06', 'Junho'],
    ['07', 'Julho'], ['08', 'Agosto'], ['09', 'Setembro'],
    ['10', 'Outubro'], ['11', 'Novembro'], ['12', 'Dezembro']];

    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];
    private errorFind: boolean = false;

    private valido: boolean = false;

    constructor(
        private service: DespesaService
    ) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm(): void {
        this.form = new FormGroup({
            'codigo': new FormControl(''),
            'mes': new FormControl('', [Validators.required]),
            'ano': new FormControl('', [Validators.required]),
            'extraList': new FormArray([])
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

    get extras(): AbstractControl[] {
        return (<FormArray>this.form.get('extraList')).controls;
    }

    addExtra(data?: any): void {
        const array = (<FormArray>this.form.get('extraList'));
        array.push(new FormGroup({
            'area': new FormControl('', [Validators.required]),
            'valor': new FormControl('', [Validators.required])
        }));
        if (!data)
            this.form.markAsDirty();
    }

    removeExtra(index: number): void {
        (<FormArray>this.form.get('extraList')).removeAt(index);
        this.form.markAsDirty();
    } 

    salvar(): void {
        /*if (this.form.hasError) {
            this.error = true;
            this.lstErrors = ['testando'];
            return
        }*/

        this.service.salvarExtra(this.form.value).subscribe(
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
                this.valido = false;
            }
        )
    }

    pesquisar(): void {
        let mes = this.form.value.mes;
        let ano = this.form.value.ano;
            this.service.obterData(mes, ano).subscribe(
                (response: Response) => {
                    if (response.errors && response.errors.length > 0) {
                        this.error = true;
                        this.lstErrors = response.errors;
                        return;
                    }

                    this.form.patchValue({
                        'codigo': response.data.codigo
                    });
                    this.errorFind = false;
                    this.error = false;
                    this.valido = true;
                    this.addExtra();
                }
            )
        
    }

}
