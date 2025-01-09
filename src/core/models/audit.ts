import mongoose, { mongo } from "mongoose";

const auditSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    action: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

interface AuditAttr{
    userId: string,
    action: string,
    description: string,
    timestamp: Date
}

interface AuditDoc extends mongoose.Document{
    userId: string,
    action: string,
    description: string,
    timestamp: Date
}

interface AuditModel extends mongoose.Model<AuditDoc>{
    build(audit: AuditAttr) : AuditDoc 
}

const Audit = mongoose.model<AuditDoc,AuditModel>('audit',auditSchema);

auditSchema.statics.build = (audit: AuditAttr) => {
    return new Audit(audit);
}

export{
    Audit,
    AuditAttr
}