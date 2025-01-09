import mongoose from "mongoose";

enum Status{
    "Present", "Absent", "Leave",
}
const attendanceSchema = new mongoose.Schema({
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "employee", 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    status: {
        type: Status,
        default: Status.Present,
    },
    checkIn: { 
        type: String 
    },
    checkOut: { 
        type: String 
    },
    totalHours: { 
        type: Number 
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

interface AttendanceAttr{
    employeeId: string;
    date: Date,
    status: Status,
    checkIn: string,
    checkOut: string,
    totalHours: Number
}

interface AttendanceDoc extends mongoose.Document{
    employeeId: string;
    date: Date,
    status: Status,
    checkIn: string,
    checkOut: string,
    totalHours: Number
}

interface AttendanceModel extends mongoose.Model<AttendanceDoc>{
    build(attendance: AttendanceAttr) : AttendanceDoc
}

attendanceSchema.statics.build = (attendance:AttendanceAttr) => {
    return new Attendance(attendance);
}

const Attendance = mongoose.model<AttendanceDoc,AttendanceModel>('attendance',attendanceSchema);

export{
    Attendance,
    AttendanceAttr
}