

export interface ValidationChecker {
  check(...value: any): Error[]
}
