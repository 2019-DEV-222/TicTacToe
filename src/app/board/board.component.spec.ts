import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { blockEnum } from '../block/blockEnum';
import { BlockComponent } from '../block/block.component';
import { By } from '@angular/platform-browser';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let resultElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent, BlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    resultElement = fixture.debugElement.nativeElement.querySelector('#result');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('X always goes first', function () {

    let rowIndex: number;
    let colIndex: number;

    beforeEach (function() {
      ({ rowIndex, colIndex } = triggerUpdate(fixture, rowIndex, colIndex, component));
    });
   
    it('should have X player as a current player for a new game', function () {
      component.clearBoard();

      expect(component.currentPlayer).toEqual(blockEnum.xPlayer);     
      fixture.detectChanges();

      expect(resultElement.textContent).toContain('It\'s Player X\'s turn');
    });

    it('should be player X that goes in first', function() {

      expect(component.board[rowIndex][colIndex]).toEqual(blockEnum.xPlayer);      
    });

  });

describe('Players cannot play on a played position', function() {
    let rowIndex: number;
    let colIndex: number;
    let board: blockEnum[][];

    beforeEach (function() {
      ({ rowIndex, colIndex, board } = currentMoveDetails(fixture, rowIndex, colIndex, board, component));
    });

    it('should not let player to update the board on a played position', function() {

     expect(component.board[rowIndex][colIndex]).toEqual(board[rowIndex][colIndex]);
     expect(fixture.nativeElement.querySelector('.block').innerText).toEqual('X');
    });
  });
 describe('Players should get alternate turns to play until the game is over', function() {
    let rowIndex: number;
    let colIndex: number;
    let board: blockEnum[][];
    let currentPlayer: blockEnum;

    beforeEach (function() {
      let block = fixture.debugElement.query(By.css('.block'));
      block.triggerEventHandler('click', null);  
    });

   it('should toggle Players on every move', function() {
      spyOn(component, 'togglePlayer');
      component.updateBoard(2,2);
      expect(component.togglePlayer).toHaveBeenCalled();
    });
  
    it('should allow Player `X` to play next if Player `O` played last', function() {
      rowIndex = 0;
      colIndex = 2;
      currentPlayer = blockEnum.oPlayer;

      board =  [
        [blockEnum.xPlayer, blockEnum.EMPTY, blockEnum.EMPTY],
        [blockEnum.EMPTY, blockEnum.EMPTY, blockEnum.EMPTY],
        [blockEnum.EMPTY, blockEnum.EMPTY, blockEnum.EMPTY]
      ];
      component.board = board;
      component.currentPlayer = currentPlayer;
      component.updateBoard(rowIndex, colIndex);
      fixture.detectChanges();
      
      expect(component.currentPlayer).toBe(blockEnum.xPlayer);
      expect(component.ResultMessage).toBe(`It\'s Player X\'s turn`);
    });

    it('should allow Player `O` to play next if Player `X` played last', function() {
      rowIndex = 0;
      colIndex = 2;
      currentPlayer = blockEnum.xPlayer;

      board =  [
        [blockEnum.EMPTY, blockEnum.xPlayer, blockEnum.EMPTY],
        [blockEnum.oPlayer, blockEnum.EMPTY, blockEnum.EMPTY],
        [blockEnum.EMPTY, blockEnum.EMPTY, blockEnum.EMPTY]
      ];
      component.board = board;
      component.currentPlayer = currentPlayer;
      component.updateBoard(rowIndex, colIndex);
      fixture.detectChanges();
      
      expect(component.currentPlayer).toBe(blockEnum.oPlayer);
      expect(component.ResultMessage).toBe(`It\'s Player O\'s turn`);
    });

    it('should continue game if no player has three in a row horizontally', function () {
      rowIndex = 2;
      colIndex = 2;
      currentPlayer = blockEnum.oPlayer;

      board = [
        [blockEnum.xPlayer, blockEnum.EMPTY, blockEnum.xPlayer],
        [blockEnum.oPlayer, blockEnum.oPlayer, blockEnum.EMPTY],
        [blockEnum.EMPTY, blockEnum.EMPTY, blockEnum.EMPTY]
      ];
      component.board = board;
      component.currentPlayer = currentPlayer;
      component.updateBoard(rowIndex, colIndex);
      fixture.detectChanges();

      expect(component.isThreeHorizontally()).toBeFalsy();
      expect(component.isGameOver).toBeFalsy();
    });

    it('should continue game if no player has three in a row vertically', function () {
      rowIndex = 2;
      colIndex = 1;
      currentPlayer = blockEnum.oPlayer;

      board = [
        [blockEnum.xPlayer, blockEnum.EMPTY, blockEnum.xPlayer],
        [blockEnum.oPlayer, blockEnum.oPlayer, blockEnum.EMPTY],
        [blockEnum.EMPTY, blockEnum.EMPTY, blockEnum.xPlayer]
      ];

      component.board = board;
      component.currentPlayer = currentPlayer;
      component.updateBoard(rowIndex, colIndex);
      fixture.detectChanges();

      expect(component.isThreeVertically()).toBeFalsy();
      expect(component.isGameOver).toBeFalsy();
    });

    it('should continue game if no player has three in a row diagonally', function () {
      rowIndex = 2;
      colIndex = 0;
      currentPlayer = blockEnum.oPlayer;

      board = [
        [blockEnum.xPlayer, blockEnum.EMPTY, blockEnum.xPlayer],
        [blockEnum.oPlayer, blockEnum.oPlayer, blockEnum.EMPTY],
        [blockEnum.EMPTY, blockEnum.EMPTY, blockEnum.xPlayer]
      ];

      component.board = board;
      component.currentPlayer = currentPlayer;
      component.updateBoard(rowIndex, colIndex);
      fixture.detectChanges();

      expect(component.isThreeDiagonally()).toBeFalsy();
      expect(component.isGameOver).toBeFalsy();
    });

    it('should continue game if all the blocks are not filled yet', function() {
      rowIndex = 1;
      colIndex = 2;

      currentPlayer = blockEnum.xPlayer;

      board =  [
        [blockEnum.xPlayer, blockEnum.EMPTY, blockEnum.xPlayer],
        [blockEnum.oPlayer, blockEnum.oPlayer, blockEnum.EMPTY],
        [blockEnum.xPlayer, blockEnum.oPlayer, blockEnum.xPlayer]
      ];

      component.board = board;
      component.currentPlayer = currentPlayer;
      component.updateBoard(rowIndex, colIndex);
      fixture.detectChanges();

      expect(component.isBoardFull()).toBeFalsy();
    });
  });

  describe('should be game over if any player gets 3 in a row', function(){

    let rowIndex: number;
    let colIndex: number;
    let currentPlayer: blockEnum;
    let board: blockEnum[][];

    it('should be a win if Player `X` draws three in a row', function() {
      rowIndex = 1;
      colIndex = 2;

      currentPlayer = blockEnum.xPlayer;

      board =  [
        [blockEnum.xPlayer, blockEnum.EMPTY, blockEnum.xPlayer],
        [blockEnum.oPlayer, blockEnum.oPlayer, blockEnum.EMPTY],
        [blockEnum.xPlayer, blockEnum.oPlayer, blockEnum.xPlayer]
      ];

      component.board = board;
      component.currentPlayer = currentPlayer;
      component.updateBoard(rowIndex, colIndex);
      fixture.detectChanges();
      expect(component.isGameWon()).toBeTruthy();
      expect(component.ResultMessage).toBe(`Player X wins the game!`);
      expect(component.isGameOver).toBeTruthy();
    });

    it('should be a win if Player `O` draws three in a row', function() {
      rowIndex = 0;
      colIndex = 1;

      currentPlayer = blockEnum.oPlayer;

      board =  [
        [blockEnum.xPlayer, blockEnum.EMPTY, blockEnum.xPlayer],
        [blockEnum.oPlayer, blockEnum.oPlayer, blockEnum.EMPTY],
        [blockEnum.xPlayer, blockEnum.oPlayer, blockEnum.xPlayer]
      ];

      component.board = board;
      component.currentPlayer = currentPlayer;
      component.updateBoard(rowIndex, colIndex);
      fixture.detectChanges();
      expect(component.isGameWon()).toBeTruthy();
      expect(component.ResultMessage).toBe(`Player O wins the game!`);
      expect(component.isGameOver).toBeTruthy();
    });
  });
});

function triggerUpdate(fixture: ComponentFixture<BoardComponent>, rowIndex: number, colIndex: number, component: BoardComponent) {

  rowIndex = 1;
  colIndex = 1;
  component.board = [
    [blockEnum.EMPTY, blockEnum.EMPTY, blockEnum.EMPTY],
    [blockEnum.EMPTY, blockEnum.EMPTY, blockEnum.EMPTY],
    [blockEnum.EMPTY, blockEnum.EMPTY, blockEnum.EMPTY]
  ];
  
  component.updateBoard(rowIndex, colIndex);
  fixture.detectChanges();
  return { rowIndex, colIndex };
}

function currentMoveDetails(fixture: ComponentFixture<BoardComponent>, rowIndex: number, colIndex: number, board: blockEnum[][], component: BoardComponent) {
 
  rowIndex = 0;
  colIndex = 0;
  board = [
    [blockEnum.xPlayer, blockEnum.xPlayer, blockEnum.EMPTY],
    [blockEnum.EMPTY, blockEnum.oPlayer, blockEnum.EMPTY],
    [blockEnum.EMPTY, blockEnum.oPlayer, blockEnum.EMPTY]
  ]; 
  component.board = board;
  component.currentPlayer = blockEnum.oPlayer; 
  component.updateBoard(rowIndex, colIndex);
  fixture.detectChanges();
  return { rowIndex, colIndex, board };
}