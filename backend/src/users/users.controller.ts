import {Controller, Post, Body, ValidationPipe, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from "./dto/create-user.dto";
import {AuthGuard} from "../auth/auth.guard";
import {User} from "./users.decorator";


@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('signup')
    async signup(@Body(new ValidationPipe()) body: CreateUserDto, @User() user: any) {
        const { email, password } = body;
        await this.usersService.createUser(email, password);
        if (user) {
            console.log(`Request made by user: ${user.id}`);
        } else {
            console.log('Request made by an unauthenticated user');
        }
        return { message: 'User signed up successfully' };
    }
}