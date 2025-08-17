const bcryptjs=require("bcryptjs")
const UserModel=require("../../model/User")
async function UserRegister(req,res)
{
    try
    {
        const {name,email,password,role}=req.body;
        if(!name)
        {
            throw new Error("please provide the email");
        }
        
        if(!email)
        {
            throw new Error("please provide the email");
        }
        const userExist= await UserModel.findOne({email});
        if(userExist)
        {
            throw new Error("user already exist");
        }
        if(!password)
        {
            throw new Error("pplease prvide the passsword");
        }
        const salt=await bcryptjs.genSaltSync(10);
        const hashPassword=await bcryptjs.hashSync(password,salt);
        if(!hashPassword)
        {
            throw new Error("some thing went wrong in hashing the password");
        }
        if(!role)
        {
            throw new Error("please provide the role as customer or student");
        }
        const payload={
            ...req.body,
            password:hashPassword
        }
        
  const userdata=new UserModel(payload);
  const savedData=await userdata.save();

  res.status(201).json({
    data:savedData,
    success:true,
    error:false,
    message:"user is create"
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
module.exports=UserRegister;