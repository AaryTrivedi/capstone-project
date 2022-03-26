const { ObjectId } = require("mongodb");
const notificationModel = require("../models/notification");

class NotificationService {
    async getUserNotifications(user) {
        const notifications = await notificationModel.find({
            forUser: new ObjectId(user._id),
        })
        .populate("forUser")
        .populate("fromUser")
        .populate("ride", "ride._id rideIdentifier");
        return notifications;
    }
}

module.exports = new NotificationService();
