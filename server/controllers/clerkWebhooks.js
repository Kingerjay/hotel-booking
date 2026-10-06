import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        // Verify headers
        await whook.verify(JSON.stringify(req.body), headers);

        // Getting data from request body
        const { type, data } = req.body;

        const userData = {
            _id: data.id,
            username: data.first_name + " " + data.last_name,
            email: data.email_addresses[0].email_address,
            image: data.image_url,
        }

        // Switch case to handle different webhook events
        switch (type) {
            case "user.created":{
                await User.create(userData);
                break;
            }

            case "user.updated":{
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }               

                default:
                    break;
        }
        res.json({ success: true, message: "Webhook processed successfully" });

    } catch (error) {
        console.error("Error processing webhook:", error);
        res.json({ success: false, message: "Error processing webhook" });
    }
}

export default clerkWebhooks;