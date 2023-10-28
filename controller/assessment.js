// const pool = require('../database/database_config')
const TokenGenerator = require('uuid-token-generator');
const moment = require('moment');
const assessment_db = require('../database/assessment_db');
const { token } = require('morgan');


//to get the assessment data without answer 
exports.get_assessment_data = async (req, res) => {
    const ass_id = req.params.assessment_id
    console.log("this is testing console")
    console.log("this is testing console message");
    console.log("this is testing console")
    console.log("this is testing console message");
    console.log("this is testing console")
    console.log("this is testing console message");
    console.log("this is testing console")
    console.log("this is testing console message");
    console.log("this is testing console")
    console.log("this is testing console message");
    console.log("this is testing console")
    console.log("this is testing console message");
    console.log("this is testing console")
    console.log("this is testing console message");
    console.log("this is testing console")
    console.log("this is testing console message");
    console.log("this is testing console")
    console.log("this is testing console message");
    console.log("this is testing console")
    console.log("this is testing console message");
    const ass_data = {
        ass_id: ass_id
    }
    try {
        const assessment_data = await assessment_db.get_assessment_data(ass_data);
        // console.log(assessment_data)
        if (assessment_data) {
            if (assessment_data.length > 0) {
                res.status(200).json({
                    message: 'data found',
                    data: assessment_data
                })
            } else {
                res.status(400).json({
                    message: 'no data found',
                    data: 0
                })
            }
        } else {
            res.status(400).json({
                message: 'no data found',
                data: 0
            })
        }

    } catch (err) {
        console.log(err)
    }
}

// to submit assessment answer without image
exports.submit_assessment= async(req,res)=>{
    const ass_data = req.body.ass_data;
    const student_id=req.body.student_id;
    const student_email=req.body.student_email;
    let ass_bulk_data = []; 
    const get_bulk_data =  ass_data.forEach(data => {
        ass_bulk_data.push(new Array(student_id,data.ass_id,data.q_id,data.question,data.answer));
    });
    // console.log(ass_bulk_data);
    try{
        const submit_ans = await assessment_db.submit_ans(ass_bulk_data);
        if(submit_ans.affectedRows >= 0){
            res.status(200).json({
                message:'assessment is submited ALL THE BEST FOR RESULT'
            })
        }
    }catch(err){
        console.log(err);
    }
}

//to submit answer image for question
exports.submit_answer_image= async(req,res) =>{
    console.log('request body in controller',req.body);
    console.log('request file data',req.file);
    const student_id = req.body.student_id;
    const student_email = req.body.student_email;
    const ass_id = req.body.ass_id;
    const q_id = req.body.question_id;
    const filepath = req.file.path;
    const image_data = {
        student_id:student_id,
        student_email:student_email,
        ass_id:ass_id,
        q_id:q_id,
        filepath:filepath
    }
    try{
        const submit_ans_image = await assessment_db.submit_ans_image(image_data);
        if(submit_ans_image.affectedRows > 0){
            res.status(200).json({
                message:'answer uploaded'
            }) 
        }
    }catch(err){
        console.log(err);
    }
}

exports.add_student = async(req,res) =>{
    const student_id = req.body.student_id;
    const student_email = req.body.student_email;
    try{
        const add_student = await  assessment_db.add_student(student_id,student_email);
        if(add_student.affectedRows > 0){
            res.status(200).json({
                message:'student added'
            })
        }else{
            res.status(400).json({
                message:'error in adding student'
            })
        }
    }catch(err){
        console.log(err)
    }
}