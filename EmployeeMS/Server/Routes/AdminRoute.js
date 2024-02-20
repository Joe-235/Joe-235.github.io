import express from 'express'
import '../utils/db.js'
import jwt from 'jsonwebtoken'
import con from '../utils/db.js'
import bcrypt from 'bcrypt'


const router = express.Router()

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin where email = ? and password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" })
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: '1d' })
            res.cookie('token', token)
            return res.json({ loginStatus: true })
        }
        else {
            return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
        }
    })
});


router.get('/employee', (req, res) => {
    const sql = `SELECT * FROM employee WHERE status=?`
    con.query(sql,[1], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/admin', (req, res) => {
    const sql = `SELECT * FROM admin`
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/inactive_employee', (req, res) => {
    const sql = `SELECT * FROM employee WHERE status=?`
    con.query(sql,[0], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})
router.get('/agent', (req, res) => {
    const sql = "SELECT * FROM agent WHERE status = ?"
    con.query(sql,[1], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})
router.get('/inactive_agent', (req, res) => {
    const sql = "SELECT * FROM agent WHERE status = ?"
    con.query(sql,[0], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post('/add_employee', (req, res) => {
    const sql = `INSERT INTO employee (name,email,password,salary) VALUES (?)`
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.salary,
            
        ]
        console.log(values)
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })

        })
    })
})

router.post('/add_agent', (req, res) => {
    const sql = `INSERT INTO agent (name,email,password,website,website_login,website_password,time_zone,startHour,endHour) VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {


        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.website,
            req.body.website_login,
            req.body.website_password,
            req.body.time_zone,
            req.body.startHour,
            req.body.endHour,
        ];

        console.log(values);

        // First query to insert agent data
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })

        })
    })
});

router.get('/agent/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM agent WHERE id=?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })

})

router.put('/edit_agent/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE agent set name = ?, email = ?, password=?,website_login = ?, website_password = ?, time_zone = ?, startHour=?, endHour=? where id = ?`
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.website_login,
            req.body.website_password,
            req.body.time_zone,
            req.body.startHour,
            req.body.endHour,
        ];
        console.log(values)
        con.query(sql, [...values,id], (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })

        })
    })
    
   
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id=?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })

})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee set name = ?, email = ?,salary = ? password = ? where id = ?`
    bcrypt.hash(req.body.password, 10, (err, hash) => {


        const values = [
            req.body.name,
            req.body.email,
            req.body.salary,
            hash,
        ];
        con.query(sql, [...values, id], (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true, Result: result })
        })
    })
    
    const values = [
        req.body.name,
        req.body.email,
        
    ];
    
})

router.put('/freeze_agent/:id',(req,res)=>{
    const id = req.params.id
    const sql = `UPDATE agent SET status =NOT status WHERE id=?`
    con.query(sql,[id],(err,result)=>{
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
        
    })
})

router.put('/freeze_employee/:id',(req,res)=>{
    const id = req.params.id
    const sql = `UPDATE employee SET status = NOT status WHERE id=?`
    con.query(sql,[id],(err,result)=>{
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
        
    })
})

router.get('/admin_count',(req,res)=>{
    const sql = "SELECT count(id) as admin from admin"
    con.query(sql,(err,result)=>{
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
        
    })
})
router.get('/employee_count',(req,res)=>{
    const sql = "SELECT count(id) as employee from employee where status = 1"
    con.query(sql,(err,result)=>{
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
        
    })
})
router.get('/agent_count',(req,res)=>{
    const sql = "SELECT count(id) as agent from agent where status = 1"
    con.query(sql,(err,result)=>{
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
        
    })
})
router.get('/salary_sum',(req,res)=>{
    const sql = "SELECT sum(salary) as sum from employee where status = 1"
    con.query(sql,(err,result)=>{
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
        
    })
})

router.put('/set_old_inactive/:id',(req,res)=>{
    const id = req.params.id
    const sql = `UPDATE assigned_emp SET status = 0 WHERE agent_id=?`
    con.query(sql,[id],(err,result)=>{
        if (err) return res.json({ Status: false, Error: "Query Error"+err })
        return res.json({ Status: true, Result: result })
        
    })
})

router.get('/assigned_employee/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT employee.name AS assigned_employee_name FROM assigned_emp JOIN employee ON assigned_emp.employee_id = employee.id WHERE assigned_emp.agent_id = ? AND assigned_emp.status = 1`
    con.query(sql,[id],(err,result)=>{
        console.log(result)
        if (err) return res.json({ Status: false, Error: "Query Error"+err })
        return res.json({ Status: true, Result: result })
        
    })
})
router.post('/assign_employee/:id', (req, res) => {
    const agent_id = req.params.id;
    const employee_id = req.body.value;

    console.log(agent_id);
    console.log(employee_id);

    const sql = 'INSERT INTO assigned_emp (agent_id, employee_id) VALUES (?, ?)';

    con.query(sql, [agent_id, employee_id], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: 'Query Error' + err });
        }
        return res.json({ Status: true, Result: result });
    });
});




router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({Status:true})
})

export { router as adminRouter }