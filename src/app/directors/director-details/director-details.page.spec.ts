import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectorDetailsPage } from './director-details.page';

describe('DirectorDetailsPage', () => {
  let component: DirectorDetailsPage;
  let fixture: ComponentFixture<DirectorDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DirectorDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
