import mongoose, { mongo } from "mongoose";

enum Status{
    Active = "Active", 
    OnLeave = "On Leave", 
    Resigned = "Resigned"
}

interface Address {
    street: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
}

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        unique: true,
        required: true
    },
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

    phone: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true

    },
    designation: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: Status,
        default: Status.Active,
    },
    address: {},
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret._v;
        }
    }
});

interface EmployeeAttr{
    employeeId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    department: string,
    designation: string,
    joiningDate: Date,
    salary: Number,
    status: Status,
    Address: Address,
    createdAt: Date,
    updatedAt: Date
}

interface EmployeeDoc extends mongoose.Document{
    employeeId: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    department: string,
    designation: string,
    joiningDate: Date,
    salary: Number,
    status: Status,
    Address: Address,
    createdAt: Date,
    updatedAt: Date
}

interface EmployeeModel extends mongoose.Model<EmployeeDoc>{
    build(employee: EmployeeAttr) : EmployeeDoc
}

employeeSchema.statics.build = (employee: EmployeeAttr) => {
    return new Employee(employee)
}

const Employee = mongoose.model<EmployeeDoc,EmployeeModel>('employee',employeeSchema);

export {
    Employee,
    EmployeeAttr
}