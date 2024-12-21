import { PayPalFactory, StripeFactory } from './factory-method'

describe('Factory method', () => {
  it('should process PayPal payment', () => {
    // Arrange
    const factory = new PayPalFactory('mock-client-id', 'mock-client-secret');

    // Act
    const result = factory.processAndLogPayment(100);

    // Assert
    expect(result).toBe('Processed payment of $100 through PayPal using Client ID: mock-client-id.');
  });

  it('should process Stripe payment', () => {
    // Arrange
    const factory = new StripeFactory('mock-api-key');

    // Act
    const result = factory.processAndLogPayment(100);

    // Assert
    expect(result).toBe('Processed payment of $100 through Stripe using API Key: mock-api-key.');
  });
});
