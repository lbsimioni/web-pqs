import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

import { ReceitaService } from '../../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-editar-receita-extra',
  templateUrl: './editar-receita-extra.component.html',
  styleUrls: ['./editar-receita-extra.component.css']
})
export class EditarReceitaExtraComponent implements OnInit {

    private receita: any;
    private form: FormGroup;

    private exists: boolean = false;
    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    private listarRota: string[] = ['/menu/receita/extra/consultar'];

    constructor(
        private service: ReceitaService,
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
                this.receita = response.data;
                this.initForm();
                this.carregarExtras();
                this.exists = true;
            }
        )
    }

    private initForm(): void {
        this.form = new FormGroup({
            'codigo': new FormControl(this.receita.codigo),
            'mes': new FormControl(this.receita.mes, [Validators.required]),
            'ano': new FormControl(this.receita.ano, [Validators.required]),
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

        this.receita.extraList.forEach(e => {
            array.push(new FormGroup({
                'codigo': new FormControl(e.codigo),
                'area': new FormControl(e.area, [Validators.required]),
                'valor': new FormControl(e.valor, [Validators.required])
            }));
        });
    }

    salvar(): void {
        /*if (this.form.hasError) {
            this.error = true;
            this.lstErrors = ['testando'];
            return
        }*/

        this.service.alterarExtra(this.form.value).subscribe(
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
