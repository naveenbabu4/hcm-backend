import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        required: true
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        required: true
    },
    reviewPeriod: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    feedback: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

interface PerformanceAttr{
    employeeId: string,
    reviewerId: string,
    reviewPeriod: string,
    rating: Number,
    feedback: string,
    createdAt: Date
}

interface PerformanceDoc extends mongoose.Document{
    employeeId: string,
    reviewerId: string,
    reviewPeriod: string,
    rating: Number,
    feedback: string,
    createdAt: Date
}

interface PerformanceModel extends mongoose.Model<PerformanceDoc>{
    build( performance: PerformanceAttr) : PerformanceDoc
}

const Performance = mongoose.model<PerformanceDoc,PerformanceModel>('performance',performanceSchema);

performanceSchema.statics.build = (performance: PerformanceAttr) => {
    return new Performance(performance);
}

export{
    Performance,
    PerformanceAttr
}