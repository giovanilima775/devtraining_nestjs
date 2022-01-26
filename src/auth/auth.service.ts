import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    const refresh_token = this.jwtService.sign(
      { payload },
      { expiresIn: '1d' },
    );

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token,
    };
  }

  async validateUser(email: string, password: string) {
    let user: User;

    try {
      user = await this.usersService.findOneOrFail({ email });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async refreshToken(token: string): Promise<any> {
    const auth_secret = process.env.JWT_SECRET_KEY;

    const verify = this.jwtService.verify(token, { secret: auth_secret });
    if (!verify) throw Error('Invalid refresh token');

    const id = verify.payload.sub;
    const user = await this.usersService.findOne(id);
    const auth = await this.login({ id: user.id, email: user.email });

    return auth;
  }
}
