import { generateToken } from "../config/utils.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All Fields are required!" })
        }
        if (password.length > 6) {
            return res.status(400).json({ message: "Password must be at least 6 Characters Long" })
        }
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Email Already Exits" })
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })
        if (newUser) {
            // Generate JWT Token
            generateToken(newUser._id, res)
            await newUser.save();
            console.log(newUser)
            res.status(200).json({ message: "User Created Successfully!" })
        }
        else {
            res.status(400).json({ message: "Invalid User Data!" })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credintials" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credintials" })
        }
        generateToken(user._id, res);
        res.status(200).json({ message: "Login Successful!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out Successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}