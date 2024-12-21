/**
 * Factory method
 * - Allows to define an interface for creating an object, but let subclasses
 *   decide which class to instantiate
 * - Lets a class defer instantiation to subclasses
 * - Factory Method is to creating objects as Template Method is to
 *   implementing an algorithm
 * - Superclass specifies all standard and generic behavior, and then delegates
 *   the creation details to subclasses that are supplied by the client
 * - Consists of Creator and Product classes
 *
 * Viable use cases:
 * - When a class should be able to instantiate multiple subclasses
 * - When reuse of existing objects is desired, instead of creating new ones
 *
 *
 * Sources:
 * - https://sourcemaking.com/design_patterns/factory_method
 * - https://refactoring.guru/design-patterns/factory-method
 */

/* Product interface */
export interface PaymentGateway {
  processPayment(amount: number): string;
}

/* Concrete products */
export class StripeGateway implements PaymentGateway {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  processPayment(amount: number): string {
    return `Processed payment of $${amount} through Stripe using API Key: ${this.apiKey}.`;
  }
}

export class PayPalGateway implements PaymentGateway {
  private clientId: string;
  private clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  processPayment(amount: number): string {
    return `Processed payment of $${amount} through PayPal using Client ID: ${this.clientId}.`;
  }
}

/* Creator interface */
export abstract class PaymentGatewayFactory {
  abstract createPaymentGateway(): PaymentGateway;

  processAndLogPayment(amount: number): string {
    const gateway = this.createPaymentGateway();
    const result = gateway.processPayment(amount);
    console.log(`Payment log: ${result}`);
    return result;
  }
}

/* Concrete creators */
export class StripeFactory extends PaymentGatewayFactory {
  private apiKey: string;

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
  }

  createPaymentGateway(): PaymentGateway {
    return new StripeGateway(this.apiKey);
  }
}

export class PayPalFactory extends PaymentGatewayFactory {
  private clientId: string;
  private clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    super();
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  createPaymentGateway(): PaymentGateway {
    return new PayPalGateway(this.clientId, this.clientSecret);
  }
}
