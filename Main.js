var express=require("express")
var mysql=require("mysql2")

var app=express()
app.use(express.json())

// Connection

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'#vvtally123',
    database:'sarathi'
})

connection.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Connected to Database !")
    }
})


// POST 

app.post("/post",(request,response)=>{

    const id=request.body.id;
    const name=request.body.name;
    const age=request.body.age;

    connection.query('INSERT INTO employee values(?,?,?)',[id,name,age],(error,result)=>{
        if(error){
            console.log(error);
        }else{
            response.send(result)
        }
    })
})

// GET

app.get("/get",(request,response)=>{
    connection.query('SELECT * FROM sarathi.employee',(error,result)=>{
        if(error){
            console.log(error);
        }
        else{
            response.send(result)
        }
    })
})

// DELETE

app.delete("/delete/:id",(request,response)=>{

    const deleteid=request.params.id
    connection.query('DELETE FROM sarathi.employee WHERE id=?',deleteid,(error,result)=>{
        if (error) {
            console.log(error);
        } else {
            response.send(result)
            console.log("deleted");
        }
    })
})

// create Database

app.post("/create/:Database", (request, response) => {
    const dbname = request.params.Database;

    connection.query('CREATE DATABASE ??', [dbname], (error, result) => {
        if (error) {
            console.log(error);
            response.status(500).send("Error creating the database");
        } else {
            console.log("Database created");
            // Once the database is created, switch to using it
            connection.query('USE ??', [dbname], (useError, useResult) => {
                if (useError) {
                    console.log(useError);
                    response.status(500).send("Error switching to the database");
                } else {
                    console.log("Using database: " + dbname);
                    response.send("Database created and in use: " + dbname);
                }
            });
        }
    });
});


app.listen(4000,(error)=>{

    if(error){
        console.log(error);
    }
    else{
        console.log("Current PORT is 3000")
    }
})