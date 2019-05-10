import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { PortfoliosService } from 'src/app/services/portfolios.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


declare var zingchart: any;
var drilldownDataStructure = {};
drilldownDataStructure = {
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
  "series":[{"values":[]}]
}

var myConfig =   
    {
      "type": "hbar",
      "background-color": "#fff",
      "border-color": "#dae5ec",
      "border-width": "1px",
      "height": "70%",
      "width": "50%",
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
    };
var scaleText;
var indexCategory = null;
var rCategories = null;
var catg = ['SMS SIMPLE', 'SMS DOBLE VIA', 'MAIL', 'AUDIO', 'SAT PUSH', 'TV', 'WEB']
var idChart="";

@Component({
  selector: 'app-sended-events',
  templateUrl: './sended-events.component.html',
  styleUrls: ['./sended-events.component.css']
})
export class SendedEventsComponent implements OnInit {

  @Input() operation: number;

  categoriesChart: boolean = true;
  viewSubcategory: string = null;
  constructor(private portfoliosServices: PortfoliosService, private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.readCategories();
    setInterval(() => {
      if (this.categoriesChart) {
        this.readCategories()
      } else {
        if (this.operation == 1) {
          console.log(indexCategory + 1)
          this.readSubcategories(indexCategory + 1);
        }
        if (this.operation == 2) {
          this.readSubcategories(indexCategory + 9);
        }
      }
    }, 60000);
  }

  ngAfterViewChecked() {
    this.viewSubcategory = scaleText;
    if (this.viewSubcategory != null) {
      scaleText = null;
      this.viewSubcategory = null;
      if (this.operation == 1) {
        console.log(indexCategory + 1)
        this.readSubcategories(indexCategory + 1);
      } else {
        this.readSubcategories(indexCategory + 9);
      }

    }
    if (rCategories != null) {
      rCategories = null;
      this.readCategories();
    }
  }
  readCategories() {
    this.portfoliosServices.getDashboard("gestionDiariaCategoriaEventos", this.operation.toString())
      .subscribe(
        item => {
          this.categoriesChart = true;
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            var categoriesNames = [];
            var categoriesValues = [];
            item['listaGenericaConsultaResult'].forEach(element => {
              categoriesNames.push(element.Campo2);
              categoriesValues.push(Math.round(element.Campo5 != "" ? (element.Campo5 * 100 / element.Campo3) : 0));
            });
            if (categoriesValues.length == 0) {
              myConfig['series']=myConfigEmpty['series'];
            } else {
              myConfig['scaleX']['values'] = categoriesNames;
              drilldownDataStructure['series'][1]['values'] = categoriesValues;
              myConfig['series'] = drilldownDataStructure['series'];
            }
          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        },

        () => {
          myConfig['shapes'] = [];
          myConfig['title']['text'] = "CATEGORIA DE EVENTOS";
          console.log(myConfig)
          zingchart.render({
            id: 'myChart',
            data: myConfig
          });
          zingchart.node_click = function (p) {
            var plotIndex = p.plotindex;
            scaleText = p.scaletext;
            indexCategory = catg.indexOf(scaleText);
          }
          rCategories = null;
        });
  }



  readSubcategories(idCategory: number) {
    this.portfoliosServices.getDashboard("gestionDiariaSubcategoriaEventos", idCategory.toString())
      .subscribe(
        item => {
          this.categoriesChart = false;
          if (item.hasOwnProperty('listaGenericaConsultaResult')) {
            var categoriesNames = [];
            var categoriesValues = [];
            item['listaGenericaConsultaResult'].forEach(element => {
              categoriesNames.push(element.Campo2);
              categoriesValues.push(Math.round(element.Campo5 != "" ? (element.Campo5 * 100 / element.Campo3) : 0));
            });
            if (categoriesValues.length == 0) {
              myConfig['series']=myConfigEmpty['series'];
            } else {
              myConfig['scaleX']['values'] = categoriesNames;
              drilldownDataStructure['series'][1]['values'] = categoriesValues;
              myConfig['series'] = drilldownDataStructure['series'];
            }

          }
        }, error => {
          if (error['statusText'] == 'Unauthorized' && error['status'] == 401) {
            this.loginService.clearSessionLogin();
            this.router.navigate(['/login']);
          }
        },

        () => {
          myConfig['shapes'] = [
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
          myConfig['title']['text'] = "SUBCATEGORIA DE EVENTOS";
          zingchart.exec('myChart', 'modify', {
            data: myConfig,
          });
          zingchart.node_click = function (p) { }
          scaleText = null;
          this.viewSubcategory = null;
          zingchart.shape_click = function (p) {
            var shapeId = p.shapeid;
            zingchart.exec('myChart', 'destroy');
            rCategories = "back";
          }
        });
  }




}
