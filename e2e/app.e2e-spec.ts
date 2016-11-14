import { TheBarbsPage } from './app.po';

describe('the-barbs App', function() {
  let page: TheBarbsPage;

  beforeEach(() => {
    page = new TheBarbsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
