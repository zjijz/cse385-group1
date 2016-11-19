import { Component, Input } from '@angular/core';

@Component({
    selector: 'material-card',
    templateUrl: './material-card.component.html',
    styleUrls: ['./material-card.component.scss']
})
export class MaterialCard {
  @Input()
  private hasTitle: boolean = false;

  @Input()
  private hasMedia: boolean = false;

  @Input()
  private hasText: boolean = false;

  @Input()
  private hasActions: boolean = false;

  @Input()
  private titleBorder: boolean = false;

  @Input()
  private mediaBorder: boolean = false;

  @Input()
  private textBorder: boolean = false;

  @Input()
  private actionsBorder: boolean = false;
}
