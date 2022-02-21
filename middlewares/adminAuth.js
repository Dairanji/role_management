const jwt=require('jsonwebtoken');

exports.adminAuthJwt=(req,res,next)=>{
    if(req.cookies && req.cookies.adminToken){
        jwt.verify(req.cookies.adminToken,'mitra123',(err,data)=>{
            req.admin=data
            next()
        })
    }else{
        next()
    }
}