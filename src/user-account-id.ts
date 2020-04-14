import BaseType from './base-type';
import Utils from './utils';

type TSetValue = string | number;

export default class UserAccountId extends BaseType<
  UserAccountId,
  string,
  TSetValue
> {
  constructor(value: TSetValue) {
    super(value);
  }

  protected validate(): void {
    if (typeof this.value !== 'string' || this.value.length !== 5) {
      throw new Error('string supplied is not a valid UserAccountId');
    }
  }

  protected setValue(value: TSetValue): void {
    super.setValue(value.toString());
  }

  public static tryParse(
    value: TSetValue
  ): { parsed: false; error: Error } | { parsed: true; result: UserAccountId } {
    return Utils.tryParse(UserAccountId, value);
  }
}
