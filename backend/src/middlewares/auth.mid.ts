import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constans/http_status";


export default (req:any, res:any, next:any)=>{
    const token = req.headers.access_token as string;
    if(!token) return res.status(HTTP_UNAUTHORIZED).send("Unauthorized: Missing token");

    try {
        const decodedUser = verify(token, process.env.JWT_SECRET!) ;
        req.user = decodedUser;

        
    } catch (error) {
        console.error("Authentication Error:", error);
        res.status(HTTP_UNAUTHORIZED).send("Unauthorized: Missing user");
    }

    return next();
}