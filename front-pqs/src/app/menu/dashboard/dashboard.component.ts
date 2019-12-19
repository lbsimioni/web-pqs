import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

import { RendimentoService } from '../sistema/rendimento/shared';
import { Response } from 'src/app/shared';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    dashboard: any;

    @ViewChild('graficoRendimento', { static: true }) grafico: ElementRef;

    constructor(
        private service: RendimentoService,
        private router: Router
    ) { }

    ngOnInit() {
        this.obterDados();
    }

    obterDados(): void {
        this.service.obterDashboard().subscribe(
            (response: Response) => {

                this.dashboard = response.data;
                this.gerarGrafico();
            }
        )
    }

    gerarGrafico(): void {
        const ctx = this.grafico.nativeElement.getContext('2d');
        const dados = this.dashboard;

        //type, Data, Options
        var chartGraph = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dados.map(x => (x.mes + "/" + x.ano)),
                datasets: [{ // Configuração das colunas, cada label uma coluna.
                    label: "Receita",
                    data: dados.map(x => x.valorLucro),
                    borderWidth: 2,
                    borderColor: 'rgba(255, 230, 00, 1)',
                    backgroundColor: 'rgba(255, 230, 00, .8)'
                },
                {
                    label: "Despesa",
                    data: dados.map(x => x.valorDespesa),
                    borderWidth: 2,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    backgroundColor: 'rgba(255, 0, 0, .8)'

                },
                {
                    label: "Rendimento",
                    data: dados.map(x => x.total),
                    borderWidth: 2,
                    borderColor: 'rgba(52, 46, 110, 1)',
                    backgroundColor: 'rgba(52, 46, 110, .8)'
                },
                ]
            },
            options: { // Configuração geral, formatação
                scales: {
                    yAxes: [{ // Formatação dos itens da linha Y, valores
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'rgb(32, 32, 87)',
                            fontSize: 14
                        }
                    }],
                    xAxes: [{ // Formatação dos itens da linha X, datas
                        ticks: {
                            fontColor: 'rgb(32, 32, 87)',
                            fontSize: 14
                        }
                    }]
                },
                title: { // Formatação do titulo
                    fontColor: 'rgb(32, 32, 87)',
                    display: true,
                    fontSize: 16,
                    text: "Rendimento Semestral"
                },
                legend: { // Formatação da legenda
                    labels: {
                        fontSize: 14,
                        fontColor: 'rgb(32, 32, 87)'
                    }
                },
                maintainAspectRatio: false
            }
        });
    }

}