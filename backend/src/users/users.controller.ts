import {Controller, Post, Body, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from "./dto/create-user.dto";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('signup')
    async signup(@Body(new ValidationPipe()) body: CreateUserDto) {
        const { email, password } = body;
        await this.usersService.createUser(email, password);
        return { message: 'User signed up successfully' };
    }
}