import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

import { DespesaService } from '../../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-editar-despesa-extra',
  templateUrl: './editar-despesa-extra.component.html',
  styleUrls: ['./editar-despesa-extra.component.css']
})
export class EditarDespesaExtraComponent implements OnInit {

    private desp: any;
    private form: FormGroup;

    private exists: boolean = false;
    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    private listarRota: string[] = ['/menu/despesa/extra/consultar'];

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
                this.carregarExtras();
                this.exists = true;
            }
        )
    }

    private initForm(): void {
        this.form = new FormGroup({
            'codigo': new FormControl(this.desp.codigo),
            'mes': new FormControl(this.desp.mes, [Validators.required]),
            'ano': new FormControl(this.desp.ano, [Validators.required]),
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

    removeExtra(index: number, codigo: number): void {
        this.service.excluirExtra(this.form.value.codigo, codigo).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.error = true;
                    this.lstErrors = response.errors;
                    return;
                }
                this.error = false;

                (<FormArray>this.form.get('extraList')).removeAt(index);
                this.form.markAsDirty();

            }
        );
        
    } 

    carregarExtras(): void {
        const array = (<FormArray>this.form.get('extraList'));

        this.desp.extraList.forEach(e => {
            array.push(new FormGroup({
                'codigo': new FormControl(e.codigo),
                'area': new FormControl(e.area, [Validators.required]),
                'valor': new FormControl(e.valor, [Validators.required])
            }));
        });
    }

    salvar(): void {

        this.service.alterarExtra(this.form.value).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.error = true;
                    this.lstErrors = response.errors;
                    //to do -> tratar erro do jeito certo
                    return;
                }

                localStorage['success'] = this.form.value.mes + "/" + this.form.value.ano;
                this.router.navigate(this.listarRota);
            }
        )
    }

}
