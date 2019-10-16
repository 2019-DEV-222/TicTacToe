import { Component, OnInit } from '@angular/core';
import { blockEnum } from '../block/blockEnum';
import { UtilService } from '../util/utilService';

@Component({
  selector: 'app-board',
  providers: [UtilService],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public currentPlayer: blockEnum;
  public board: blockEnum[][];
  public ResultMessage: string;
  public isGameOver: boolean;

  constructor(private utilService: UtilService) {
    this.utilService = utilService;
   }

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
    if (!this.isGameOver && this.board[rowIndex][colIndex] === blockEnum.EMPTY) {
    this.board[rowIndex][colIndex] = this.currentPlayer;
    if (this.isGameDraw()) {  
      this.isGameOver = true; 
      this.ResultMessage = `It\'s a Draw!`;
    }   
    else if (this.isGameWon()) {
      this.isGameOver = true;    
      this.ResultMessage = `Player ${this.currentPlayer} wins the game!`;
    }     
    else{
      this.togglePlayer();
    }   
   }  
  }

  togglePlayer(): void {
    this.currentPlayer = this.currentPlayer === blockEnum.xPlayer ? blockEnum.oPlayer : blockEnum.xPlayer;
    this.ResultMessage = `It's Player ${this.currentPlayer}'s turn`;
  }

  isThreeInLine(): boolean {
    return (this.isThreeHorizontally() || this.isThreeVertically() || this.isThreeDiagonally());
  }

  isThreeHorizontally(): boolean {    
    let threeHorizontally = false;
    for (const rowArray of this.board) {
      if (!threeHorizontally) {
        threeHorizontally = this.utilService.checkEquality(rowArray[0], rowArray[1], rowArray[2]);
      }
    }
    return threeHorizontally;
  }

  isThreeVertically(): boolean {    
    let threeVertically = false;  
    for (let colIndex = 0; colIndex < 3; colIndex++) {
      if (!threeVertically) {
        threeVertically = this.utilService.checkEquality(this.board[0][colIndex], this.board[1][colIndex], this.board[2][colIndex]);
      }
    }
    return threeVertically;
  }

  isThreeDiagonally(): boolean {
    
    let threeInLeftDiagonal = false;
    let threeInRightDiagonal = false;
    let threeInDiagonal = false;
    threeInLeftDiagonal = this.utilService.checkEquality(this.board[0][0], this.board[1][1], this.board[2][2]);
    threeInRightDiagonal = this.utilService.checkEquality(this.board[0][2], this.board[1][1], this.board[2][0]);
    threeInDiagonal = threeInLeftDiagonal||threeInRightDiagonal;
    return threeInDiagonal;
  }

  isBoardFull(): boolean {

    for (const colArray of this.board){
      for (const blockItem of colArray){
        if (blockItem === blockEnum.EMPTY){
          return false;
        }
      }
    }        
    return !this.isThreeInLine();
  }

  isGameWon(): boolean {     
    return this.isThreeInLine();
  }

  isGameDraw(): boolean {
    return this.isBoardFull();
  }

} 

