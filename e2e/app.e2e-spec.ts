import { TheBarsbPage } from './app.po';

describe('the-barsb App', function() {
  let page: TheBarsbPage;

  beforeEach(() => {
    page = new TheBarsbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
