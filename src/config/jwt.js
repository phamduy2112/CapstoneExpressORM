import jwt from 'jsonwebtoken'

export const createToken=(data)=>{
    return jwt.sign({data},"BI_MAT",{expiresIn:"12h"})
}
export const checkToken=(token)=>{
    return jwt.verify(token,"BI_MAT",(error)=>error)
}
export const decodeToken=(token)=>{
    return jwt.decode(token)
}
// token ref
export const createTokenRef=(data)=>{
    return jwt.sign({data},"BI_MAT_REF",{expiresIn:"60d"})
}
export const checkTokenRef=(token)=>{
    return jwt.verify(token,"BI_MAT_REF",(error)=>error)
}
export const middleToken=(req,res,next)=>{
    let {token}=req.headers;
    let error=checkToken(token)
    if(error) res.status(401).send(error.name)
    else next();
    
}
