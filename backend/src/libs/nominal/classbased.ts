export abstract class NominalObject<T> {
  constructor(
    public readonly value: Readonly<T>,
  ) {}
}

export abstract class NominalPrimitive<T> {
  constructor(
    public readonly value: T,
  ) {}
}
