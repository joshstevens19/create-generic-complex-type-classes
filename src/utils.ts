export default class Utils {
  public static tryParse<TClass, TValue>(
    type: new (result: TValue) => TClass,
    value: TValue
  ): { parsed: false; error: Error } | { parsed: true; result: TClass } {
    try {
      const instance = new type(value);
      return {
        parsed: true,
        result: instance,
      };
    } catch (error) {
      return { parsed: false, error };
    }
  }
}
