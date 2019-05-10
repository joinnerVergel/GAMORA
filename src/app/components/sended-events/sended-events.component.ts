import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { PortfoliosService } from 'src/app/services/portfolios.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


declare var zingchart: any;
var drilldownDataStructureFixed = {};
var drilldownDataStructureMobile = {};
drilldownDataStructureFixed = {
  "series": [
    {
      "values": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      "bar-width": "14px",
      "background-color": "#d9e4eb",
      "fill-angle": 90,
      "tooltip": {
        "visible": false
      },
      "valueBox": {
        "visible": false,
      },
    },
    {
      "values": [],
      "bar-width": "12px",
      "valueBox": {
        "text": '%v%',
        "visible": true,
        "text-align": "right",
        "font-color": "#8391a5",
        "font-family": "Arial",
        "font-size": "10px",
      },
      "rules": [
        {
          "rule": "%i==0",
          "background-color": "#FA8452",
        },
        {
          "rule": "%i==1",
          "background-color": "rgba(13,157,174,1)"
        },
        {
          "rule": "%i==2",
          "background-color": "#FCCC65"
        },
        {
          "rule": "%i==3",
          "background-color": "#A0BE4A"
        },
        {
          "rule": "%i==4",
          "background-color": "#E71D36"
        },
        {
          "rule": "%i==5",
          "background-color": "#ad6bae"
        },
        {
          "rule": "%i==6",
          "background-color": "#707d94"
        },
        {
          "rule": "%i==7",
          "background-color": "#f3950d"
        },
        {
          "rule": "%i==8",
          "background-color": "#e62163"
        },
        {
          "rule": "%i==9",
          "background-color": "#4e74c0"
        },
      ]
    },


  ]
};

drilldownDataStructureMobile = {
  "series": [
    {
      "values": [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      "bar-width": "14px",
      "background-color": "#d9e4eb",
      "fill-angle": 90,
      "tooltip": {
        "visible": false
      },
      "valueBox": {
        "visible": false,
      },
    },
    {
      "values": [],
      "bar-width": "12px",
      "valueBox": {
        "text": '%v%',
        "visible": true,
        "text-align": "right",
        "font-color": "#8391a5",
        "font-family": "Arial",
        "font-size": "10px",
      },
      "rules": [
        {
          "rule": "%i==0",
          "background-color": "#FA8452",
        },
        {
          "rule": "%i==1",
          "background-color": "rgba(13,157,174,1)"
        },
        {
          "rule": "%i==2",
          "background-color": "#FCCC65"
        },
        {
          "rule": "%i==3",
          "background-color": "#A0BE4A"
        },
        {
          "rule": "%i==4",
          "background-color": "#E71D36"
        },
        {
          "rule": "%i==5",
          "background-color": "#ad6bae"
        },
        {
          "rule": "%i==6",
          "background-color": "#707d94"
        },
        {
          "rule": "%i==7",
          "background-color": "#f3950d"
        },
        {
          "rule": "%i==8",
          "background-color": "#e62163"
        },
        {
          "rule": "%i==9",
          "background-color": "#4e74c0"
        },
      ]
    },


  ]
};


var myConfigEmpty = {
  "series": [{ "values": [] }]
}

var myConfig = {
  "graphset": [
    {
      "type": "hbar",
      "background-color": "#fff",
      "border-color": "#dae5ec",
      "border-width": "1px",
      // "height": "70%",
      // "width": "40%",
      "noData": {
        "text": "No hay categorias por gestionar",
        "backgroundColor": "rgba(0,0,0,0.5)",
        "font-color": "#FFFFFF",
        "fontSize": "10px",
        "textAlpha": .9,
        "alpha": .6,
        "bold": true
      },
      "title": {
        "margin-top": "6px",
        "margin-left": "5px",
        "font-family": "Arial",
        "text": "",
        "background-color": "none",
        "shadow": 0,
        "text-align": "center",
        "font-size": "11px",
        "font-weight": "bold",
        "font-color": "#707d94"
      },
      "plot": {
        "cursor": 'pointer',

        "bars-overlap": "100%",
        "borderRadius": 2,
        "hover-state": {
          "visible": false
        },
        "animation": {
          "delay": 300,
          "effect": 3,
          "speed": "500",
          "method": "0",
          "sequence": "3"
        },
      },
      "plotarea": {
        "margin": "40px 40px 20px 20px",
      },
      "scaleX": {
        "line-color": "none",
        "values": [],
        "tick": {
          "visible": false
        },
        "guide": {
          "visible": false
        },
        "item": {
          "width": 200,
          "text-align": "left",
          "offset-x": 206,
          "offset-y": -12,
          "font-color": "#8391a5",
          "font-family": "Arial",
          "font-size": "11px",
          "padding-bottom": "15px"
        }

      },
      "scaleY": {
        "visible": false,
        "guide": {
          "visible": false
        }
      },
      "shapes": [
        {
          'x': 15,
          'y': 20,
          'size': 5,
          'angle': -90,
          'type': 'triangle',
          'background-color': '#d9e4eb',
          'padding': 5,
          'cursor': 'hand',
          'id': 'Categoria',
          'hover-state': {
            'border-width': 1,
            'border-color': '#000'
          }
        }
      ],
      "series": [],
    },
    {
      "type": "hbar",
      "background-color": "#fff",
      "border-color": "#dae5ec",
      "border-width": "1px",
      // "height": "70%",
      // "width": "40%",
      "noData": {
        "text": "No hay categorias por gestionar",
        "backgroundColor": "rgba(0,0,0,0.5)",
        "font-color": "#FFFFFF",
        "fontSize": "10px",
        "textAlpha": .9,
        "alpha": .6,
        "bold": true
      },
      "title": {
        "margin-top": "6px",
        "margin-left": "5px",
        "font-family": "Arial",
        "text": "",
        "background-color": "none",
        "shadow": 0,
        "text-align": "center",
        "font-size": "11px",
        "font-weight": "bold",
        "font-color": "#707d94"
      },
      "plot": {
        "cursor": 'pointer',

        "bars-overlap": "100%",
        "borderRadius": 2,
        "hover-state": {
          "visible": false
        },
        "animation": {
          "delay": 300,
          "effect": 3,
          "speed": "500",
          "method": "0",
          "sequence": "3"
        },
      },
      "plotarea": {
        "margin": "40px 40px 20px 20px",
      },
      "scaleX": {
        "line-color": "none",
        "values": [],
        "tick": {
          "visible": false
        },
        "guide": {
          "visible": false
        },
        "item": {
          "width": 200,
          "text-align": "left",
          "offset-x": 206,
          "offset-y": -12,
          "font-color": "#8391a5",
          "font-family": "Arial",
          "font-size": "11px",
          "padding-bottom": "15px"
        }

      },
      "scaleY": {
        "visible": false,
        "guide": {
          "visible": false
        }
      },
      "shapes": [
        {
          'x': 15,
          'y': 20,
          'size': 5,
          'angle': -90,
          'type': 'triangle',
          'background-color': '#d9e4eb',
          'padding': 5,
          'cursor': 'hand',
          'id': 'Categoria',
          'hover-state': {
            'border-width': 1,
            'border-color': '#000'
          }
        }
      ],
      "series": [],
    }
  ]
}
var scaleText1;
var scaleText2;

var indexCategory1 = null;
var indexCategory2 = null;
var rCategories1 = null;
var rCategories2 = null;
var catg = ['SMS SIMPLE', 'SMS DOBLE VIA', 'MAIL', 'AUDIO', 'SAT PUSH', 'TV', 'WEB']
var idChart = "";

@Component({
  selector: 'app-sended-events',
  templateUrl: './sended-events.component.html',
  styleUrls: ['./sended-events.component.css']
})
export class SendedEventsComponent implements OnInit,OnDestroy {



  categoriesChartFixed: boolean = true;
  categoriesChartMobile: boolean = true;
  viewSubcategoryFixed: string = null;
  viewSubcategoryMobile: string = null;
  timer:any;
  constructor(private portfoliosServices: PortfoliosService, private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.readCategoriesFixed();
    this.readCategoriesMobile();
    this.timer=setInterval(() => {
      if (this.categoriesChartFixed) {
        this.readCategoriesFixed()
      } else {
        this.readSubcategoriesFixed(indexCategory1 + 1);
      }
      if (this.categoriesChartMobile) {
        this.readCategoriesMobile()
      } else {
         this.readSubcategoriesMobile(indexCategory2 + 9);
      }
    }, 60000);
  }
  ngOnDestroy(){
    clearInterval(this.timer);
  }

  ngAfterViewChecked() {
    this.viewSubcategoryFixed = scaleText1;
    if (this.viewSubcategoryFixed != null) {
      scaleText1 = null;
      this.viewSubcategoryFixed = null;
      this.readSubcategoriesFixed(indexCategory1 + 1);
    }
    if (rCategories1 != null) {
      rCategories1 = null;
      this.readCategoriesFixed();
    }
    this.viewSubcategoryMobile = scaleText2;
    if (this.viewSubcategoryMobile != null) {
      scaleText2 = null;
      this.viewSubcategoryMobile = null;
      this.readSubcategoriesMobile(indexCategory1 + 9);
    }
    if (rCategories2 != null) {
      rCategories2 = null;
      this.readCategoriesMobile();
    }
  }
  readCategoriesFixed() {
    this.portfoliosServices.getDashboard("gestionDiariaCategoriaEventos", "1")
      .subscribe(
        item => {
          this.categoriesChartFixed = true;
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            var categoriesNames = [];
            var categoriesValues = [];
            item['listaGenericaConsultaResult'].forEach(element => {
              categoriesNames.push(element.Campo2);
              categoriesValues.push(Math.round(element.Campo5 != "" ? (element.Campo5 * 100 / element.Campo3) : 0));
            });
            if (categoriesValues.length == 0) {
              myConfig['series'] = myConfigEmpty['series'];
            } else {
              myConfig["graphset"][0]['scaleX']['values'] = categoriesNames;
              drilldownDataStructureFixed['series'][1]['values'] = categoriesValues;
              myConfig["graphset"][0]['series'] = drilldownDataStructureFixed['series'];
            }
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        },

        () => {
          myConfig["graphset"][0]['shapes'] = [];
          myConfig["graphset"][0]['title']['text'] = "CATEGORIA DE EVENTOS FIJA";
          zingchart.render({
            id: 'myChart1',
            data: myConfig["graphset"][0]
          });
          zingchart.node_click = function (p) {
            var plotIndex = p.plotindex;
            scaleText1 = p.scaletext;
            indexCategory1 = catg.indexOf(scaleText1);
          }
          rCategories1 = null;
        });
  }

  readCategoriesMobile() {
    this.portfoliosServices.getDashboard("gestionDiariaCategoriaEventos", "2")
      .subscribe(
        item => {
          this.categoriesChartMobile = true;
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            var categoriesNames = [];
            var categoriesValues = [];
            item['listaGenericaConsultaResult'].forEach(element => {
              categoriesNames.push(element.Campo2);
              categoriesValues.push(Math.round(element.Campo5 != "" ? (element.Campo5 * 100 / element.Campo3) : 0));
            });
            if (categoriesValues.length == 0) {
              myConfig['series'] = myConfigEmpty['series'];
            } else {
              myConfig["graphset"][1]['scaleX']['values'] = categoriesNames;
              drilldownDataStructureMobile['series'][1]['values'] = categoriesValues;
              myConfig["graphset"][1]['series'] = drilldownDataStructureMobile['series'];
            }
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        },

        () => {
          myConfig["graphset"][1]['shapes'] = [];
          myConfig["graphset"][1]['title']['text'] = "CATEGORIA DE EVENTOS MÓVIL";
          zingchart.render({
            id: 'myChart2',
            data: myConfig["graphset"][1]
          });
          zingchart.node_click = function (p) {
            var plotIndex = p.plotindex;
            scaleText2 = p.scaletext;
            indexCategory2 = catg.indexOf(scaleText2);
          }
          rCategories2 = null;
        });
  }



  readSubcategoriesFixed(cc:number) {
    this.portfoliosServices.getDashboard("gestionDiariaSubcategoriaEventos", cc.toString())
      .subscribe(
        item => {
          this.categoriesChartFixed = false;
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            var categoriesNames = [];
            var categoriesValues = [];
            item['listaGenericaConsultaResult'].forEach(element => {
              categoriesNames.push(element.Campo2);
              categoriesValues.push(Math.round(element.Campo5 != "" ? (element.Campo5 * 100 / element.Campo3) : 0));
            });
            if (categoriesValues.length == 0) {
              myConfig["graphset"][0]['series'] = myConfigEmpty['series'];
            } else {
              myConfig["graphset"][0]['scaleX']['values'] = categoriesNames;
              drilldownDataStructureFixed['series'][1]['values'] = categoriesValues;
              myConfig["graphset"][0]['series'] = drilldownDataStructureFixed['series'];
            }

          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        },

        () => {
          myConfig["graphset"][0]['shapes'] = [
            {
              'x': 15,
              'y': 20,
              'size': 5,
              'angle': -90,
              'type': 'triangle',
              'background-color': '#d9e4eb',
              'padding': 5,
              'cursor': 'hand',
              'id': 'Categoria',
              'hover-state': {
                'border-width': 1,
                'border-color': '#000'
              }
            }
          ];
          myConfig["graphset"][0]['title']['text'] = "SUBCATEGORIA DE EVENTOS FIJA";
          zingchart.exec('myChart1', 'modify', {
            data: myConfig["graphset"][0],
          });
          zingchart.node_click = function (p) { }
          scaleText1 = null;
          this.viewSubcategoryFixed = null;
          zingchart.shape_click = function (p) {
            var shapeId = p.shapeid;
            zingchart.exec('myChart1', 'destroy');
            rCategories1 = "back";
          }
        });
  }

  readSubcategoriesMobile(cc:number) {
    this.portfoliosServices.getDashboard("gestionDiariaSubcategoriaEventos", cc.toString())
      .subscribe(
        item => {
          this.categoriesChartMobile = false;
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            var categoriesNames = [];
            var categoriesValues = [];
            item['listaGenericaConsultaResult'].forEach(element => {
              categoriesNames.push(element.Campo2);
              categoriesValues.push(Math.round(element.Campo5 != "" ? (element.Campo5 * 100 / element.Campo3) : 0));
            });
            if (categoriesValues.length == 0) {
              myConfig["graphset"][1]['series'] = myConfigEmpty['series'];
            } else {
              myConfig["graphset"][1]['scaleX']['values'] = categoriesNames;
              drilldownDataStructureMobile['series'][1]['values'] = categoriesValues;
              myConfig["graphset"][1]['series'] = drilldownDataStructureMobile['series'];
            }

          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        },

        () => {
          myConfig["graphset"][1]['shapes'] = [
            {
              'x': 15,
              'y': 20,
              'size': 5,
              'angle': -90,
              'type': 'triangle',
              'background-color': '#d9e4eb',
              'padding': 5,
              'cursor': 'hand',
              'id': 'Categoria',
              'hover-state': {
                'border-width': 1,
                'border-color': '#000'
              }
            }
          ];
          myConfig["graphset"][1]['title']['text'] = "SUBCATEGORIA DE EVENTOS MÓVIL";
          zingchart.exec('myChart2', 'modify', {
            data: myConfig["graphset"][1],
          });
          zingchart.node_click = function (p) { }
          scaleText2 = null;
          this.viewSubcategoryMobile = null;
          zingchart.shape_click = function (p) {
            var shapeId = p.shapeid;
            zingchart.exec('myChart2', 'destroy');
            rCategories2 = "back";
          }
        });
  }





}
