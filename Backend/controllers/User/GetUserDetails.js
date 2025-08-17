const UserModel=require("../../model/User");
async function getUserDetails(req,res)
{
        try
        {
            const Id=req.userId;
            if (!Id) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: "Session ID is required"
                });
            }
        const UserDetails=await UserModel.findById(Id).select("-password");
        // if(!UserDetails)
        // {
        //     throw new Error("user details is not available for fetching the user details");
        // }
        res.json({
            data:UserDetails,
            mess:"deatls of user",
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
module.exports=getUserDetails;