import { ReduxTestPage } from './app.po';

describe('redux-test App', () => {
  let page: ReduxTestPage;

  beforeEach(() => {
    page = new ReduxTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
