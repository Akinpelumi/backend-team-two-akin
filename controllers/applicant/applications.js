const Application = require("../../models/application");
const User = require("../../models/user");
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const morgan = require("morgan");
var cloudinary = require("cloudinary").v2;

// New Application Entry
const newApp = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      birthday,
      address,
      school,
      courseOfStudy,
      cgpa
    } = req.body;
    const upload = req.files.upload;

    // const filetypes = /pdf|doc|docx/;
    // const extname = filetypes.test(path.extname(upload.originalname).toLowerCase());
    // const mimetype = filetypes.test(upload.mimetype);
    // if (extname && mimetype) {
    //   return cb(null, true);
    // } else {
    //   cb('Error: Put in the required format')
    // }

    upload.mv("public/cv/" + upload.name, function (err) {
      if (err) {
        console.log("Couldn't upload");
        console.log(err);
      } else {
        console.log("Saved!");
      }
    });

    const data = await User.findOne({
      email
    });

    if (data) {
      return res.status(409).json({
        message: `Application for ${email} has been received already`
      });
    } else {
      const newEntry = await new Application({
        firstName,
        lastName,
        email,
        birthday,
        address,
        school,
        courseOfStudy,
        cgpa,
        upload
      });
      await newEntry.save();


      var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'akintundeakinpelumi@gmail.com',
          pass: '2414adec'
        }
      }));

      var mailOptions = {
        from: 'akintundeakinpelumi@gmail.com',
        to: email,
        subject: 'Your application: Software Developer Academy',
        text: `Thank you for your interest in a career opportunity at Enyata. We have received and we are currently reviewing your application. Thank you for taking the time to fill in the application form. We encourage you to visit our website at www.enyata.com for more information.
              
              
        Enyata Recruitment Team`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return  res.status(400).json({
            message:  'Application not sent'
          })
        } else {
          return  res.status(200).json({
            message:  'Application sent! Check your mail to confirm.'
          })
        }
      });
    }
  } catch (err) {
    return next(err);
  }
};

// Display All Applications
const totalApp = async (req, res, next) => {
  try {
    const data = await Application.find({});
    res.status(200).json({
      data
    });
  } catch (err) {
    return next(err);
  }
};

// Display one application
const seeApp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({
      _id: id
    });
    res.status(200).json({
      data
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  newApp,
  totalApp,
  seeApp
};