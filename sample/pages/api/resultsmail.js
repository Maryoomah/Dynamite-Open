require('dotenv').config();


const nodemailer = require('nodemailer');
const logo = "https://www.eeastng.com/nc_assets/img/eeast-logo-black.png";

export default function handler(req, res) {

    if(!req.body) {
      return res.status(400).json({ error: "Invalid Form Data"});
    }



  const output = `<div style="display: flex; justify-content: center; align-items: center; flex-direction: column !important; border-top: 4px solid #da9f46;>
  <div  style="background-color: white; border-radius: 0.5rem; box-shadow: 0 0 8px rgba(0,0,0,0.4); font-family: Helvetica, sans-serif">
      <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 0.6rem; flex-direction: column; margin-block: 0.8rem; padding: 0.6rem;">
          <img src=${logo} alt="EEAST Logo" style="width: 20%; height: 20%; object-fit: cover; "/>
          <h2 style="color: black; font-size: 2rem; font-weight: bold; text-align: center;">EMMANUEL EGBELE ANNUAL SCRABBLE TOURNAMENT - TRILOGY EDITION (RESULT UPLOAD)</h2>  
      </div>  

      <div style="display: flex; justify-content: start; align-items: start; flex-direction: column; padding: 0.5rem; gap: 0.8rem;">
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Category: ${req.body.category}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Round: ${req.body.round}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Winner: ${req.body.winner}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Winner Score: ${req.body.winner_score}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Loser: ${req.body.loser}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Loser Score: ${req.body.loser_score}</h3>
          <h3 style="color: black; font-size: 1.4rem; font-weight: 700; margin-block: 0.9rem;">Consent: ${req.body.agreed}</h3>
     </div>
  </div>

</div>`;

  //creating a transporter object

  const transporter = nodemailer.createTransport({
    host: "eeastng.com",
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
    from: `"Emmanuel Egbele Annual Scrabble Tournament (RESULT UPLOAD)" <${process.env.RATINGS_EMAIL_USER}>`,
    to: `${process.env.RATINGS_EMAIL_USER}`,
    subject: `${req.body.round} RESULT UPLOAD`,
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