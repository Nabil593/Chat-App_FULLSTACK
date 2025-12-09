import { upsertStreamUser } from '../config/stream.js';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Route for singup
export async function signup (req, res) {
    const { email, password, fullname } = req.body;

    try {
        if (!email || !password || !fullname) {
            return res.status(400).json({message: "All fields are required"});
        }

        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({message: "Invalid email format"});
        }

        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "Email already exists, pleace use a diffrent one"})
        }

        const randomNumber = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${randomNumber}.png`;

        const newUser = await userModel.create({
            email,
            fullname,
            password,
            profilePic: randomAvatar,
        });


      try {
          await upsertStreamUser({
            id: newUser._id.toString(),
            name: newUser.fullname,
            image: newUser.profilePic || ""
        });
        console.log(`Stream user created for ${newUser.fullname}`);
      } catch (error) {
        console.log("Error creaing Stream user:", error);
      }


        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({success:true, user:newUser});
    }

    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}




// Route for login
export async function login (req, res) {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message: "All field are required"});
        }

        const user = await userModel.findOne({email});
        if(!user) return res.status(401).json({message: "Invalid email or password"});

        const isPasswordCorrect = await user.matchPassword(password);
        if(!isPasswordCorrect) return res.status(401).json({message: "Invalid email or password"})


        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(200).json({message: true, user});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}


// Route for logout
export async function logout (req, res) {
    res.clearCookie("jwt")
    res.status(200).json({success: true, message: "Logout successful"});
}




// Rout for Onboarding
export async function onboard (req, res) {
try {
    const userId = req.user._id;

    const {fullname, bio, nativeLanguage, learningLanguage, location} = req.body

    if (!fullname || !bio || !nativeLanguage || !learningLanguage || !location) {
        return res.status(400).json({
            message: "All fields are required",
            missingFields: [
                !fullname && "fullname",
                !bio && "bio",
                !nativeLanguage && "nativeLanguage",
                !learningLanguage && " learningLanguage",
                !location && "location"
            ].filter(Boolean),
        });
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, {
        ...req.body,
        isOnboarded: true,
    }, {new:true})

    if (!updatedUser) return res.status(404).json({message: "User not found"});

    try {
        await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullname,
        image: updatedUser.profilePic || "",
    });
    console.log(`Stream user updated after onboarding for ${updatedUser.fullname}`);
    } catch (streamError) {
        console.log("Error updating Stream user during onboarding:", streamError.message);
    }

    res.status(200).json({success: true, user: updatedUser});

} catch (error) {
    console.error("Onboarding error:", error);;
    res.status(500).json({message: "Internal Server Error"});
}
};





//  chaeck if useer is loghed in
export async function me (req, res) {
    res.status(200).json({success: true, user: req.user});
};