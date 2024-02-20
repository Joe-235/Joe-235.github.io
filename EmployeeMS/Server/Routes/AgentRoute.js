import express from 'express'
import '../utils/db.js'
import jwt from 'jsonwebtoken'
import con from '../utils/db.js'
import bcrypt from 'bcrypt'


const router = express.Router()
router.post('/agent_login', (req, res) => {
    const sql = "SELECT * FROM agent where email = ? AND status = 1"
    con.query(sql, [req.body.email], (err, result) => {
        if (err) {
            return res.json({ loginStatus: false, Error: "Query error" + err})
        }
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err,response) =>{
                if (err) {  return res.json({ loginStatus: false, Error: "Wrong Password" }); }
                if (response){
                    const email = result[0].email;
                    const token = jwt.sign({ role: "agent", email:email, id: result[0].id }, "jwt_secret_key", { expiresIn: '1d' })
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
    const sql = "SELECT * FROM agent where id = ? AND status = 1"
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({Status: flase});
        return res.json(result)
    })
})
router.get('/appointments/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT id, Name, Email,  StartTime, EndTime ,appointments.show FROM appointments WHERE agent_id = ? `
    con.query(sql,[id],(err,result)=>{
        console.log(result)
        if (err) return res.json({ Status: false, Error: "Query Error"+err })
        return res.json({ Status: true, Result: result })
        
    })
})
router.put('/set_show/:id',(req,res)=>{
    const id = req.params.id
    const show = req.body.show
    const sql = `UPDATE appointments SET appointments.show = ? WHERE id=?`
    con.query(sql,[show ,id],(err,result)=>{
        if (err) return res.json({ Status: false, Error: err })
        return res.json({ Status: true, Result: result })
    })
})
router.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({Status:true})
})
export {router as agentRouter}