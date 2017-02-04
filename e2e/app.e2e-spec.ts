import { SteamlibPage } from './app.po';

describe('steamlib App', function() {
  let page: SteamlibPage;

  beforeEach(() => {
    page = new SteamlibPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
