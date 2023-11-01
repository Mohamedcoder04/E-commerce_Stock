import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { CategoryDto } from "../../../../services/services/models/category-dto";
import { CategorieService } from "../../../../services/services/services/categorie.service";
import { CommandeClientService } from "../../../../services/services/services/commande-client.service";

@Component({
  selector: 'app-orders-by-month',
  templateUrl: './orders-by-month.component.html',
  styleUrls: ['./orders-by-month.component.scss']
})
export class OrdersByMonthComponent implements OnInit {
  months: Array<any> = [];
  colors = ['#3fece9', '#da8d36', '#5169e7'];
  series: any[] = [];
  categoriesName: any[] = [];
  categories: CategoryDto[] = [];
  chart = new Chart();

  constructor(
    private categoryService: CategorieService,
    private cmdCltService: CommandeClientService
  ) { }

  ngOnInit(): void {
    this.categoryService.findAll8().subscribe({
      next: (data) => {
        this.categories = data;

        const fetchPromises = this.categories.map(c => {
          return this.cmdCltService.countSalesPerMonth({ id: c.id as number }).toPromise();
        });

        Promise.all(fetchPromises).then(results => {
          // @ts-ignore
          this.months = results[0].map(value => value[1]); // On suppose que le premier élément a les mois
          console.log(this.months);

          this.categoriesName = results.map((res, index) => {
            return {
              cat: this.categories[index].codeCategory,
              data: res? res.map(value => value[2]) : []
            };
          });
          console.log(this.categoriesName);

          this.updateChart();
        });
      }
    });
  }

  updateChart() {
    for (let i = 0; i < this.categories.length; i++) {
      this.series.push({
        name: this.categoriesName[i].cat,
        type: "line",
        color: this.colors[i],
        data: this.categoriesName[i].data
      });
    }

    this.chart = new Chart({
      chart: {
        type: 'line',
        height: 280,
        backgroundColor: '#f4f4f4', // Ajouter la couleur d'arrière-plan souhaitée ici
      },
      title: {
        text: 'Sales By Month'
      },
      xAxis: {
        categories: this.months
      },
      yAxis: {
        title: {
          text: 'Revenue in $'
        }
      },
      series: this.series,
      credits: {
        enabled: false
      }
    });
  }

}
