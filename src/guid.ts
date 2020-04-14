import BaseType from './base-type';
import Utils from './utils';

type TSetValue = string | undefined;

export default class Guid extends BaseType<Guid, string, TSetValue> {
  constructor(value?: string) {
    super(value);
  }

  protected validate(): void {
    if (typeof this.value !== 'string' || !this.isGuid(this.value)) {
      throw new Error('String supplied is not a guid string');
    }
  }

  protected setValue(value: string | undefined) {
    if (!value) {
      super.setValue(this.createGuid());
    } else {
      super.setValue(value);
    }
  }

  public static tryParse(
    value: TSetValue
  ): { parsed: false; error: Error } | { parsed: true; result: Guid } {
    return Utils.tryParse(Guid, value);
  }

  /**
   * Checks if its a valid guid
   * @param value The guid
   */
  protected isGuid(guid: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      guid
    );
  }

  private createGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
