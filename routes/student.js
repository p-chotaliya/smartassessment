var express = require('express');
var router = express.Router();
const multer = require('multer');
const assessment = require('../controller/assessment')


const storage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        console.log('file data',JSON.stringify(file));
        cb(null,file.fieldname+'-'+Date.now()+'.jpg');
    }
});
const upload = multer({storage:storage});

// to get the assessment question for student
router.get('/assessment/:assessment_id', assessment.get_assessment_data);

// to submit the assessment
router.post('/assessment/submit',assessment.submit_assessment);

// to upload the answer image 
router.post('/assessment/submit/answer-image',upload.single('ansImage'),assessment.submit_answer_image);

router.post('/add-student',assessment.add_student);

module.exports = router;