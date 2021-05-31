
export class IncorrectUsernameError extends Error {
  constructor(reason: string) {
    super(reason);
  }
}

export class EmailMustBeUniqueError extends Error {
  constructor() {
    super("Email must be unique");
  }
}

export class UsernameMustBeUniqueError extends Error {
  constructor() {
    super("Username must be unique");
  }
}
