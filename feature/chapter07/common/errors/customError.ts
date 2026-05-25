import { StatusCodes } from "http-status-codes";

export class CustomError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

export class DuplicateUserEmailError extends CustomError {
  constructor() {
    super(StatusCodes.CONFLICT, "이미 존재하는 이메일입니다.");
  }
}

export class StoreNotFoundError extends CustomError {
  constructor() {
    super(StatusCodes.NOT_FOUND, "존재하지 않는 가게입니다.");
  }
}

export class UserNotFoundError extends CustomError {
  constructor() {
    super(StatusCodes.NOT_FOUND, "존재하지 않는 사용자입니다.");
  }
}

export class UserMissionNotFoundError extends CustomError {
  constructor() {
    super(StatusCodes.NOT_FOUND, "진행 중인 미션을 찾을 수 없습니다.");
  }
}

export class AlreadyCompletedMissionError extends CustomError {
  constructor() {
    super(StatusCodes.BAD_REQUEST, "이미 완료된 미션입니다.");
  }
}

export class InvalidMissionError extends CustomError {
  constructor(message = "미션 처리 요청이 올바르지 않습니다.") {
    super(StatusCodes.BAD_REQUEST, message);
  }
}
