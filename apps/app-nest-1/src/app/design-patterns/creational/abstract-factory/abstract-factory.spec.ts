import { BoldRendererFactory, ItalicRendererFactory, RendererClient } from './abstract-factory';

describe('Abstract Factory', () => {
  it('should create italic renderer client', () => {
    // Arrange
    const italicRendererFactory = new ItalicRendererFactory();

    // Act
    const italicRendererClient = new RendererClient(italicRendererFactory);

    // Assert
    expect(italicRendererClient.renderHtml('text')).toBe('<i>text</i>');
    expect(italicRendererClient.renderMarkdown('text')).toBe('*text*');
  });

  it('should create bold renderer factory', () => {
    // Arrange
    const boldRendererFactory = new BoldRendererFactory();

    // Act
    const boldRendererClient = new RendererClient(boldRendererFactory);

    // Assert
    expect(boldRendererClient.renderHtml('text')).toBe('<b>text</b>');
    expect(boldRendererClient.renderMarkdown('text')).toBe('**text**');
  });
});
