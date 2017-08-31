import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollwatchingComponent } from './pollwatching.component';

describe('ContactDetailComponent', () => {
  let component: PollwatchingComponent;
  let fixture: ComponentFixture<PollwatchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PollwatchingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollwatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
