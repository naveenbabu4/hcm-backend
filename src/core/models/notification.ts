import mongoose from "mongoose";

enum NotificationType{
    "Email", "In-App"
}
const notificationSchema = new mongoose.Schema({
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: NotificationType,
        default: NotificationType["In-App"],
    },
    isRead: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

interface NotificationAttr{
    recipientId: string,
    title: string,
    message: string,
    type: NotificationType,
    isRead: boolean,
    createdAt: Date
}

interface NotificationDoc extends mongoose.Document{
    recipientId: string,
    title: string,
    message: string,
    type: NotificationType,
    isRead: boolean,
    createdAt: Date
}

interface NotificationModel extends mongoose.Model<NotificationDoc>{
    build(notification: NotificationAttr) : NotificationDoc;
}

const Notification = mongoose.model<NotificationDoc,NotificationModel>('notification',notificationSchema);

notificationSchema.statics.build = (notification:NotificationAttr) => {
    return new Notification(notification);
}

export{
    Notification,
    NotificationAttr
}