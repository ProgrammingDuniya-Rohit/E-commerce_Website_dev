const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/database1")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("failed to connect")
})
const LogInSchema=new mongoose.Schema({
    name:{
        type:string,
        required:true
    },
    password:{
        type:string,
        required:true
    }
})

const collection = new mongoose.model("Collection1",LogInSchema)

module.exports=collection