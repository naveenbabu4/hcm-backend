import mongoose from 'mongoose';

enum Roles {
    Admin = "Admin", 
    Manager = "Manager", 
    Employee ="Employee"
}
enum Status{
    Active = "Active", 
    Inactive = "Inactive"
}


const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: Roles,
        required: true,
    },
    status: {
        type: String,
        enum: Status,
        default: Status.Active,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
},
{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret._v;
        }
    }
}
)

interface UserAttr {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Roles,
    status: Status,
    createdAt: Date,
    updatedAt: Date
}

interface UserDoc extends mongoose.Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Roles,
    status: Status,
    createdAt: Date,
    updatedAt: Date
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(user: UserAttr): UserDoc;
}

userSchema.statics.build = (user: UserAttr) => {
    return new User(user);
}

const User = mongoose.model<UserDoc, UserModel>('user', userSchema);

export { User,UserAttr,Roles,Status }