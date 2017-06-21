import { TestBed, async } from '@angular/core/testing';

import { GeomapComponent } from './geomap.component';

describe('TestComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeomapComponent
      ],
    }).compileComponents();
  }));

  it('should create the test', async(() => {
    const fixture = TestBed.createComponent(GeomapComponent);
    const test = fixture.debugElement.componentInstance;
    expect(test).toBeTruthy();
  }));

  it(`should have as title 'test works!'`, async(() => {
    const fixture = TestBed.createComponent(GeomapComponent);
    const test = fixture.debugElement.componentInstance;
    expect(test.title).toEqual('test works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(GeomapComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('test works!');
  }));
});
