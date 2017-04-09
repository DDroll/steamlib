import { StlibMigrationPage } from './app.po';

describe('stlib-migration App', () => {
  let page: StlibMigrationPage;

  beforeEach(() => {
    page = new StlibMigrationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
