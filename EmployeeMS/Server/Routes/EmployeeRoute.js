import express from 'express'
import '../utils/db.js'
import jwt from 'jsonwebtoken'
import con from '../utils/db.js'
import bcrypt from 'bcrypt'

const router = express.Router()


router.post('/employee_login', (req, res) => {
    const sql = "SELECT * FROM employee where email = ? AND status = 1"
    con.query(sql, [req.body.email], (err, result) => {
        if (err) {
            return res.json({ loginStatus: false, Error: "Query error" + err})
        }
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err,response) =>{
                if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
                if (response){
                    const email = result[0].email;
                    const token = jwt.sign({ role: "employee", email:email, id: result[0].id }, "jwt_secret_key", { expiresIn: '1d' })
                    res.cookie('token', token)
                    return res.json({ loginStatus: true , id: result[0].id})
                }
                else{
                    return res.json({ loginStatus: false, Error: "Wrong Password" });
                }
               

            })
            
            
        }
        else {
            return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
        }
    })
});

router.get('/detail/:id', (req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ? AND status = 1"
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({Status: flase});
        return res.json(result)
    })
})

router.get('/assigned_agent/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT *  FROM assigned_emp JOIN agent ON assigned_emp.agent_id = agent.id WHERE assigned_emp.employee_id = ? AND assigned_emp.status = 1 AND agent.status = 1`
    con.query(sql,[id],(err,result)=>{
        console.log(result)
        if (err) return res.json({ Status: false, Error: "Query Error"+err })
        return res.json({ Status: true, Result: result })
        
    })
    
})

router.get('/work_hours/:agent_id',(req,res)=>{
    const agent_id= req.params.agent_id
    const sql = `SELECT startHour, endHour FROM agent WHERE id = ?`
    con.query(sql,[agent_id],(err,result)=>{
        if (err) return res.json({ Status: false, Error: "Query Error"+err })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/appointments/:agent_id',(req,res)=>{
    const agent_id = req.params.agent_id
    const sql = `SELECT id, Name, Email, Subject, StartTime, EndTime, Comments  FROM appointments WHERE agent_id = ?`
    con.query(sql,[agent_id],(err,result)=>{
        console.log(result)
        if (err) return res.json({ Status: false, Error: "Query Error"+err })
        return res.json({ Status: true, Result: result })
        
    })
})
router.post('/set_appointment',(req,res)=>{
    console.log(req.body)

    const sql = `INSERT INTO appointments (agent_id, employee_id,Name, Subject, Email, StartTime, EndTime, Comments) values (?)`
    const values = [
        req.body.agent_id,
        req.body.employee_id,
        req.body.Name,
        req.body.Subject,
        req.body.Email,
        req.body.StartTime,
        req.body.EndTime,
        req.body.Comments,
    ];
    con.query(sql,[values],(err,result)=>{
        console.log(result)
        if (err) return res.json({ Status: false, Error: "Query Error"+err })
        return res.json({ Status: true, Result: result })
        
    })
})

router.put('/edit_appointment', (req, res) => {
    const sql = `UPDATE appointments set Name=?, Subject = ?,Email = ?, StartTime =?,EndTime=?,Comments=? where id = ?`
    const id= req.body.id
    const values = [
        req.body.Name,
        req.body.Subject,
        req.body.Email,
        req.body.StartTime,
        req.body.EndTime,
        req.body.Comments,
    ];
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: err })
        return res.json({ Status: true, Result: result })
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee set name = ?, email = ?,salary = ? where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
    ];
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: err })
        return res.json({ Status: true, Result: result })
    })
})


router.put('/change_password/:id', (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM employee WHERE id = ? AND status = 1";

  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" + err });
    }

    if (result.length > 0) {
      bcrypt.compare(req.body.currentPassword, result[0].password, (err, response) => {
        if (err) {
          return res.json({ Status: false, Error: "Wrong Password" });
        }

        if (response) {
          bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
            if (err) {
              return res.json({ Status: false, Error: "Hashing Error" });
            }

            const updateSql = `UPDATE employee SET password = ? WHERE id = ?`;

            const values = [hash, id];

            con.query(updateSql, values, (err, updateResult) => {
              if (err) {
                return res.json({ Status: false, Error: "Query Error" + err });
              }

              return res.json({ Status: true });
            });
          });
        } else {
          return res.json({ Status: false, Error: "Wrong Password" });
        }
      });
    } else {
      return res.json({ Status: false, Error: "User not found or inactive" });
    }
  });
});

router.delete('/delete_appointment/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const sql = `DELETE FROM appointments WHERE id = ?`
    con.query(sql, [id], (err, result) => {
        if (err) {
          return res.json({ Status: false, Error: "Query Error" + err });
        }
        return res.json({ Status: true });
      });

})

router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({Status:true})
})
export {router as employeeRouter}