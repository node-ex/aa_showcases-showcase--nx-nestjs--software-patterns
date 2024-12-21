/**
 * Abstract Factory
 * - Allows to produce families of related objects without specifying their
 *   concrete classes.
 *
 * Viable use cases:
 * - When there is a matrix of variants and products
 * - When the client should not know the concrete classes of the objects it uses
 *
 * Sources:
 * - https://refactoring.guru/design-patterns/abstract-factory
 * - https://sourcemaking.com/design_patterns/abstract_factory
 */

/*
 * This code example demonstrates how to create a renderer factory that can
 * create HTML and Markdown renderers for italic and bold text.
 *
 * Products/output types: HtmlRenderer, MarkdownRenderer
 * Variants/platforms/families: Italic, Bold
 */

/* Abstract products */
interface HtmlRenderer {
  renderHtml(text: string): string;
}

interface MarkdownRenderer {
  renderMarkdown(text: string): string;
}

/* Concrete products */
class ItalicHtmlRenderer implements HtmlRenderer {
  renderHtml(text: string): string {
    return `<i>${text}</i>`;
  }
}

class ItalicMarkdownRenderer implements MarkdownRenderer {
  renderMarkdown(text: string): string {
    return `*${text}*`;
  }
}

class BoldHtmlRenderer implements HtmlRenderer {
  renderHtml(text: string): string {
    return `<b>${text}</b>`;
  }
}

class BoldMarkdownRenderer implements MarkdownRenderer {
  renderMarkdown(text: string): string {
    return `**${text}**`;
  }
}

/* Abstract factory */
interface RendererAbstractFactory {
  createHtmlRenderer(): HtmlRenderer;
  createMarkdownRenderer(): MarkdownRenderer;
}

/* Concrete factories */
export class ItalicRendererFactory implements RendererAbstractFactory {
  createHtmlRenderer(): HtmlRenderer {
    return new ItalicHtmlRenderer();
  }

  createMarkdownRenderer(): MarkdownRenderer {
    return new ItalicMarkdownRenderer();
  }
}

export class BoldRendererFactory implements RendererAbstractFactory {
  createHtmlRenderer(): HtmlRenderer {
    return new BoldHtmlRenderer();
  }

  createMarkdownRenderer(): MarkdownRenderer {
    return new BoldMarkdownRenderer();
  }
}

/* Client */
export class RendererClient {
  private htmlRenderer: HtmlRenderer;
  private markdownRenderer: MarkdownRenderer;

  constructor(factory: RendererAbstractFactory) {
    this.htmlRenderer = factory.createHtmlRenderer();
    this.markdownRenderer = factory.createMarkdownRenderer();
  }

  renderHtml(text: string): string {
    return this.htmlRenderer.renderHtml(text);
  }

  renderMarkdown(text: string): string {
    return this.markdownRenderer.renderMarkdown(text);
  }
}
