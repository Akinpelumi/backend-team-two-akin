 const Assessment = require("../../models/assessment");
const score = require('../../models/score') 
const dotenv = require("dotenv").config();

const AssessmentEntry = async (req, res, next) => {
    const {
        question,
        answer,
        options
    } = req.body;
    // const fileName = req.files.fileName;

    // fileName.mv("public/questions/" + fileName.name, function (err) {
    //     if (err) {
    //         console.log("Couldn't upload");
    //         console.log(err);
    //     } else {
    //         console.log("Saved!");
    //     }
    // });
    // console.log(fileName);
        try {
            const data = await Assessment.findOne({question});
            if (data) {
                return res.status(401).json({
                    message: 'Question already in the database'
                })
            
                }else{
        const newEntry = new Assessment({
            //fileName,
            question,
            answer,
            options
        });
        await newEntry.save();
        return res.status(201).json({
            message: "Question Created"
        });
    }
    } catch (err) {
        return next(err);
    }
}


const AssessmentUpdate = async (req, res, next) => {
    const {
        question,
        answer,
        options
    } = req.body;
    // const fileName = req.files.fileName
    try {
        if (req.user !== true) {
            return res.status(401).json({
                message: "You are not an admin"
            });
        } else {
            const data = await Assessment.findByIdAndUpdate(req.params.id, {
                // fileName,
                question,
                answer,
                options
            });
            if (!data) {
                return res.status(401).json({
                    message: "Cant perform the operation"
                });
            } else {
                return res.status(201).json({
                    message: "Question edited",
                    data
                });
            }
        }
    } catch(err) {
        return next(err);
    }
};

const AssessmentDelete = async (req, res, next) => {
  try{
  if (!req.user) {
    return res.status(401).json({
      message: "You need to be an admin"
    });
  } else {
    const id = req.params.id;
    const data = await Assessment.findByIdAndDelete({
         _id: id 
    });
      if (!data) {
        return res.status(401).json({
         message: "No Assessment for this id"});
      } else {
        res.status(201).json({
          message: "Assessment deleted successfully"
        });
      }

  }
} catch(err) {
  return next(err)
}
}

const AssessmentDisplay = async (req, res, next) => {
    try {
        const data = await Assessment.find({});
        return res.status(200).json({
            message: "Questions",
            data
        });
    } catch (err) {
        return next(err);
    }
};

const AssessmentDisplayOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Assessment.findOne({
            _id: id
        });
        return res.status(200).json({
            message: "Question",
            data
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    AssessmentEntry,
    AssessmentUpdate,
    AssessmentDisplay,
    AssessmentDisplayOne,
    AssessmentDelete
};