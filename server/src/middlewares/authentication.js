import jwt from "jsonwebtoken"

export const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if(token){
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err)=>{
                if(err){
                    return res.sendSatus(403)
                }
                next()
            })
        }

    } catch (error) {
        console.log(error)
    }
}