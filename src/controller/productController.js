import { Op } from "sequelize";
import { responseSend } from "../config/response.js"
import sequelize from "../model/connect.js";
import initModels from "../model/init-models.js";
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
export {getProducts,searchProducts,productDetail,addComment,commentDetail,checkSavedImage}