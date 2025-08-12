const express = require ('express');
// const users= require ("./MOCK_DATA.json");
const fs= require('fs');
const mongoose = require ("mongoose");


const app = express();
const PORT =8000;


app.use(express.json()); // for JSON
app.use(express.urlencoded({ extended: true })); // for form-data / x-www-form-urlencoded

// connecting mongo

mongoose.connect('mongodb://127.0.0.1:27017/learning')
.then(()=> console.log("Mongo DB connected"))
.catch((err)=>console.log("mongo error:",err))


//Schema 

const userSchema=new mongoose.Schema({
    firstName:{
        type:  String,
        required:true,
    },
    lastName:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    jobTitle:{
        type:String,
        required:false,
    },

},{timestamps:true});

const User = mongoose.model("user",userSchema);


app.post("/api/user", async (req, res) => {
    try {
        const body = req.body;
        if (!body || !body.first_Name || !body.last_Name || !body.Email || !body.Gender || !body.job_Title) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        const result = await User.create({
            firstName: body.first_Name,
            lastName: body.last_Name,
            email: body.Email,
            gender: body.Gender,
            jobTitle: body.job_Title
        });

        console.log("result", result);
        return res.status(201).json({ msg: "Success", data: result });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
});


app.get("/users", async (req, res) => {
    try {
        const allDbUsers = await User.find({});
        const html = `
        <ul>
        ${allDbUsers.map(user => `<li>${user.firstName}</li>`).join(" ")}
        </ul>`;
        res.send(html);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
    }
});




// // middleware 

// app.use((req, res, next)=>{
//     console.log("hello m1 ")
//     next();
// });

// app.use((req, res, next)=>{
//     console.log("hello m2 ")
//     //return res.end("hey from m2");
//     next();

// });
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));


// app.get("/users",(req,res)=>{
//     const html=`
//     <ul>
//     ${users.map((user)=>`<li>${user.first_name}</li>`).join(" ")}</ul>`;
//     res.send(html)
// });



// // REST API Routes 
// app.get("/api/users",(req, res)=>{
//   //  res.setHeader("Myname","Bhushan bhomkar")
//   // always use x to the custom headers 
//     console.log(req.headers);
//     return res.json(users);
// })



// app.route("/api/users/:id").get((req,res)=>{
//    const id= Number(req.params.id);
//    const user = users.find((user)=>user.id==id);
//    return res.json(user);
// })
// .patch((req, res) => {
//     const id = Number(req.params.id);
//     const body = req.body; 

//     const index = users.findIndex(user => user.id === id);
//     if (index === -1) {
//         return res.status(404).json({ status: "error", message: "User not found" });
//     }

//     users[index] = { ...users[index], ...body };

//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
//         if (err) {
//             return res.status(500).json({ status: "error", message: "Failed to save data" });
//         }
//         res.json({ status: "success", updatedUser: users[index] });
//     });
// })

// .delete((req,res) => {
//     const id = Number(req.params.id); 
//     const index = users.findIndex(user => user.id === id);
//     if (index === -1) {
//         return res.status(404).json({ status: "error", message: "User not found" });
//     }
//     users.splice(index, 1);
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
//         if (err) {
//             return res.status(500).json({ status: "error", message: "Failed to save data" });
//         }
//         res.json({ status: "success", deletedId: id });
//     });
// });


// app.post("/api/users",(req, res)=>{
//     const body=req.body;
//   if(!body|| !body.first_name || !body.last_name||!body.email|| !body.gender ||!body.job_title){
//     return res.status(400).json({msg:"all fields are required"})
//   }
//   users.push({...body, id: users.length+1});
//     fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err,data)=>{
//      return  res.json({status:"sucess",id:users.length});
//     })

// });





app.listen(PORT,()=>console.log(`server started at port 8000`))