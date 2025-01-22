import { UserAttr } from "../models/user";
import { ServiceError } from '../../errors/service-error';
import { IUserStorage } from "../storage/user-storage";

export interface IUserService{
    addUser(user: UserAttr) : Promise<UserAttr | null>;
} 

export class UserService implements IUserService{
    constructor(private userStorage:IUserService){}
    async addUser(user: UserAttr): Promise<UserAttr | null> {
        const userAdded =  await this.userStorage.addUser(user);
        return userAdded;
    }
}