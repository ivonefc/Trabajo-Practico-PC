import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(body: any): Promise<unknown>;
    private validateRequestBody;
    private normalizeNames;
    private capitalizeWords;
}
