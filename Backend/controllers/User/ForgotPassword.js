const bcryptjs=require("bcryptjs")
const userModel=require("../../model/User")
async function ForgotPassword(req,res)
{
    try{
        const {email,newPassword}=req.body;
    if(!email)
    {
       throw new Error("please provide the email");
    }
    if(!newPassword)
    {
        throw new Error("please provide the new password");
    }
    const user=await userModel.findOne({email});
    const salt= await bcryptjs.genSaltSync(10);
    const hashPassword=await bcryptjs.hashSync(newPassword,salt);
    user.password=hashPassword;
    await user.save();
    res.json({
        mess:"password is changed",
        success:true,
        error:false
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
module.exports=ForgotPassword;