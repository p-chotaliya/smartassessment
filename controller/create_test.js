const pool = require('../database/database_config')
const create_test_db = require('../database/create_test_db')
const TokenGenerator = require('uuid-token-generator');
const moment = require('moment');

// to fetch all the assessment for teacher
exports.get_test = async (req, res) => {
    const t_id = req.params.teacher_id
    const ass_data = {
        t_id: t_id
    }
    try {
        const get_data = await create_test_db.get_test(ass_data);
        if (get_data.length > 0) {
            res.status(200).json({
                message: 'data found',
                data: get_data
            })
        } else if(get_data.length == 0){
            res.status(200).json({
                message: 'no data found',
                data: get_data
            })
        }else {
            res.status(400).json({
                message: 'error in fetching assessment',
                data: 0
            })
        }

    } catch (err) {
        console.log(err)
    }
}

// to fetch perticular assessment details 
exports.get_assessment = async (req, res) => {
    const ass_id = req.params.assessment_id

    const ass_data = {
        ass_id: ass_id
    }
    try {
        const get_ass_data = await create_test_db.get_assessment(ass_data);
        if (get_ass_data.length > 0) {
            res.status(200).json({
                message: 'data found',
                data: get_ass_data
            })
        }else if(get_ass_data.length == 0){
            res.status(200).json({
                message: 'no data found',
                data: get_ass_data
            })
        }else {
            res.status(400).json({
                message: 'error in fetching assessment',
                data: 0
            })
        }

    } catch (err) {
        console.log(err)
    }
}

// to create a new assessment 
exports.create_test = async (req, res) => {
    const title = req.body.title;
    const std = req.body.std;
    const duration = req.body.duration  // duration in minutes;
    const marks = req.body.marks;
    const passing_marks = req.body.passing_marks;
    const sub_code = req.body.subject_code;
    const t_id = req.body.teacher_id;
    const start_date = moment(req.body.start_date).format('YYYY-MM-DD HH:mm:ss');
    const tokgen2 = new TokenGenerator(256, TokenGenerator.BASE62);
    const ass_id = tokgen2.generate();
    const ass_link = "http://127.0.0.1:4200/assessment/" + ass_id
    const creation_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    console.log('start date', start_date)
    const ass_data = {
        ass_title: title,
        std: std,
        duration: duration,
        marks: marks,
        passing_marks: passing_marks,
        sub_code: sub_code,
        t_id: t_id,
        ass_id: ass_id,
        start_date: start_date,
        creation_date: creation_date,
        ass_link: ass_link
    }
    // console.log(ass_data)
    try {
        const inserted_data = await create_test_db.create_test(ass_data);
        if (inserted_data.affectedRows > 0) {
            res.status(200).json({
                message: 'assessment is created successfully',
                assessment_link: ass_link
            })
        } else {
            res.status(400).json({
                message: 'error in creating assessment'
            })
        }
    } catch (err) {
        console.log(err)
    }
}

// to update a asseessment using assesment id
exports.update_test = async (req, res) => {
    const ass_id = req.body.assessment_id;
    const title = req.body.title;
    const std = req.body.std;
    const duration = req.body.duration  // duration in minutes;
    const marks = req.body.marks;
    const passing_marks = req.body.passing_marks;
    const sub_code = req.body.subject_code;
    const start_date = moment(req.body.start_date).format('YYYY-MM-DD HH:mm:ss');
    const ass_data = {
        ass_id: ass_id,
        ass_title: title,
        std: std,
        duration: duration,
        marks: marks,
        passing_marks: passing_marks,
        sub_code: sub_code,
        ass_id: ass_id,
        start_date: start_date
    }
    try {
        const updated_data = await create_test_db.update_test(ass_data);
        console.log(updated_data)
        if (updated_data !== undefined) {
            if (updated_data.affectedRows > 0) {
                res.status(200).json({
                    message: 'assessment is updated successfully'
                })
            } else {
                res.status(400).json({
                    message: 'error in updatig assessment'
                })
            }
        } else {
            res.status(400).json({
                message: 'error in updatig assessment'
            })
        }
    } catch (err) {
        console.log(err)
    }
}


// to delete assessment and all question related to that assessment id
exports.delete_test = async (req, res) => {
    const ass_id = req.params.assessment_id;
    const ass_data = {
        ass_id: ass_id
    }
    try {
        
        const deleteall_questions = await create_test_db.deleteall_questions(ass_data); // to delete all question related to assessment id
        // console.log('deleteall_question', deleteall_questions);
        // console.log(deleteall_questions.affectedRows);
        if (deleteall_questions.affectedRows >= 0) {
            // console.log('works')
            const delete_data = await create_test_db.delete_test(ass_data); // to delete assessment after question is deleted
            // console.log('delete_data', delete_data)
            if (delete_data !== undefined) {
                if (delete_data.affectedRows > 0) {
                    res.status(200).json({
                        message: 'assessment is deleted successfully'
                    })
                } else {
                    res.status(400).json({
                        message: 'error in deleting assessment'
                    })
                }
            } else {
                res.status(400).json({
                    message: 'error in deleting assessment'
                })
            }
        } else {
            res.status(400).json({
                message: 'error in deleting all questions'
            })
        }

    } catch (err) {
        console.log(err)
    }
}

// to add a new question to the assessment
exports.add_question = async (req, res) => {
    const ass_id = req.body.assessment_id;
    const question = req.body.question;
    const ans = req.body.ans;
    const marks = req.body.marks;
    const tokgen2 = new TokenGenerator(256, TokenGenerator.BASE16);
    const q_id = tokgen2.generate();
    question_data = {
        ass_id: ass_id,
        q_id: q_id,
        question: question,
        ans: ans,
        marks: marks
    }

    try {
        const add_question = await create_test_db.add_question(question_data);
        if (add_question !== undefined) {
            if (add_question.affectedRows > 0) {
                res.status(200).json({
                    message: 'question added successfully'
                })
            } else {
                res.status(400).json({
                    message: 'error in adding question'
                })
            }
        } else {
            res.status(400).json({
                message: 'error in adding question'
            })
        }
    } catch (err) {
        console.log(err)
    }
}

// to update a question
exports.update_question = async (req, res) => {
    const question = req.body.question;
    const ans = req.body.ans;
    const marks = req.body.marks;
    const q_id = req.body.question_id;
    question_data = {
        q_id: q_id,
        question: question,
        ans: ans,
        marks: marks
    }

    try {
        const update_question = await create_test_db.update_question(question_data);
        if (update_question !== undefined) {
            if (update_question.affectedRows > 0) {
                res.status(200).json({
                    message: 'question updated successfully'
                })
            } else {
                res.status(400).json({
                    message: 'error in updating question'
                })
            }
        } else {
            res.status(400).json({
                message: 'error in updating question'
            })
        }
    } catch (err) {
        console.log(err)
    }
}

// for delete a question
exports.delete_question = async (req, res) => {
    const q_id = req.params.question_id
    const question_data = {
        q_id: q_id
    }
    try {
        const delete_question = await create_test_db.delete_question(question_data);
        if (delete_question !== undefined) {
            if (delete_question.affectedRows > 0) {
                res.status(200).json({
                    message: 'question deleted successfully'
                })
            } else {
                res.status(400).json({
                    message: 'error in deleting question'
                })
            }
        } else {
            res.status(400).json({
                message: 'error in deleting question'
            })
        }
    } catch (err) {
        console.log(err)
    }
}

// for get all the question for assessment with all the answers
exports.get_questions = async (req, res) => {
    const ass_id = req.params.assessment_id
    console.log(ass_id);
    const question_data = {
        ass_id: ass_id
    }
    try {
        const all_questions = await create_test_db.get_questions(question_data);
        if (all_questions.length > 0) {
            res.status(200).json({
                message: 'data found',
                data: all_questions
            })
        }else if(all_questions.length == 0){
            res.status(200).json({
                message: 'no data found',
                data: all_questions
            })
        }
         else {
            res.status(400).json({
                message: 'no data found',
                data: 0
            })
        }
    } catch (err) {
        console.log(err)
    }
}