import {Component, OnInit} from '@angular/core';
import {MvtStkService} from "../../../services/services/services/mvt-stk.service";
import {ProductService} from "../../../services/services/services/product.service";
import {ProductDto} from "../../../services/services/models/product-dto";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-mvtstk',
  templateUrl: './mvtstk.component.html',
  styleUrls: ['./mvtstk.component.scss']
})
export class MvtstkComponent implements OnInit {

  listArticle: ProductDto[] = [];
  mapListMvstk = new Map();
  mapTotalStock = new Map();
  page : number = 1;
  count : number = 0;
  tableSize : number = 3;
  fileName = 'mvtstk.xlsx';

  constructor(
    private productService: ProductService,
    private mvtstkService: MvtStkService
  ) {
  }

  ngOnInit(): void {
    this.productService.findAll2().subscribe({
      next: (articles) => {
        this.listArticle = articles;
        this.findAllMvstk();
      }
    });



  }

  onTableDataChange(event : any){
    this.page = event;
    this.findAllMvstk();
  }

  findAllMvstkByArticle(idArticle: number | undefined) {

    this.mvtstkService.listeMvtStkArticle({
      idArticle: idArticle as number
    }).subscribe({
      next: (data) => {
        this.mapListMvstk.set(idArticle, data);
        let total = 0;
        data.forEach(mvs => {
          if (mvs.quantite)
            total = total + mvs.quantite
        });
        this.mapTotalStock.set(idArticle, total);
      }
    })
  }

  private findAllMvstk() {
    this.listArticle.forEach(art => {
      this.findAllMvstkByArticle(art.id);
    })
  }

  updateList(event: any) {
    if(event === 'done'){
      this.findAllMvstk();
    }
  }

  exportexcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listArticle);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
