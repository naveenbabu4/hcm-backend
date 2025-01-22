import mongoose from "mongoose";

enum Status{
    Processed = "Processed", 
    Pending = "Pending"
}

const payrollSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId, ref: "employee",
        required: true
    },
    basicSalary: {
        type: Number,
        required: true
    },
    allowances: {
        type: Number,
        default: 0
    },
    deductions: {
        type: Number,
        default: 0
    },
    grossSalary: {
        type: Number,
        required: true
    },
    netSalary: {
        type: Number,
        required: true
    },
    payDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: Status,
        default: Status.Pending,
    },
});

interface PayrollAttr{
    employeeId: string,
    basicSalary: Number,
    allowances: Number,
    deductions: Number,
    grossSalary: Number,
    netSalary: Number,
    payDate: Date,
    status: Status
}

interface PayrollDoc extends mongoose.Document{
    employeeId: string,
    basicSalary: Number,
    allowances: Number,
    deductions: Number,
    grossSalary: Number,
    netSalary: Number,
    payDate: Date,
    status: Status
}

interface PayrollModel extends mongoose.Model<PayrollDoc>{
    build(payroll: PayrollAttr) : PayrollDoc
}

const Payroll = mongoose.model<PayrollDoc,PayrollModel>('payroll', payrollSchema);

payrollSchema.statics.build = (payroll: PayrollAttr) => {
    return new Payroll(payroll);
}

export{
    Payroll,
    PayrollAttr
}