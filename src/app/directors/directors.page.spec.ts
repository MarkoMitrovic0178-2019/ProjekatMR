import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { DirectorsPage } from './directors.page';
import {IonicModule} from "@ionic/angular";


describe('DirectorsPage', () => {
  let component: DirectorsPage;
  let fixture: ComponentFixture<DirectorsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();
      fixture = TestBed.createComponent(DirectorsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
