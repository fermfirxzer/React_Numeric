const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.listen(3001, () => {
    console.log("Server started")
})
console.log("test")
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'numeric',
    port: 3307
})
db.connect((err) => {
    if (err) {
        console.log('Error failed to connect to database', err);
        return
    }
    console.log('Database conntected');
})
app.get('/test',(req,res)=>{
    db.query("SELECT *FROM test",(err,result)=>{
        if(err){
        }
        else{
            res.send(result);
        }
    })
})
// app.get('/test', (req, res) => {
//     db.query("SELECT * FROM intergration", (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send(result);
//         }
//     })
// })
// app.get('/diff',(req,res)=>{
//     db.query("SELECT * FROM diff",(err,result)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.send(result);
//         }
//     })
// })
// app.get('/matrix',(req,res)=>{
//     db.query("SELECT * FROM matrix",(err,result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             res.send(result);
//         }
//     })
// })