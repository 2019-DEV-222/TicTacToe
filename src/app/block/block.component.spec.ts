import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockComponent } from './block.component';
import { blockEnum } from './blockEnum';

describe('BlockComponent', () => {
  let component: BlockComponent;
  let fixture: ComponentFixture<BlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('block has states `EMPTY` OR `X` or `O`', function() {

    it('should have an EMPTY state initially', () => {
      component.colIndex = 0;
      component.rowIndex = 0;

      expect(fixture.nativeElement.querySelector('.block').innerText).toEqual(blockEnum.EMPTY);
    });

    it('should update block with `X` when Player `X` plays', () => {
      component.colIndex = 1;
      component.rowIndex = 1;
      component.blockItem = blockEnum.xPlayer;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.block').innerText).toEqual(blockEnum.xPlayer);
    });    

    it('should update with `O` when Player `O` makes a move', () => {
      component.colIndex = 2;
      component.rowIndex = 2;
      component.blockItem = blockEnum.oPlayer;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.block').innerText).toEqual(blockEnum.oPlayer);
    });    
  });
});