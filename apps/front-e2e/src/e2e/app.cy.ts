import {
  getHeadingText,
  getDropZone,
  getShareableURLContainer,
  getUploadButton,
} from '../support/app.po';

describe('front', () => {
  const fileId = +new Date();
  beforeEach(() => {
    cy.intercept('/v1/file', {
      hostname: 'localhost',
      port: 3333,
      statusCode: 200,
      body: {
        url: `http://localhost:4200/p/${fileId}`,
      },
    });
    cy.visit('/');
  });

  it('should display welcoming user action message', () => {
    getHeadingText().contains('upload');
  });

  it('should display thank you message upon upload', () => {
    // Drag & drop sample meme to the web page
    getDropZone().selectFile('src/fixtures/meme.jpeg', { action: 'drag-drop' });

    getUploadButton().click();

    // Verify we get a thank you
    // @TODO
    // Verify that there is a URL with current timestamp (+/- 1 second)
    getShareableURLContainer().contains(fileId);
  });
});
