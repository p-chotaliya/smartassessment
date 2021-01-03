const pool = require('./database_config');

const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err)
                const error = new Error('error in getting connection from pool');
                error.statusCode = 500;
                next(error);
            } else {
                // console.log(connection)
                resolve(connection);
            }
        })
    })
}

exports.get_assessment_data = async (ass_data) => {
    const exe_query = (conn, ass_data) => {
        return new Promise((resolve, reject) => {
            conn.query('select s.ass_id,s.sub_code,s.duration,s.start_date,s.marks as ass_marks,s.std,q.q_id,q.question,q.marks from assessment s join question q on s.ass_id = q.ass_id where s.ass_id=?',
                [ass_data.ass_id], (err, result) => {
                    if (err) {
                        console.log(err);
                        reject('error in executing query')
                        conn.end();
                    } else {
                        resolve(result)
                        conn.end();
                    }
                })
        })
    }
    let conn;
    try {
        conn = await getConnection();
        const result = await exe_query(conn, ass_data);
        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}

exports.submit_ans = async (ass_data) => {
    const exe_query = (conn, ass_data) => {
        return new Promise((resolve, reject) => {
            conn.batch("INSERT INTO `answer` (student_id,ass_id,q_id,question,answer) values (?,?,?,?,?)",
                ass_data, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject('error in executing query')
                        conn.end();
                    } else {
                        resolve(result)
                        conn.end();
                    }
                })
        })
    }
    let conn;
    try {
        // console.log('insertion data',ass_data)
        conn = await getConnection();
        const result = await exe_query(conn, ass_data);
        // console.log(result);
        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}

exports.submit_ans_image = async (image_data)=>{
    const exe_query = (conn, image_data) => {
        return new Promise((resolve, reject) => {
            conn.query("INSERT INTO answer_image (student_id,ass_id,q_id,image_link) values (?,?,?,?)",
                        [image_data.student_id,
                         image_data.ass_id,
                        image_data.q_id,
                        image_data.filepath], (err, result) => {
                    if (err) {
                        console.log(err);
                        reject('error in executing query')
                        conn.end();
                    } else {
                        resolve(result)
                        conn.end();
                    }
                })
        })
    }
    let conn;
    try {
        // console.log('insertion data',ass_data)
        conn = await getConnection();
        const result = await exe_query(conn, image_data);
        // console.log(result);
        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}

exports.add_student = async (student_id,student_email)=>{
    const exe_query = (conn, student_id,student_email) => {
        return new Promise((resolve, reject) => {
            conn.query("INSERT INTO student (student_id,student_email) values (?,?)",
                        [student_id,student_email], (err, result) => {
                    if (err) {
                        console.log(err);
                        reject('error in executing query')
                        conn.end();
                    } else {
                        resolve(result)
                        conn.end();
                    }
                })
        })
    }
    let conn;
    try {
        // console.log('insertion data',ass_data)
        conn = await getConnection();
        const result = await exe_query(conn, student_id,student_email);
        // console.log(result);
        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}