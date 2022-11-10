import { NotFoundException } from '@nestjs/common';

export class LoginError {
  static errorResponse() {
    const errorResponse = new NotFoundException(
      null,
      'username/password is wrong',
    );
    return {
      statusCode: errorResponse.getStatus(),
      message: [errorResponse.message],
    };
  }
}
