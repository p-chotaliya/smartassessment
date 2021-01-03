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

exports.get_submission = async (ass_id) => {
    const exe_query = (conn, ass_id) => {
        return new Promise((resolve, reject) => {
            conn.query('select s.student_id,s.student_name,s.student_email,a.ass_id,sum(a.obtain_marks) as total_marks,a.status, ass.marks from smartass.student s join smartass.answer a on s.student_id = a.student_id join assessment ass on a.ass_id = ass.ass_id group by s.student_id,s.student_name,s.student_email,a.ass_id having a.ass_id=?',
                        [ass_id], (err, result) => {
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
        const result = await exe_query(conn, ass_id);
        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}

exports.get_answer = async (ass_id,student_id) => {
    const exe_query = (conn, ass_id,student_id) => {
        return new Promise((resolve, reject) => {
            conn.query('select s.student_id,s.student_name,s.student_email,a.ass_id,a.q_id,a.question,a.answer,a.obtain_marks,ai.image_link,q.marks from student s left outer join answer a on s.student_id = a.student_id left outer join answer_image ai on a.q_id = ai.q_id and a.student_id = ai.student_id left outer join question q on a.q_id=q.q_id where a.ass_id=? and a.student_id=?',
                        [ass_id,student_id], (err, result) => {
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
        const result = await exe_query(conn, ass_id,student_id);
        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}

exports.upload_marks = async (ans_data) => {
    const exe_query = (conn, ans_data) => {
        return new Promise((resolve, reject) => {
            conn.query('update answer set obtain_marks =? where student_id=? and ass_id=? and q_id=?',
                        [ans_data.obtain_marks,
                        ans_data.student_id,
                        ans_data.ass_id,
                        ans_data.q_id
                        ], (err, result) => {
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
        const result = await exe_query(conn,ans_data);
        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}

exports.change_check_status = async (ass_id,student_id) => {
    const exe_query = (conn, ass_id,student_id) => {
        return new Promise((resolve, reject) => {
            conn.query('update answer set status =? where student_id=? and ass_id=?',
                        ["checked",student_id,ass_id], (err, result) => {
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
        const result = await exe_query(conn,ass_id,student_id);
        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}

exports.get_no_of_submissions = async (t_id) => {
    const exe_query = (conn, t_id) => {
        return new Promise((resolve, reject) => {
            conn.query('select count(distinct a.student_id) as total_sub ,a.ass_id,ass.t_id from answer a left outer join assessment ass on a.ass_id= ass.ass_id group by a.ass_id having t_id =?',
                        [t_id], (err, result) => {
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
        const result = await exe_query(conn,t_id);
        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}