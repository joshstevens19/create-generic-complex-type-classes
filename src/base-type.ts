export default abstract class BaseType<TClass, TValue, TSetValue> {
  private _value: TValue | undefined;
  constructor(value: TSetValue) {
    this.setValue(value);

    this.validate();
  }

  public get value(): TValue {
    if (!this._value) {
      throw new Error('Value not found');
    }

    return this._value;
  }

  public equals(other: BaseType<TClass, TValue, TSetValue>): boolean {
    return other.value === this.value;
  }

  protected setValue(value: TSetValue): void {
    this._value = (value as unknown) as TValue;
  }

  protected abstract validate(): void;
}
