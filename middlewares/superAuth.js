const jwt=require('jsonwebtoken');

exports.superAuthJwt=(req,res,next)=>{
    if(req.cookies && req.cookies.superToken){
        jwt.verify(req.cookies.superToken,'mitra123',(err,data)=>{
            req.superadmin=data
            next()
        })
    }else{
        next()
    }
}