import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ProductService } from '../../../../services/services/services/product.service';
import { ProductDto } from '../../../../services/services/models/product-dto';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit {

  products: ProductDto[] = [];
  productsName: Array<string> = [];
  productsNumberSell: Array<number> = [];
  productsCategorie: Array<string> = [];
  chart: Chart = new Chart();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getMostSelling().subscribe({
      next: (data) => {
        this.products = data;
        this.products.forEach(p => {
          if (p.codeProduit != null) {
            this.productsName.push(p.codeProduit);
          }
          this.productsCategorie.push(<string>p.category?.codeCategory);
          if (p.numberSell != null) {
            this.productsNumberSell.push(p.numberSell);
          }
        });

        this.chart = new Chart({
          chart: {
            type: 'bar',
            height: 225,
            backgroundColor: '#f4f4f4',
          },
          title: {
            text: 'Top 3 Products'
          },
          xAxis: {
            categories: this.productsCategorie
          },
          yAxis: {
            title: {
              text: ''
            }
          },
          series: [
            {
              type: 'bar',
              showInLegend: false,
              data: [
                {
                  name: this.productsName[0],
                  y: this.productsNumberSell[0],
                  color: '#044342',
                },
                {
                  name: this.productsName[1],
                  y: this.productsNumberSell[1],
                  color: '#7e0505',
                },
                {
                  name: this.productsName[2],
                  y: this.productsNumberSell[2],
                  color: '#ed9e20',
                },
              ]
            }
          ],
          credits: {
            enabled: false
          }
        });
      }
    });
  }

}
