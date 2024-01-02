//express setup
const express=require("express");
const app=express();
let port=8000;
const path=require("path");
const Listing=require("./models/listing.js");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

//method override setup
//const MethodOveride=require("method-override");
//app.use(MethodOveride("_method"));

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

//index route
app.get("/listings",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    });

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs",)
})

//show route
app.get("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
    
});

//create route
app.post("/listings",async(req,res)=>{
    //let(title,description,image,price,country,location)
    //let listing=req.body.listing;
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})





/* app.get("/testlisting",async (req,res)=>{
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
}); */

