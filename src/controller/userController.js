import initModels from '../model/init-models.js'

import bcrypt from 'bcrypt'
import { responseSend } from '../config/response.js';
import sequelize from '../model/connect.js';
import { deleteFile, uploadUser } from '../config/upload.js';

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
                
              model.nguoi_dung.update(checkUser.dataValues,{
                    where:{
                        nguoi_dung_id:checkUser.dataValues.nguoi_dung_id
                    }
                })
                responseSend(res,{checkUser,"token":token},"Thành công !",200)
    
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

const getUsers=async (req,res)=>{
    try{
        let users=await model.nguoi_dung.findAll();
        responseSend(res,users,"Thành công !",200)

    }catch(e){
        console.log(e);
        responseSend(res,"","Thất bại !",500)

    }
}
// lấy thông tin user theo id
const getUserId=async(req,res)=>{
    try{
        const {idUser} = req.params;
        let user=await model.nguoi_dung.findAll({
            where:{
                nguoi_dung_id:idUser
            }
        })
        if(!user){
            responseSend(res,"","Không có người dùng",400)
    
        }
        responseSend(res,user,"Thành công !",200)
    }catch(e){
        console.log(e);
        responseSend(res,"","Thất bại !",500)

    }
}
// post image user
const AddImageUser = async (req, res) => {
    try {
        uploadUser.single('image')(req, res, async (err) => {
            if (err) {
                return responseSend(res, "", "Lỗi khi upload", 400);
            }

            const { idUser } = req.params;
            const ten_hinh = req.file ? req.file.filename : '';

            // Find the user by idUser
            let user = await model.nguoi_dung.findOne({
                where: {
                    nguoi_dung_id: idUser
                }
            });

            if (!user) {
                return responseSend(res, "", "Không tìm thấy người dùng", 400);
            }

            // Update the user's avatar image field
            user.anh_dai_dien = ten_hinh;

            // Save the changes to the database
            await user.save();

            // Respond with success message and updated user object
            responseSend(res, user, "Cập nhật hình ảnh thành công", 200);
        });
    } catch (e) {
        console.error('Lỗi khi xử lý yêu cầu:', e);
        responseSend(res, "", "Thất bại !", 500);
    }
};
// chỉnh sửa thông tin user
const editUser=async(req,res)=>{
    try{
        const { idUser } = req.params;
        let user=await model.nguoi_dung.findOne({
                where:{
                    nguoi_dung_id:idUser
                }
            
        })
        if (!user) {
            return responseSend(res, "", "Không tìm thấy người dùng", 400);
        }
        const {email,hoTen,tuoi,role}=req.body
        if (email !== undefined) user.email = email;
        if (hoTen !== undefined) user.ho_ten = hoTen;
        if (tuoi !== undefined) user.tuoi = tuoi;
        if (role !== undefined) user.role = role;
        await user.save();

        // Respond with success message and updated user object
        responseSend(res, user, "Cập nhật người dùng thành công", 200);
        
    }catch(e){
        console.log(e);
        responseSend(res, "", "Thất bại !", 500);

    }
}

export {register,login,resetToken,getUsers,getUserId,AddImageUser,editUser}