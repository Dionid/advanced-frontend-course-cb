/* eslint-disable  @typescript-eslint/no-unused-expressions */
export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor
  };
}
/* eslint-enable  @typescript-eslint/no-unused-expressions */
