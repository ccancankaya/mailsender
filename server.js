const express = require("express");

const nodemailer = require("nodemailer");


const app = express();
app.get('/',function(req,res){
  return res.send(200).send('works')
})

app.use(express.json());
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "admntr67@gmail.com",
    pass: "Muslera97",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

app.post("/contact", (req, res) => {
  const message = req.body;
  const mail = {
    from: "admntr67@gmail.com",
    to: "cumhurcangs97@gmail.com",
    subject: "Kayıt edildi",
    html: `<h3>Firma Adı:</h3> <h4>${message.companyName}</h4>
      <h3>İsim Soyisim:</h3> <h4>${message.firstAndLastName}</h4>
      <h3>E-posta:</h3> <h4>${message.email}</h4>
      <h3>Cep Telefonu:</h3> <h4>${message.phone}</h4>
      <h3>Dış Alan Kontolleri:</h3> <h4>${message.outdoorChecked}</h4>
      <h3>İç Alan Kontolleri:</h3> <h4>${message.indoorChecked}</h4>
      <h3>Kameralar Mevcut Mu:</h3> <h4>${message.freeText}</h4>
      <h3>Tasaruf Kontolleri:</h3> <h4>${message.tasarufChecked}</h4>
      <h3>Kameralar Görüyor Mu:</h3> <h4>${message.freeText2}</h4>
      <h3>Özel Tasaruf Kontrolleri:</h3> <h4>${message.specialTasarufChecked}</h4>
      <h3>Kameralar Görüyor Mu:</h3> <h4>${message.freeText4}</h4>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});
app.listen(5000, () => console.log("Server Running"));

