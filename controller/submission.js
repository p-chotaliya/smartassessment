const TokenGenerator = require('uuid-token-generator');
const moment = require('moment');
const { token } = require('morgan');

const submission_db = require('../database/submission_db');
const { get } = require('../routes/student');

exports.get_submission=async(req,res)=>{
    const ass_id = req.params.assessment_id;
    try{
        const submission_data = await submission_db.get_submission(ass_id);
        if (submission_data) {
            if (submission_data.length > 0) {
                res.status(200).json({
                    message: 'data found',
                    data: submission_data   
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

    }catch(err){
        console.log(err);
    }


}

exports.get_answer=async(req,res)=>{
    const ass_id = req.params.assessment_id;
    const student_id = req.params.student_id;
    try{
        const answer_data = await submission_db.get_answer(ass_id,student_id);
        if (answer_data) {
            if (answer_data.length > 0) {
                res.status(200).json({
                    message: 'data found',
                    data: answer_data   
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

    }catch(err){
        console.log(err);
    }
}

exports.upload_marks=async(req,res)=>{
    const student_id = req.body.student_id;
    const ass_id = req.body.ass_id;
    const q_id = req.body.question_id;
    const obtain_marks = req.body.obtain_marks;
    const ans_data = {
        student_id:student_id,
        ass_id:ass_id,
        q_id:q_id,
        obtain_marks:obtain_marks
    }
    try{
        const marks_upload_data = await submission_db.upload_marks(ans_data);
        console.log(marks_upload_data)
        if (marks_upload_data.affectedRows > 0) {
            res.status(200).json({
                message: 'marks uploaded successfully',
            })
        } else {
            res.status(400).json({
                message: 'error in uploading marks'
            })
        }

    }catch(err){
        console.log(err);
    }
    
}

exports.change_check_status= async(req,res)=>{
    const ass_id = req.body.assessment_id;
    const student_id = req.body.student_id;
    try{
        const check_status = await submission_db.change_check_status(ass_id,student_id);
        if(check_status.affectedRows > 0 ){
            res.status(200).json({
                message: 'status change as checked',
            })
        }else{
            res.status(400).json({
                message: 'error in changing statuss',
            })
        }
    }catch(err){
        console.log(err);
    }
}

exports.get_no_of_submissions = async(req,res)=>{
    const t_id = req.params.teacher_id;
    try{
        const get_no_of_submissions = await submission_db.get_no_of_submissions(t_id);
        console.log(get_no_of_submissions)
        if(get_no_of_submissions){
            res.status(200).json({
                total_submission_data : get_no_of_submissions,
            })
        }else{
            res.status(400).json({
                message: 'error in getting no of submissionss',
            })
        }
    }catch(err){
        console.log(err)
    }
}
