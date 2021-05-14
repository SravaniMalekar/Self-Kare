import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAnalyseComponent } from './self-analyse.component';

describe('SelfAnalyseComponent', () => {
  let component: SelfAnalyseComponent;
  let fixture: ComponentFixture<SelfAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfAnalyseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
