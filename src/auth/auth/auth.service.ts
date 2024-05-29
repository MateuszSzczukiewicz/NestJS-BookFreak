import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  private readonly configService: ConfigService;
  private readonly jwtService: JwtService;

  async register(
    user: Pick<CreateUserDto, 'email' | 'password'>,
  ): Promise<User> {
    return this.userService.createOne(user);
  }

  async login({ email, password }: LoginUserDto): Promise<User> {
    const user: User = await this.userService.findOne({ email });
    if (!user) {
      throw new BadRequestException(`User does not exist.`);
    }

    const validPassword: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!validPassword) {
      throw new BadRequestException(`Wrong password.`);
    }

    return user;
  }

  generateTokens(payload): [token: string] {
    const token: string = this.jwtService.sign({ user_id: payload.id });

    return [token];
  }

  setAuthTokens(res, payload): { accessToken: string } {
    const [accessToken] = this.generateTokens(payload);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      domain: this.configService.get('DOMAIN'),
      expires: new Date(
        Date.now() + this.configService.get('JWT_EXPIRATION_SECRET') * 1000,
      ),
    });

    return { accessToken };
  }

  clearAuthTokens(res): void {
    res.clearCookie('access_token', {
      domain: this.configService.get('DOMAIN'),
      httpOnly: true,
    });
  }
}
