import { ImageFiltersPage } from './app.po';

describe('image-filters App', () => {
  let page: ImageFiltersPage;

  beforeEach(() => {
    page = new ImageFiltersPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
