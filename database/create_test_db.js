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

exports.get_test = async (ass_data) => {
    const exe_query = (conn, ass_data) => {
        return new Promise((resolve, reject) => {
            conn.query('select * from assessment where t_id=? order by creation_date desc', [ass_data.t_id], (err, result) => {
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

exports.get_assessment = async (ass_data) => {
    const exe_query = (conn, ass_data) => {
        return new Promise((resolve, reject) => {
            conn.query('select * from assessment where ass_id=?', [ass_data.ass_id], (err, result) => {
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

exports.create_test = async (ass_data) => {
    const exe_query = (conn, ass_data) => {
        return new Promise((resolve, reject) => {
            conn.query('insert into assessment values(?,?,?,?,?,?,?,?,?,?,?)',
                [ass_data.ass_id,
                ass_data.ass_title,
                ass_data.sub_code,
                ass_data.t_id,
                ass_data.duration,
                ass_data.start_date,
                ass_data.creation_date,
                ass_data.marks,
                ass_data.passing_marks,
                ass_data.std,
                ass_data.ass_link], (err, result) => {
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

exports.update_test = async (ass_data) => {
    const exe_query = (conn, ass_data) => {
        return new Promise((resolve, reject) => {
            conn.query('update assessment set ass_title=?,sub_code=?,duration=?,start_date=?,marks=?,passing_marks=?,std=? where ass_id = ?', [ass_data.ass_title, ass_data.sub_code, ass_data.duration, ass_data.start_date, ass_data.marks, ass_data.passing_marks, ass_data.std, ass_data.ass_id], (err, result) => {
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

exports.delete_test = async (ass_data) => {
    const exe_query = (conn, ass_data) => {
        return new Promise((resolve, reject) => {
            conn.query('delete from assessment where ass_id =?', [ass_data.ass_id], (err, result) => {
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
        console.log(result)
        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}

exports.add_question = async (question_data) => {
    const exe_query = (conn, question_data) => {
        return new Promise((resolve, reject) => {
            conn.query('insert into question values(?,?,?,?,?)',
             [  question_data.ass_id,
                 question_data.q_id, 
                 question_data.question, 
                 question_data.ans, 
                 question_data.marks], (err, result) => {
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
        const result = await exe_query(conn, question_data);
        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}

exports.update_question = async (question_data) => {
    const exe_query = (conn, question_data) => {
        return new Promise((resolve, reject) => {
            conn.query('update question set question=?,ans=?,marks=? where q_id=?', [question_data.question, question_data.ans, question_data.marks, question_data.q_id], (err, result) => {
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
        const result = await exe_query(conn, question_data);
        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}

exports.delete_question = async (question_data) => {
    const exe_query = (conn, question_data) => {
        return new Promise((resolve, reject) => {
            conn.query('delete from question where q_id=?', [question_data.q_id], (err, result) => {
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
        const result = await exe_query(conn, question_data);
        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}

exports.get_questions = async (question_data) => {
    const exe_query = (conn, question_data) => {
        return new Promise((resolve, reject) => {
            conn.query('select * from question where ass_id=?', [question_data.ass_id], (err, result) => {
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
        const result = await exe_query(conn, question_data);

        return result;

    } catch (err) {
        console.log(err);
        conn.end();
    }
}


// to delete all the qustion of the assessment
exports.deleteall_questions = async (ass_data) => {
    const exe_query = (conn, ass_data) => {
        return new Promise((resolve, reject) => {
            conn.query('delete from question where ass_id=?', [ass_data.ass_id], (err, result) => {
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