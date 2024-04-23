import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    handlerTest(data: any): Promise<any>;
}
