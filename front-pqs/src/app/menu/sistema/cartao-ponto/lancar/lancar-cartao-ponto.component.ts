import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

import { CartaoPontoService } from '../shared';
import { Response } from 'src/app/shared';
import { FuncionarioService } from '../../../cruds/funcionario/shared';

@Component({
  selector: 'app-lancar-cartao-ponto',
  templateUrl: './lancar-cartao-ponto.component.html',
  styleUrls: ['./lancar-cartao-ponto.component.css']
})
export class LancarCartaoPontoComponent implements OnInit {

    form: FormGroup;

    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];
    private errorFind: boolean = false;

    private valido: boolean = false;

    constructor(
        private service: CartaoPontoService,
        private funcionarioService: FuncionarioService
    ) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm(): void {
        this.form = new FormGroup({
            'codigo': new FormControl(''),
            'rg': new FormControl('', [Validators.required]),
            'lstCartaoPonto': new FormArray([]),
            'funcionario': new FormGroup({
                'codigo': new FormControl('', [Validators.required])
            })
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

    get lstCartaoPonto(): AbstractControl[] {
        return (<FormArray>this.form.get('lstCartaoPonto')).controls;
    }

    addCartaoPonto(data?: any): void {
        const array = (<FormArray>this.form.get('lstCartaoPonto'));
        array.push(new FormGroup({
            'data': new FormControl('', [Validators.required]),
            'horarioInic': new FormControl('', [Validators.required]),
            'horarioFim': new FormControl('', [Validators.required])
        }));
        if (!data)
            this.form.markAsDirty();
    }

    removeCartaoPonto(index: number): void {
        (<FormArray>this.form.get('lstCartaoPonto')).removeAt(index);
        this.form.markAsDirty();
    } 

    salvar(): void {

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
                this.valido = false;
            }
        )
    }

    pesquisar(): void {
        let rg = this.form.value.rg;
        this.funcionarioService.obterRg(rg).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.error = true;
                    this.lstErrors = response.errors;
                    return;
                }

                this.form.patchValue({
                    'funcionario': {
                        'codigo': response.data.codigo
                    }
                });
                this.errorFind = false;
                this.error = false;
                this.valido = true;
                this.addCartaoPonto();
            }
        )
        
    }

}
