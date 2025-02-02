import mongoose, { mongo } from "mongoose";

enum LeaveType {
    SickLeave = "Sick Leave", 
    CasualLeave = "Casual Leave", 
    PaidLeave = "Paid Leave"
}
enum Status{
    Pending = "Pending", 
    Approved = "Approved", 
    Rejected = "Rejected"
}

const leaveSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId, ref: "employee",
        required: true
    },
    leaveType: {
        type: String,
        enum: LeaveType,
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String
    },
    status: {
        type: String,
        enum: Status,
        default: Status.Pending,
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
});

interface LeaveAttr{
    employeeId: string,
    leaveType: LeaveType,
    startDate: Date,
    endDate: Date,
    reason: string,
    status: Status,
    appliedDate: Date
}

interface LeaveDoc extends mongoose.Document{
    employeeId: string,
    leaveType: LeaveType,
    startDate: Date,
    endDate: Date,
    reason: string,
    status: Status,
    appliedDate: Date
}

interface LeaveModel extends mongoose.Model<LeaveDoc>{
    build(leave: LeaveAttr) : LeaveDoc
}

const Leave = mongoose.model<LeaveDoc,LeaveModel>('leave', leaveSchema);

leaveSchema.statics.build = (leave:LeaveAttr) => {
    return new Leave(leave);
}

export{
    Leave,
    LeaveAttr
}