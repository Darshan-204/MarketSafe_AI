const sendMail=require("../../helper/sendMail")

async function EmailService(req,res)
{
    const { to, subject, text, html } = req.body;

  try {
    await sendMail({ to, subject, text, html });
    res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Failed to send email:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
}

module.exports=EmailService;