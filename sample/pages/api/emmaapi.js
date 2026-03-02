require('dotenv').config();


const nodemailer = require('nodemailer');
const logo = "https://www.eeastng.com/nc_assets/img/logo.PNG";

export default function handler(req, res) {

    if(!req.body) {
      return res.status(400).json({ error: "Invalid Form Data"});
    }



  const output = `<div style="display: flex; justify-content: center; align-items: center; flex-direction: column !important; border-top: 4px solid #da9f46;>
  <div  style="background-color: white; border-radius: 0.5rem; box-shadow: 0 0 8px rgba(0,0,0,0.4); font-family: Helvetica, sans-serif">
      <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 0.6rem; flex-direction: column; margin-block: 0.8rem; padding: 0.6rem;">
          <img src=${logo} alt="JAMSC Logo" style="width: 20%; height: 20%; object-fit: cover; "/>
          <h2 style="color: black; font-size: 2rem; font-weight: bold; text-align: center;">JANET ADOWEI MEMORIAL SCRABBLE CLASSIC - 2023</h2>  
      </div>  

      <div style="display: flex; justify-content: start; align-items: start; flex-direction: column; padding: 0.5rem; gap: 0.8rem;">
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Name: ${req.body.surname}  ${req.body.firstname}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Email: ${req.body.email}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Phone No: ${req.body.phone_no}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Sex: ${req.body.gender}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Category: ${req.body.registration_band}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">NSF Rating: ${req.body.nsf_rating}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Day One Meal: ${req.body.meal_one}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Day Two Meal: ${req.body.meal_two}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Amount Payable: ${req.body.amount_payed}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Terms And Condition: ${req.body.agreed}</h3>
     </div>
  </div>

</div>`;

  //creating a transporter object

  const transporter = nodemailer.createTransport({
    host: "scrabblejamclassic.com",
    port: 587,
    auth: {
      user: process.env.RATINGS_EMAIL_USER,
      pass: process.env.RATINGS_EMAIL_PASS,
    },

    tls: {
      rejectUnauthorized: false,
    },
    secure: false,

  });
  //Formatting the Mail

  const mailData = {
    from: `"Janet Adowei Memorial Scrabble Tournament" <${process.env.RATINGS_EMAIL_USER}>`,
    to: `${process.env.RATINGS_EMAIL_USER}`,
    subject: `${req.body.surname} ${req.body.firstname} Registration Form`,
    text: `${req.body.surname}`,
    html: output,
  } 


  //Sending the Mail
    transporter.sendMail(mailData, (err, info) => {

      if(err)
        console.log(err)
      else
        console.log(info)
    })


  res.status(200).json({success: 'Message Sent Sucessfully!'});

  console.log(req.body);

}