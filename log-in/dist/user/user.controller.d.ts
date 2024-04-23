import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from './dto/pagination-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        message: import("./messages/user-messages").UserMesssage;
    }>;
    logIn(createUserDto: CreateUserDto): Promise<object>;
    get(pagitationDto?: PaginationDto): Promise<import("rxjs").Observable<any>>;
}
