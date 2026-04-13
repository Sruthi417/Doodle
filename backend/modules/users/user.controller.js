import User from "./user.model.js";
import cloudinary from "cloudinary";

// 👤 Get Profile
export const getProfile = async (req, res) => {
  
  try {
    console.log(req.user);
    const user = await User.findById(req.user.id).select("-__v");

    res.json(user);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update Profile (name + image)
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // update name
    if (req.body.name) {
      user.name = req.body.name;
    }

    // upload image
    if (req.file) {
      // delete old image if exists
      if (user.profileImage?.public_id) {
        await cloudinary.v2.uploader.destroy(user.profileImage.public_id);
      }

      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "profiles",
      });

      user.profileImage = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
