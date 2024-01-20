//express setup
//import express from "express";
const express=require("express");
const app=express();
const mongoose = require('mongoose');
const Listing=require("./models/listing.js");
let port=8000;
const path=require("path");
//import path from "path";
const MethodOveride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");

main().
then((res)=>{
    console.log("mongoose is working successfuly ");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
};

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
//method override setup
app.use(MethodOveride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


//mongoose setup

//const { nextTick } = require("process");


app.get("/",(req,res)=>{
    res.send("your port is working ");
});

//index route
app.get("/listings",wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    }));

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs",)
})

//show route
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

//create route
app.post("/listings",wrapAsync(async(req,res,next)=>{
    if(!req.body.listing){
     throw new ExpressError(480,"send valid data for listings")
    }
     const newListing=new Listing(req.body.listing);
     await newListing.save();
     res.redirect("/listings");

 })
 //let(title,description,image,price,country,location)
 //let listing=req.body.listing;
);


//edit route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//update route
app.put("/listings/:id",wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(480,"send valid data for listings")
       }
    let{id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

//delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));


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
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found !")); //if not matched to all above than this is consider
});

app.use((err,req,res,next)=>{     //error handler
    let{statusCode=500,message="something went wrong"}=err;
    //res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(port,()=>{
    console.log("port is working");
});

