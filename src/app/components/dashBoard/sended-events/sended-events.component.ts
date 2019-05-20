import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { PortfoliosService } from 'src/app/services/portfolios.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { GoogleChartComponent } from 'angular-google-charts';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sended-events',
  templateUrl: './sended-events.component.html',
  styleUrls: ['./sended-events.component.css']
})
export class SendedEventsComponent implements OnInit,OnDestroy {

  backIcon = faArrowLeft;

  @ViewChild('googlechart')
  googlechart: GoogleChartComponent;
  chart = {
    type: 'BarChart',
    data: [],
    myRoles: [
      { role: 'style', type: 'string', index: 2 },
      { role: 'annotation', type: 'string', index: 3 }
    ],
    columnNames: ['domain', 'data'],
    options: {
      width: 400,
      legend: { position: 'none' },
      animation:{
        duration: 500,
        easing: 'inAndOut',
      },
      annotations: {
        textStyle: {
          fontName: 'Times-Roman',
          fontSize: 15,
          bold: true,
          color: '#fff',
          // auraColor: '#fff',
          opacity: 1
        }
      },
      vAxis: {
        textStyle: { color: "#fff", fontSize: "10",fontName: 'telefonicaRegular' },
      },
      hAxis: {
        title: 'Porcentaje de envío',
        titleTextStyle: {
          color: '#fff',
          fontName: 'telefonicaRegular'
        },
        ticks: [0, 100],
        minValue: 100,
        maxValue: 100,
        textStyle: { color: "#fff", fontSize: "10px" },
      },
      bar: { groupWidth: "15" },
      backgroundColor: "transparent",
    },
    width: 550,
    height: 900
  };

  stylesList: any = ['color: #0d9dae; stroke-color: #fff; stroke-width: 1;',
    'color: #d93f72; stroke-color: #fff; stroke-width: 1;',
    'color: #5bc500; stroke-color: #fff; stroke-width: 1;',
    'color: #f9c86a; stroke-color: #fff; stroke-width: 1;',
    'color: #FCCC65; stroke-color: #fff; stroke-width: 1;',
    'color: #A0BE4A; stroke-color: #fff; stroke-width: 1;',
    'color: #E71D36; stroke-color: #fff; stroke-width: 1;',
    'color: #ad6bae; stroke-color: #fff; stroke-width: 1;',
    'color: #707d94; stroke-color: #fff; stroke-width: 1;',
    'color: #f3950d; stroke-color: #fff; stroke-width: 1;',
  ];

  @Input() operation: number;
  listCategories: any = [];
  categoryActivated: string = null;
  idCategoryActivated:number=null;
  refCategoryActivated:number=null;
  timer:any;
  constructor(private portfoliosServices: PortfoliosService, private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.readCategories();
    this.timer=setInterval(() => {
      if (this.categoryActivated==null) {
        this.readCategories();
      } else {
        this.readSubCategories(this.idCategoryActivated,this.stylesList[this.refCategoryActivated]);
      }
    }, 60000);
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

  readCategories() {
    this.portfoliosServices.getDashboard("gestionDiariaCategoriaEventos", this.operation.toString())
      .subscribe(
        item => {
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.chart.data = []
            this.listCategories = item['listaGenericaConsultaResult'];
            item['listaGenericaConsultaResult'].forEach(element => {
              let p: number = Math.round(element.Campo5 != "" ? (element.Campo5 * 100 / element.Campo3) : 0);
              let styleItem: string = this.stylesList[item['listaGenericaConsultaResult'].indexOf(element)];
              let i = [element.Campo2, p, styleItem, p + '%'];
              this.chart.data.push(i)
            });
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        }
      );
  }

  readSubCategories(category: number , style:string) {
    this.portfoliosServices.getDashboard("gestionDiariaSubcategoriaEventos", category.toString())
      .subscribe(
        item => {
          this.listCategories = [];
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            this.chart.data = []

            item['listaGenericaConsultaResult'].forEach(element => {
              let p: number = Math.round(element.Campo5 != "" ? (element.Campo5 * 100 / element.Campo3) : 0);
              let i = [element.Campo2, p, style, p + '%'];
              this.chart.data.push(i)
            });
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        }
      );
  }



  ready(x) {
    if (this.listCategories.length > 0) {
      this.categoryActivated = this.listCategories[x[0].row].Campo2;
      this.idCategoryActivated=this.listCategories[x[0].row].Campo1;
      this.refCategoryActivated=x[0].row;
      this.readSubCategories(this.idCategoryActivated,this.stylesList[x[0].row]);
    }
  }
  viewCategories() {
    this.categoryActivated = null;
    this.idCategoryActivated=null
    this.refCategoryActivated=null;
    this.readCategories();
  }


}
