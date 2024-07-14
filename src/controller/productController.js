import { Op } from "sequelize";
import { responseSend } from "../config/response.js"
import sequelize from "../model/connect.js";
import initModels from "../model/init-models.js";
import { deleteFile, upload } from '../config/upload.js';
import path from 'path';

let model=initModels(sequelize);

const getProducts=async(req,res)=>{
    try{
        let getProductAll=await model.hinh_anh.findAll();
        
        responseSend(res,getProductAll,"Thành công !",200)
  
    }catch(e){
        responseSend(res,"","Thất bại !",500)
    }
}
// tìm kiếm sản phẩm 
const searchProducts=async(req,res)=>{
    try{
        const { keyword } = req.query;
    
        let products=await model.hinh_anh.findAll({
            where:{
                ten_hinh:{
                    [Op.like]: `%${keyword}%` 

                }
            }

        })
        console.log(products);
        // kt xem có nhập keyword không
        if(products.length===0){
            return responseSend(res, [], "Không tìm thấy sản phẩm phù hợp !", 404);

        }
        responseSend(res, products, "Tìm kiếm thành công !", 200);

    }catch(e){
        console.log(e);
        responseSend(res,"","Thất bại !",500)

    }
}

// sản phẩm chi tiết
const productDetail=async(req,res)=>{
    try{
  const {id}=req.params;
    //  thông tin ảnh và người tạo ảnh bằng id ảnh

    let product=await model.hinh_anh.findAll({
        where:{
            hinh_id:id,
        },
        include: [
            {
                model: model.nguoi_dung, // Tên model của bảng người dùng
                as: 'nguoi_dung', // Alias của quan hệ (nếu có)
            }
        ] 
    })
    if(!product){
        responseSend(res,"","Không có sản phẩm",400)

    }
    responseSend(res,product,"Thành công !",200)

    }catch(e){
        console.log(e);
        responseSend(res,"","Thất bại !",500)

    }
  

}
// binh luan theo ảnh 
const commentDetail=async(req,res)=>{
    try{
        const {id}=req.params;

        let comment=await model.binh_luan.findAll(
      {
        where:{
            binh_luan_id:id,
        },
        include: [
            {
                model: model.hinh_anh, // Tên model của bảng người dùng
                as: 'hinh', // Alias của quan hệ (nếu có)
            }
        ] 
      }
    )
        if(!comment){
            responseSend(res,"","Không tìm thấy bình luận",400)
        }
        responseSend(res,comment,"Thành công !",200)

    }catch(e){
        console.log(e);
        responseSend(res,"","Thất bại !",500)

    }

}
// + GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save).
const checkSavedImage = async (req, res) => {
    const { idImage } = req.params; // Lấy hinh_id từ request parameters
  
    try {
      // Tìm hình ảnh với hinh_id tương ứng
      const image = await model.luu_anh.findOne({
        where: {
          hinh_id:idImage,
        },
      });
  
      if (!image) {
        // Nếu không tìm thấy hình ảnh
        return res.status(404).json({
          success: false,
          message: 'Hình ảnh chưa được lưu',
        });
      }
  
      // Nếu tìm thấy hình ảnh
      res.status(200).json({
        success: true,
        message: 'Hình ảnh đã được lưu',
        data: image,
      });
    } catch (error) {
      console.error('Lỗi khi kiểm tra hình ảnh:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi kiểm tra hình ảnh',
      });
    }
  };

//   post comment với người dùng
const addComment=async(req,res)=>{
    try{
        let { nguoi_dung_id	,hinh_id	,noi_dung	}=req.body
           // kt người dùng tồn tại
    const checkUser=await model.nguoi_dung.findByPk(nguoi_dung_id);
    if(!checkUser){
        return res.status(400).json({ message: 'Người dùng chưa tồn tại' });

    }
        let newComment={

            nguoi_dung_id,
            hinh_id,
            noi_dung,
            ngay_binh_luan:new Date(),
        }
        let comment=await model.binh_luan.create(newComment);
        if(comment){
            responseSend(res,comment,"Thêm bình luận thành công !",200)
        }else{
            responseSend(res,comment,"Thêm thất bại !",401)
        }
    }catch(e){
        console.log(e);
        responseSend(res,"","Thất bại !",500)

    }
}
// post image 
const addImage=async(req,res)=>{
    try{
        upload.single('image')(req, res, async (err) => {
            if (err) {
                responseSend(res,"","Lỗi khi updload",400)
                ;
            }
    
    const {mo_ta,nguoi_dung_id}=req.body;
    const ten_hinh = req.file ? `${req.file.filename}` : '';
    // kt người dùng tồn tại
    const checkUser=await model.nguoi_dung.findByPk(nguoi_dung_id);
    if(!checkUser){
        return             responseSend(res,"","Người dùng chưa tồn tại",400)
        ;

    }
            const result=await model.hinh_anh.create({
                ten_hinh,nguoi_dung_id,mo_ta,duong_dan:"http://localhost:8080/public/img/",
            
            }) 
            if(result){
                // 
             
                responseSend(res,result,"Thêm hình ảnh thành công!",200)
            }else{
                responseSend(res,result,"Thêm thất bại !",401)
            }
        })

    }catch(e){
        console.log(e);
        responseSend(res,"","Thất bại !",500)
    }
}
// delete hình
const deleteImage=async(req,res)=>{
    try{
 const {idImage}=req.params;
    const checkProduct=await model.hinh_anh.findAll({
        where:{
            hinh_id:idImage,
        }
    })
    if(!checkProduct){
        responseSend(res,"","Không có hình ảnh",400)

    }
    const filePath = path.join('public', 'img', checkProduct[0].ten_hinh);
    deleteFile(filePath);

    const result=await model.hinh_anh.destroy({   where:{
        hinh_id:idImage,
    } })
    
        if(result){
            responseSend(res,"","Xóa thành công sản phẩm",200)
        } else {
          responseSend(res,"","Lỗi khi xóa sản phẩm",500)

        }
    }catch(e){
        console.log(e);
        responseSend(res,"","Thất bại !",500)

    }
   
}
// get danh sách ảnh đã tạo theo user id.
const getListImageByUser=async(req,res)=>{
    try{
        let {idUser}=req.params;
        let imageByUser=await model.hinh_anh.findAll({
            where:{
                nguoi_dung_id:idUser,
            }

        })
        if(!imageByUser){
            responseSend(res,"","Không có hình ảnh",400)

        }
        responseSend(res,imageByUser,"Thành công !",200)

    }catch(e){
        console.log(e);
        responseSend(res,"","Thất bại !",500)

    }
}
// get danh sách ảnh đã lưu theo user id.
const getListSaveImageByUser=async(req,res)=>{
    try{
        let {idUser}=req.params;
        let imageByUser=await model.luu_anh.findAll({
            where:{
                nguoi_dung_id:idUser,
            }

        })
        if(!imageByUser){
            responseSend(res,"","Chưa lưu hình ảnh",400)

        }
        responseSend(res,imageByUser,"Thành công !",200)

    }catch(e){
        console.log(e);
        responseSend(res,"","Thất bại !",500)

    }
}
const addImageSave=async(req,res)=>{
    try{
        const {hinh_id,nguoi_dung_id}=req.body;
        console.log(hinh_id);
        const checkProduct=await model.hinh_anh.findAll({
            where:{
                hinh_id
            }
        })
        if(checkProduct.length==0){
            responseSend(res,"","Không có hình ảnh",400)
    
        }
    
    
        const addSaveImage=await model.luu_anh.create({
            hinh_id,nguoi_dung_id,ngay_luu:new Date(),
        })
  
        if(addSaveImage){
            responseSend(res, addSaveImage, "Lưu hình ảnh thành công", 200);
    
        }else{
            responseSend(res,"","Lỗi lưu hình ảnh",400)
        }
    }catch(e){
        console.log(e);
        responseSend(res, "", "Thất bại !", 500);
    
    }
    }

export {getProducts,searchProducts,addImage,addImageSave,deleteImage,productDetail,getListImageByUser,addComment,commentDetail,checkSavedImage,getListSaveImageByUser}