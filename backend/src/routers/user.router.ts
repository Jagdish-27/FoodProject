
import { Router } from "express";
import { sample_users } from "../data";
import jwt from 'jsonwebtoken'
import expressAsyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constans/http_status";
import bcrypt from 'bcryptjs'
const router = Router();

router.get("/seed", expressAsyncHandler(
    async (req,res)=>{
        const usersCount = await UserModel.countDocuments();
        if(usersCount > 0){
            res.send("Seed is already done!")
            return;
        }

        await UserModel.create(sample_users);
        res.send("Seed is done");
    }
));

router.post("/login",expressAsyncHandler(
    async(req,res)=>{
        // const body = req.body
        const {email, password} = req.body;
        const user  = await UserModel.findOne({email});
        // const user = sample_users.find(user => user.email === email && user.password === password)
        if(user && (await bcrypt.compare(password,user.password))){
            res.send(generateTokenResponse(user));
        }else{
            res.status(HTTP_BAD_REQUEST).send("User name or password is not valid!")
        }
    }
))

router.post('/register',expressAsyncHandler(
    async(req,res)=>{
        const {name, email, password, address} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(HTTP_BAD_REQUEST)
            .send("User is already exist, please login!");
            return;
        }

        const encryptedPassword = await bcrypt.hash(password,10);

        const newUser:User = {
            // id:'',
            name,
            email:email.toLowerCase(),
            password:encryptedPassword,
            address,
            isAdmin:false
        }

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
))

const generateTokenResponse = (user:any)=>{
    const token = jwt.sign({
        id:user.id,email:user.email, isAdmin:user.isAdmin
    },"SomeRandomText",{
        expiresIn:"30d"
    }) 
    
    user.token = token;
    return user;

    // return{
    //     user:user,
    //     token:token,
    // }
    
}

export default router;