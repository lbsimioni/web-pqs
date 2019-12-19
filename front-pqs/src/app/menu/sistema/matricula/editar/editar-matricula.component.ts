import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatriculaService } from '../shared';
import { Response } from 'src/app/shared';
import { dateToString } from 'src/app/shared/parser';

@Component({
  selector: 'app-editar-matricula',
  templateUrl: './editar-matricula.component.html',
  styleUrls: ['./editar-matricula.component.css']
})
export class EditarMatriculaComponent implements OnInit {

    private matricula: any;
    private form: FormGroup;

    private exists: boolean = false;
    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    private listarRota: string[] = ['/menu/matricula/consultar'];

    constructor(
        private service: MatriculaService,
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
                this.matricula = response.data;
                this.initForm();
                this.exists = true;
            }
        )
    }

    private initForm(): void {
        this.form = new FormGroup({
            'codigo': new FormControl(this.matricula.codigo),
            'dataInic': new FormControl(dateToString(new Date(this.matricula.dataInic)), [Validators.required]),
            'dataFim': new FormControl(dateToString(new Date(this.matricula.dataFim)), [Validators.required]),            'dataPagamento': new FormControl(this.matricula.dataPagamento, [Validators.required]),
            'valor': new FormControl(this.matricula.valor, [Validators.required]),
            'desconto': new FormControl(this.matricula.desconto, [Validators.required]),
            'aluno': new FormGroup({
                'codigo': new FormControl(this.matricula.aluno.codigo),
                'nome': new FormControl(this.matricula.aluno.nome, Validators.required),
                'responsavel': new FormGroup({
                    'nome': new FormControl(this.matricula.aluno.responsavel.nome),
                    'rg': new FormControl(this.matricula.aluno.responsavel.rg),
                    'cpf': new FormControl(this.matricula.aluno.responsavel.cpf)
                })
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

                localStorage['success'] = this.form.value.codigo;
                this.router.navigate(this.listarRota);
            }
        )
    }

}
