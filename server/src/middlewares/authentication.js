import jwt from "jsonwebtoken"

export const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) return res.status(401).json({ message: "Access Denied" });
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
    }
}