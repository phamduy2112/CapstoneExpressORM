import initModels from '../model/init-models.js'

import bcrypt from 'bcrypt'
import { responseSend } from '../config/response.js';
import sequelize from '../model/connect.js';
import { checkToken, createToken, createTokenRef, decodeToken } from '../config/jwt.js';
let model=initModels(sequelize);

// đăng kí
const register=async(req,res)=>{
    try{
         let {email,matKhau,hoTen,tuoi}=req.body
         // kt email tồn tại
         let checkUser=await model.nguoi_dung.findOne({
        where:{email}
    })
    if(checkUser){
        responseSend(res, "", "Email đã tồn tại", 409); // 409 là mã lỗi Conflict

    }else{
        let newUser={
            email,
            mat_khau:bcrypt.hashSync(matKhau,10),
            ho_ten:hoTen,
            tuoi,
            role:"USER",
            token:"",
            refresh_token:"",
            anh_dai_dien:"",
    
        } 
        
       
        await model.nguoi_dung.create(newUser)
        responseSend(res,newUser,"Thành công !",200)
    }
    


    }catch(e){
        console.error(e);
        responseSend(res,"","Thất bại !",500)

    }
  
    
}
// đăng nhập 
const login=async(req,res)=>{
    try{
        let {email,matKhau}=req.body;
        let checkUser=await model.nguoi_dung.findOne({
            where:{email}
        });
        if(checkUser){
            if(bcrypt.compareSync(matKhau,checkUser.mat_khau)){
                let token=createToken({nguoi_dung_id:checkUser.dataValues.nguoi_dung_id});
                let tokenRef=createTokenRef({nguoi_dung_id:checkUser.dataValues.nguoi_dung_id});
                checkUser.refresh_token=tokenRef;
                checkUser.token=token;
              model.nguoi_dung.update(checkUser.dataValues,{
                    where:{
                        nguoi_dung_id:checkUser.dataValues.nguoi_dung_id
                    }
                })
                responseSend(res,checkUser,"Thành công !",200)
    
            }else{
                responseSend(res,"","Sai mật khẩu !",403)
    
            }
        }else{
            responseSend(res,"","Sai email !",403)
    
        }
    }catch(e){
        console.log(e);
        responseSend(res,"","Thất bại !",500)

    }
  
}
//  reset token
const resetToken=async(req,res)=>{
let {token}=req.headers;
let errorToken=checkToken(token);
if(errorToken!=null && errorToken.name!="TokenExpiredError"){
    responseSend(res,"","Not Authorize !",401);
    return
}
let {data}=decodeToken(token);
let getUser=await model.nguoi_dung.findByPk(data.nguoi_dung_id);

let tokenNew=createToken({
    nguoi_dung_id:getUser.dataValues.nguoi_dung_id,
});
responseSend(res,tokenNew,"Thành công !",200)
}
export {register,login}