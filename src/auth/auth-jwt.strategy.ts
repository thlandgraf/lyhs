import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';

// JWT authentication strategy using passport-jwt
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
      ignoreExpiration: false, // Do not allow expired tokens
      secretOrKey: 'your_jwt_secret', // Secret key to validate the token
    });
  }

  // Validate method to verify the JWT payload
  validate(payload: any): any {
    // The payload contains user information. You can add custom validation logic here.
    return { userId: payload.sub, username: payload.username }; // Returning authenticated user details
  }
}

// Guard to protect routes using the JWT strategy
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Override the canActivate method to use the base AuthGuard's functionality
  canActivate(context: ExecutionContext) {
    // Call the parent class's canActivate method to perform authentication
    return super.canActivate(context);
  }
}
