
export class IncorrectPasswordOrEmail extends Error {
  constructor() {
    super("Your password or email are incorrect");
  }
}

export class IncorrectPasswordError extends Error {
  constructor(reason: string) {
    super(reason);
  }
}

export class IncorrectOldPasswordError extends Error {
  constructor() {
    super("Old password is incorrect");
  }
}
