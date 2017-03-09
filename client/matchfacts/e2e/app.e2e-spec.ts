import { MatchfactsPage } from './app.po';

describe('matchfacts App', () => {
  let page: MatchfactsPage;

  beforeEach(() => {
    page = new MatchfactsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
