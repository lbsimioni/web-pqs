import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

import { CartaoPontoService } from '../shared';
import { Response } from 'src/app/shared';
import { dateToString } from 'src/app/shared/parser';

@Component({
  selector: 'app-editar-cartao-ponto',
  templateUrl: './editar-cartao-ponto.component.html',
  styleUrls: ['./editar-cartao-ponto.component.css']
})
export class EditarCartaoPontoComponent implements OnInit {

    private cp: any;
    private form: FormGroup;

    private exists: boolean = false;
    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    private listarRota: string[] = ['/menu/cartao-ponto/consultar'];

    constructor(
        private service: CartaoPontoService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];
        this.service.obter(id).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.lstErrors = response.errors;
                    this.error = true;
                    return;
                }
                this.cp = response.data;
                this.initForm();
                console.log(this.cp);
                this.carregarCPs();
                this.exists = true;
            }
        )
    }

    private initForm(): void {
        this.form = new FormGroup({
            'funcionario': new FormGroup({
                'rg': new FormControl(this.cp.funcionario.rg, [Validators.required]),
                'nome': new FormControl(this.cp.funcionario.nome, [Validators.required]),
            }),
            'codigo': new FormControl(this.cp.codigo),
            'lstCartaoPonto': new FormArray([]),
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

        this.service.alterar(this.form.value).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.error = true;
                    this.lstErrors = response.errors;
                    return;
                }

                localStorage['success'] = this.cp.funcionario.nome;
                this.router.navigate(this.listarRota);
            }
        )
    }

    carregarCPs(): void {
        const array = (<FormArray>this.form.get('lstCartaoPonto'));

        this.cp.lstCartaoPonto.forEach(e => {
            array.push(new FormGroup({
                'codigo': new FormControl(e.codigo, [Validators.required]),
                'data': new FormControl(dateToString(new Date(e.data)), [Validators.required]),
                'horarioInic': new FormControl(e.horarioInic, [Validators.required]),
                'horarioFim': new FormControl(e.horarioFim, [Validators.required])
            }));
        });
    }

}
