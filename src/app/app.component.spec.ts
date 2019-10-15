import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BlockComponent } from './block/block.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        BoardComponent,
        BlockComponent
      ],
    }).compileComponents();
  }));
  
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'TicTacToe'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app.title).toEqual('TicTacToe');
  }));  
});
