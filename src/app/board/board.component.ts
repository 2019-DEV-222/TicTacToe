import { Component, OnInit } from '@angular/core';
import { blockEnum } from '../block/blockEnum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public currentPlayer: blockEnum;
  public board: blockEnum[][];
  public ResultMessage: string;

  constructor() { }

  ngOnInit() {
    this.clearBoard();
  }
  clearBoard() {
    this.board = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      this.board[rowIndex] = [];
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        this.board[rowIndex][colIndex] = blockEnum.EMPTY;
      }
    }
    this.currentPlayer = blockEnum.xPlayer;   
    this.ResultMessage = `It's Player ${this.currentPlayer}'s turn`;
  }

  updateBoard(rowIndex: number, colIndex: number): void {
    this.board[rowIndex][colIndex] = this.currentPlayer;
  }

}
