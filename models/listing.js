const mongoose=require("mongoose");
const Schema=mongoose.Schema;

//create here schema
const listingSchema=new Schema({
    title:{
      type:String,
      required:true,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        default:"http://getwallpapers.com/wallpaper/full/7/c/7/624165.jpg",
        set :(v)=>v===""? "http://getwallpapers.com/wallpaper/full/7/c/7/624165.jpg" : v,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;

