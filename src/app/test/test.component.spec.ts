import { TestBed, async } from '@angular/core/testing';

import { TestComponent } from './test.component';

describe('TestComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
    }).compileComponents();
  }));

  it('should create the test', async(() => {
    const fixture = TestBed.createComponent(TestComponent);
    const test = fixture.debugElement.componentInstance;
    expect(test).toBeTruthy();
  }));

  it(`should have as title 'test works!'`, async(() => {
    const fixture = TestBed.createComponent(TestComponent);
    const test = fixture.debugElement.componentInstance;
    expect(test.title).toEqual('test works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('test works!');
  }));
});
