import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";

// Api to create a new room for a hotel
export const createRoom = async (req, res) => {
    try {
        // 1. Correctly extract the string User ID from the Clerk function wrapper
        const authState = typeof req.auth === 'function' ? req.auth() : req.auth;
        const userId = authState?.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: Missing authentication token." });
        }

        const { roomType, pricePerNight, amenities } = req.body;

        // 2. Query using the verified userId string variable (Fixes "Hotel not found")
        const hotel = await Hotel.findOne({ owner: userId });

        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }

        // 3. Safeguard against missing image files
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "Please upload at least one room image." });
        }

        // 4. Correct Cloudinary Mapping: Return promises directly without inner async/await rings
        const uploadPromises = req.files.map((file) => {
            // Support both Multer diskStorage (file.path) and memoryStorage fallback
            const filePath = file.path || `data:${file.mimetype};base64,${Buffer.from(file.buffer).toString("base64")}`;
            
            return cloudinary.uploader.upload(filePath, {
                folder: "hotel_booking_rooms"
            });
        });
        
        // Wait for all uploads to complete cleanly
        const uploadResponses = await Promise.all(uploadPromises);
        
        // Extract the secure URLs from the finished array response
        const images = uploadResponses.map(response => response.secure_url);

        // 5. Parse amenities safely
        let parsedAmenities = [];
        if (amenities) {
            try {
                parsedAmenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;
            } catch (e) {
                return res.status(400).json({ success: false, message: "Invalid format for amenities data." });
            }
        }

        // 6. Create the room document inside MongoDB
        await Room.create({ 
            hotel: hotel._id, 
            roomType, 
            pricePerNight: Number(pricePerNight),  
            amenities: parsedAmenities,
            images,
        });

        return res.status(201).json({ success: true, message: "Room created successfully with images!" });
        
    } catch (error) {
        console.error("❌ SERVER ERROR IN CREATE-ROOM:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
}


// Api to get all room 
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({isAvailable: true}).populate({
            path: 'hotel',
            populate: {
              path: 'owner',
              select: 'image'  
            }
        }).sort({ createdAt: -1 });

        res.json({ success: true, rooms });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Api to get all room for a specific hotel
export const getOwnerRooms = async (req, res) => {
    try {
        // 1. Correctly extract the string User ID from the Clerk function wrapper
        const authState = typeof req.auth === 'function' ? req.auth() : req.auth;
        const userId = authState?.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: Missing authentication token." });
        }

        // 2. Query using the verified userId string variable
        const hotelData = await Hotel.findOne({ owner: userId });

        // 3. Fail-safe check to prevent crashing if hotelData is null
        if (!hotelData) {
            return res.status(404).json({ success: false, message: "Hotel not found for this user account." });
        }

        // 4. Retrieve rooms matching the hotel id
        const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");

        return res.json({ success: true, rooms });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


// Api to toggle room availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({ success: true, message: "Room availability updated successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}