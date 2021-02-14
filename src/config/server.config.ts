import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('server', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST,
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRATION }
  } as JwtModuleOptions
}));
