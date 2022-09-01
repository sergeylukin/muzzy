import { getHeadingText } from '../support/app.po';

describe('front', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcoming user action message', () => {
    getHeadingText().contains('upload');
  });

  it('should display thank you message upon upload', () => {
    // Drag & drop sample meme to the web page
    cy.document().selectFile('src/fixtures/meme.jpeg', { action: 'drag-drop' });

    // Verify we get a thank you
    // @TODO
    // Verify that there is a URL with 7 first characters of md5 hash of
    // current timestamp (+/- 1 second)
    getHeadingText().contains('Ur meme is up and happy!');
  });
});
