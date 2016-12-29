import { ChangeDetectionPage } from './app.po';

describe('change-detection App', function() {
  let page: ChangeDetectionPage;

  beforeEach(() => {
    page = new ChangeDetectionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
