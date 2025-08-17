const jwt=require("jsonwebtoken")
async function authtoken(req,res,next)
{
    try
    {
        const token=req.cookies?.token;
        if(!token)
        {
            return res.json({
                mess:"user not login",
                error:true,
                success:false
            })
        }
        jwt.verify(token,process.env.TOKEN_SECRET_KEY,function(err,decoded)
    {
        if(err)
        {
            console.log("error in authtoken ",err);
        }
        req.userId=decoded?._id;
        next();
    })


    }
    catch(err)
    {
        res.json({
            mess:err.message||err,
            error:true,
            success:false
        })
    }


}
module.exports=authtoken;