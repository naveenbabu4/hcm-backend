import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String, 
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId, ref: "employee"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

interface DepartmentAttr{
    name: string,
    description: string,
    managerId: string,
    createdAt: Date,
    updatedAt: Date
}

interface DepartmentDoc extends mongoose.Document{
    name: string,
    description: string,
    managerId: string,
    createdAt: Date,
    updatedAt: Date
}

interface DepartmentModel extends mongoose.Model<DepartmentDoc>{
    build(department: DepartmentAttr) : DepartmentDoc
}

const Department = mongoose.model<DepartmentDoc,DepartmentModel>('department',departmentSchema);

departmentSchema.statics.build = (department: DepartmentAttr) => {
    return new Department(department);
}