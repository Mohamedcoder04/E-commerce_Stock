import {Component, Input, OnInit} from '@angular/core';
import {MvtStkDto} from "../../services/services/models/mvt-stk-dto";

@Component({
  selector: 'app-detail-mvt-stk',
  templateUrl: './detail-mvt-stk.component.html',
  styleUrls: ['./detail-mvt-stk.component.scss']
})
export class DetailMvtStkComponent implements OnInit {

  @Input()
  mvtStk : MvtStkDto = {}
  type  = false;
  constructor() { }

  ngOnInit(): void {
    if(this.mvtStk.typeMvt === "ENTREE" || this.mvtStk.typeMvt === "CORRECTION_POS"){
      this.type = true
    }
  }

}
