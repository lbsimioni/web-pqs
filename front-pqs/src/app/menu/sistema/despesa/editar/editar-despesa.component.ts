import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DespesaService } from '../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-editar-despesa',
  templateUrl: './editar-despesa.component.html',
  styleUrls: ['./editar-despesa.component.css']
})
export class EditarDespesaComponent implements OnInit {

    private desp: any;
    private form: FormGroup;

    private exists: boolean = false;
    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    private listarRota: string[] = ['/menu/despesa/consultar'];

    constructor(
        private service: DespesaService,
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
                this.desp = response.data;
                this.initForm();
                this.exists = true;
            }
        )
    }

    private initForm(): void {
        this.form = new FormGroup({
            'codigo': new FormControl(this.desp.codigo),
            'mes': new FormControl(this.desp.mes, [Validators.required]),
            'ano': new FormControl(this.desp.ano, [Validators.required]),
            'contAgua': new FormControl(this.desp.contAgua, [Validators.required]),
            'contEnergia': new FormControl(this.desp.contEnergia, [Validators.required]),
            'contInternet': new FormControl(this.desp.contInternet, [Validators.required]),
            'material': new FormControl(this.desp.material, [Validators.required]),
            'compra': new FormControl(this.desp.compra, [Validators.required])
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

        this.service.alterar(this.form.value).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.error = true;
                    this.lstErrors = response.errors;
                    //to do -> tratar erro do jeito certo
                    return;
                }
                let user = JSON.parse(localStorage['usuario'])

                if (user.codigo == response.data.codigo) {
                    localStorage['usuario'] = JSON.stringify(response.data);
                }

                localStorage['success'] = this.form.value.mes + "/" + this.form.value.ano;
                this.router.navigate(this.listarRota);
            }
        )
    }

}
