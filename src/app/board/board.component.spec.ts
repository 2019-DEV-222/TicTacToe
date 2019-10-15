import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { blockEnum } from '../block/blockEnum';
import { BlockComponent } from '../block/block.component';

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