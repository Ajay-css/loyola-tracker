import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //maxage of the cookie 
        httpOnly: true, // Prevernt XSS Attack cross-site scripting Attacks
        sameSite: "strict"
    })
}