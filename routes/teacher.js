var express = require('express');
var router = express.Router();
const create_test = require('../controller/create_test')
const submission = require('../controller/submission');
const { route } = require('./student');

router.route('/create-test')
    .post(create_test.create_test)
    .put(create_test.update_test);

router.delete('/create-test/:assessment_id', create_test.delete_test);

router.route('/add-question')
    .post(create_test.add_question)
    .put(create_test.update_question);

router.delete('/add-question/:question_id', create_test.delete_question);

// to get all the assessment details for perticular teacher
router.get('/test/:teacher_id', create_test.get_test);

// to get all submission of all assessment of perticular teacher using teacher id
router.get('/assessment-submissions/:teacher_id',submission.get_no_of_submissions);

// to get perticular assessment details 
router.get('/assessment/:assessment_id', create_test.get_assessment);

// to get all the questions and answer for assessment
router.get('/assessment/question/:assessment_id', create_test.get_questions);

// to get all the submission of assessment
router.get('/assessment/submission/:assessment_id', submission.get_submission);

// to get the answer of the student in assessment
router.get('/assessment/answer/:student_id/:assessment_id', submission.get_answer);

// to upload the answer of the question for student
router.post('/assessment/upload-marks',submission.upload_marks);

// to change the assessment checked status 
router.post('/assessment/change-check-status',submission.change_check_status);


module.exports = router;