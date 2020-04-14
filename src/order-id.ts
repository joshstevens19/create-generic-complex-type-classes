import Guid from './guid';
import Utils from './utils';

export default class OrderId extends Guid {
  protected validate(): void {
    if (
      typeof this.value !== 'string' ||
      !this.isGuid(this.value) ||
      this.value.substring(0, 2) !== '92'
    ) {
      throw new Error('OrderId is not valid');
    }
  }

  public static tryParse(
    value: string | undefined
  ): { parsed: false; error: Error } | { parsed: true; result: OrderId } {
    return Utils.tryParse(OrderId, value);
  }
}
