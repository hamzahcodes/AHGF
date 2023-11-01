import jwt from "jsonwebtoken"

export const getDataFromToken = (req) => {
    try {
        // console.log("cookies", req.cookies.get("token").value);
        const token = req.cookies.get("token").value || ""
        if(!token) return null
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // console.log("decoded token: ", decodedToken.id);
        return decodedToken.id
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message)
    }
}