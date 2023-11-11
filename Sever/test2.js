const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const app=express();
app.use(cors());
app.use(express.json());
app.listen(3001,()=>{

})
const db=mysql.createConnection({
    host:loaclhost,
    user:'root',
    password:'',
    database:'numeric',
    port:3307,
})
db.connect((err)=>{
    if(err){
        console.log("database false")
    }
    else{
        console.log("connect database")
    }
})
app.get(('/test2'),(req,res)=>(
    db.query("SELECT * FROM test",(err,result)=>{
        if(err){
            
        }
        else{
            res.send(result);
        }
    }
    ))
)
