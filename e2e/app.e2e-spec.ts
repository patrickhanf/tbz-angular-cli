import { TBZAngularCliPage } from './app.po';

describe('tbz-angular-cli App', function() {
  let page: TBZAngularCliPage;

  beforeEach(() => {
    page = new TBZAngularCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
