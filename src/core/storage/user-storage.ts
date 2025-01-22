import { User, UserAttr } from '../models/user'

export interface IUserStorage {
    addUser(user: UserAttr) : Promise<UserAttr | null>;
}

export class UserStorage implements IUserStorage{
    async addUser(user: UserAttr): Promise<UserAttr | null> {
        const userDb =  new User(user);
        await userDb.save();
        return userDb;
    }
}