//express setup
const express=require("express");
const app=express();
let port=8080;
const path=require("path");
const Listing=require("./models/listing.js");

//app.set("views",path.join(__dirname,"views"));
//app.set("view engine","ejs");

//method override setup
const MethodOveride=require("method-override");
app.use(MethodOveride("_method"));

//mongoose setup
const mongoose = require('mongoose');
main().
then((res)=>{
    console.log("mongoose is working successfuly ")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.listen(port,()=>{
    console.log("port is working");
});

app.get("/",(req,res)=>{
    res.send("your port is working ");
});

app.get("/testlisting",async (req,res)=>{
   let SampleListing=new Listing(
    {
        title:"My new Villa",
        description:"By the Beach",
        price:"1200",
        location:"Calangute,Goa",
        country:"India"

    });
        await SampleListing.save();
        console.log("sample was saved");
        res.send("successful sending");
});