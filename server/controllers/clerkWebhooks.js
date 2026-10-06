import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // Verify the raw webhook body
        const payload = await whook.verify(req.body, headers);

        // Get data from verified payload
        const { type, data } = payload;

        console.log("Clerk webhook received:", type);

        const userData = {
            _id: data.id,
            username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            email: data.email_addresses[0].email_address,
            image: data.image_url,
        };

        switch (type) {
            case "user.created":
                await User.create(userData);
                console.log("User created in MongoDB:", data.id);
                break;

            case "user.updated":
                await User.findByIdAndUpdate(data.id, userData);
                console.log("User updated in MongoDB:", data.id);
                break;

            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                console.log("User deleted from MongoDB:", data.id);
                break;

            default:
                console.log("Unhandled webhook event:", type);
                break;
        }

        res.status(200).json({
            success: true,
            message: "Webhook processed successfully",
        });

    } catch (error) {
        console.error("Error processing webhook:", error);

        res.status(400).json({
            success: false,
            message: "Error processing webhook",
        });
    }
};

export default clerkWebhooks;