import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

export default class passwordEncDec {
  static async encrypt(password: string) {
    return await bcrypt.hash(password, saltOrRounds);
  }
  static async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
