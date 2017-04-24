import { TbzAngularCliPage } from './app.po';

describe('tbz-angular-cli App', function() {
  let page: TbzAngularCliPage;

  beforeEach(() => {
    page = new TbzAngularCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
