import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindRoutesComponent } from './find-routes.component';

describe('FindRoutesComponent', () => {
  let component: FindRoutesComponent;
  let fixture: ComponentFixture<FindRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
