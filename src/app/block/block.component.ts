import { Component, OnInit, Input } from '@angular/core';
import { blockEnum } from './blockEnum';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  @Input() public blockItem: blockEnum = blockEnum.EMPTY;
  @Input() public rowIndex: number;
  @Input() public colIndex: number;

  constructor() { }

  ngOnInit() {
  }

}
