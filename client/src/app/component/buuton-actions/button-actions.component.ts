import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-button-actions',
  templateUrl: './button-actions.component.html',
  styleUrls: ['./button-actions.component.scss']
})
export class ButtonActionsComponent implements OnInit {

  @Output() // c-v-d : je veux envoyer un évènement du composant fils vers le composant parent
  clickEvent = new EventEmitter();

  @Input()
  isNouveauVisible = true;

  @Input()
  isImporterVisible = true;

  @Input()
  isExporterVisible = true;

  constructor() { }

  ngOnInit(): void {
  }

  bouttonNouveuClick() : void{
    this.clickEvent.emit();
  }

  importData() {

  }
}
