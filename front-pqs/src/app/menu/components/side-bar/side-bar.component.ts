import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

    readonly dashboard: string[] = ['/menu/dashboard'];
    readonly cadastrarFunc: string[] = ['/menu/funcionario/cadastrar'];
    readonly consultarFunc: string[] = ['/menu/funcionario/consultar'];

    readonly cadastrarAluno: string[] = ['/menu/aluno/cadastrar'];
    readonly consultarAluno: string[] = ['/menu/aluno/consultar'];

    readonly cadastraResp: string[] = ['/menu/responsavel/cadastrar'];
    readonly consultarResp: string[] = ['/menu/responsavel/consultar'];

    readonly lancarCP: string[] = ['/menu/cartao-ponto/lancar'];
    readonly consultarCP: string[] = ['/menu/cartao-ponto/consultar'];
    readonly consultarCH: string[] = ['/menu/banco-horas/consultar'];

    readonly cadastraDesp: string[] = ['/menu/despesa/cadastrar'];
    readonly consultarDesp: string[] = ['/menu/despesa/consultar'];

    readonly cadastraDespExtra: string[] = ['/menu/despesa/extra/cadastrar'];
    readonly consultarDespExtra: string[] = ['/menu/despesa/extra/consultar'];

    readonly consultarReceita: string[] = ['/menu/receita/consultar'];

    readonly cadastraReceitaExtra: string[] = ['/menu/receita/extra/cadastrar'];
    readonly consultarReceitaExtra: string[] = ['/menu/receita/extra/consultar'];

    readonly cadastrarMatricula: string[] = ['/menu/matricula/cadastrar'];
    readonly consultarMatricula: string[] = ['/menu/matricula/consultar'];
    readonly consultarMensalidade: string[] = ['/menu/mensalidade/consultar'];

    readonly cadastrarProduto: string[] = ['/menu/produto/cadastrar'];
    readonly consultarProduto: string[] = ['/menu/produto/consultar'];
    readonly consultarVendas: string[] = ['/menu/produto/vendas/consultar'];
    readonly consultarEntradas: string[] = ['/menu/produto/entrada/consultar'];

    readonly consultarRendimento: string[] = ['/menu/rendimento/consultar'];

    constructor() { }

    ngOnInit() {
    }

}
