import { Component, OnInit } from '@angular/core';
import { Chart } from "angular-highcharts";
import { CommandeClientService } from "../../../../services/services/services/commande-client.service";
import { CategorieService } from "../../../../services/services/services/categorie.service";
import { CategoryDto } from "../../../../services/services/models/category-dto";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-orders-by-category',
  templateUrl: './orders-by-category.component.html',
  styleUrls: ['./orders-by-category.component.scss']
})
export class OrdersByCategoryComponent implements OnInit {
  chart: Chart = new Chart();
  category: any[] = [];
  result: any[] = [];

  constructor(
    private cmdCltService: CommandeClientService,
    private categoryService: CategorieService
  ) { }

  ngOnInit(): void {
    this.categoryService.findAll8().subscribe({
      next: (data) => {
        this.category = data.map((sale) => sale.codeCategory);

        const observables = data.map((c) => this.cmdCltService.findLignesByCatgorieId({ id: c.id as number }));

        forkJoin(observables).subscribe((results) => {
          this.result = results.map((data, index) => {
            return {
              name: data.length > 0 ? data[0].productDto?.category?.codeCategory : this.category[index],
              y: data.length,
            };
          });

          this.updateChart();
        });
      }
    });
  }

  updateChart(): void {
    this.chart = new Chart({
      chart: {
        type: 'pie',
        height: 280,
        backgroundColor: '#f4f4f4',
      },
      title: {
        text: 'Sales By Category'
      },
      xAxis: {
        categories: this.category
      },
      yAxis: {
        title: {
          text: 'Revenue in %'
        }
      },
      series: [
        {
          type: 'pie',
          data: this.result
        }
      ],
      credits: {
        enabled: false
      }
    });
  }
}
