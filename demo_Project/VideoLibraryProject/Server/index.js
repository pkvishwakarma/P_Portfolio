var mongoClient=require("mongodb").MongoClient;
var expressModule=require("express");
var cors=require("cors");
var app=expressModule();
app.use(cors());
app.use(expressModule.urlencoded({extended:true}));
app.use(expressModule.json());
var dataStr="mongodb://127.0.0.1:27017";

//User Get and Post Method and REST API..
app.get("/users",function(req,res){
    mongoClient.connect(dataStr).then((clientObj)=>{
        var database=clientObj.db("videoProjectDB");
        database.collection("tbluser").find({}).toArray().then((documents)=>{
            res.send(documents);
            res.end();
        }).catch((error)=>{
            res.send("unable to fetch data"+error);
            // console.log("database name not define");
        })
    })
})
app.post("/addusers",function(req,res){
    var user={
        user_Id:req.body.user_Id,
        user_Name:req.body.user_Name,
        user_Password:req.body.user_Password,
        user_Gender:req.body.user_Gender,
        user_Email:req.body.user_Email,
        user_Mobile:parseInt(req.body.user_Mobile)
    }
    mongoClient.connect(dataStr).then((clientObj)=>{
        var database=clientObj.db("videoProjectDB");
        database.collection("tbluser").insertOne(user).then(()=>{
            console.log("New User Addded Successfully");
            res.redirect("/users");
            res.end();
        })
    })
})

//Admin login details GET Method and REST API..
app.get("/admin",(req,res)=>{
    mongoClient.connect(dataStr).then((clientObj)=>{
        var database=clientObj.db("videoProjectDB");
        database.collection("tbladmin").find({}).toArray().then((doc)=>{
            res.send(doc);
            res.end();
        })
    })
})

//Admin Dashboard details GET and POST Method and REST API..
app.get("/videos",function(req,res){
    mongoClient.connect(dataStr).then((clientObj)=>{
        var database=clientObj.db("videoProjectDB");
        database.collection("videogallery").find({}).toArray().then((document)=>{
            res.send(document);
        })
    })
})
app.get("/videos/:id",function(req,res){
    var id=parseInt(req.params.id);
    mongoClient.connect(dataStr).then((clientObj)=>{
        var database=clientObj.db("videoProjectDB");
        database.collection("videogallery").find({video_Id:id}).toArray().then((doc)=>{
            res.send(doc);
        })
    })
})
app.post("/addvideo",(req,res)=>{
    var video={
        video_Id:parseInt(req.body.video_Id),
        video_Title:req.body.video_Title,
        video_Url:req.body.video_Url,
        video_Category:req.body.video_Category,
        video_Likes:parseInt(req.body.video_Likes),
        video_Dislikes:parseInt(req.body.video_Dislikes),
        video_Comments:req.body.video_Comments
    }
    mongoClient.connect(dataStr).then((clientObj)=>{
        var database=clientObj.db("videoProjectDB");
        database.collection("videogallery").insertOne(video).then(()=>{
            console.log("New Video Added Successfully");
        })
        res.end();
    })
})
app.put("/modifyvideo/:id",function(req,res){
    var id=parseInt(req.params.id);
    var video={
        video_Id:parseInt(req.body.video_Id),
        video_Title:req.body.video_Title,
        video_Url:req.body.video_Url,
        video_Category:req.body.video_Category,
        video_Likes:parseInt(req.body.video_Likes),
        video_Dislikes:parseInt(req.body.video_Dislikes),
        video_Comments:req.body.video_Comments
    }
    mongoClient.connect(dataStr).then((clientObj)=>{
        var database=clientObj.db("videoProjectDB");
        database.collection("videogallery").updateOne({video_Id:id},{$set:video}).then(()=>{
            console.log("Video Details Modified Successfully");
        })
        res.end();
    })
})
app.delete("/deletevideo/:id",function(req,res){
    var id=parseInt((req.params.id));
    mongoClient.connect(dataStr).then((clientObj)=>{
        var database=clientObj.db("videoProjectDB");
        database.collection("videogallery").deleteOne({video_Id:id}).then(()=>{
            console.log("Video Deleted Successfully");
        })
        res.end();
    })
})
app.get("/videocategories",function(req,res){
    mongoClient.connect(dataStr).then((clientObj)=>{
        var database=clientObj.db("videoProjectDB");
        database.collection("videocategories").find({}).toArray().then((document)=>{
            res.send(document);
        })
    })
})
app.get("/video/:category",function(req,res){
    var category=req.params.category
    mongoClient.connect(dataStr).then((clientObj)=>{
        var database=clientObj.db("videoProjectDB");
        database.collection("videogallery").find({video_Category:category}).toArray().then((document)=>{
            res.send(document);
        })
    })
})
app.put("/videolikes/:id",function(req,res){
    var id=parseInt(req.params.id);
    var like={
        video_Likes:parseInt(req.body.video_Likes)
    }
    mongoClient.connect(dataStr).then((clientObj)=>{
        var database=clientObj.db("videoProjectDB");
        database.collection("videogallery").updateOne({video_Id:id},{$set:like}).then(()=>{
            console.log("Like Added Successfully");
        })
        res.end();
    })
})
app.put("/videodislikes/:id",function(req,res){
    var id=parseInt(req.params.id);
    var dislike={
        video_Dislikes:parseInt(req.body.video_Dislikes)
    }
    mongoClient.connect(dataStr).then((clientObj)=>{
        var database=clientObj.db("videoProjectDB");
        database.collection("videogallery").updateOne({video_Id:id},{$set:dislike}).then(()=>{
            console.log("Dislike Added Successfully");
        })
        res.end();
    })
})

// Reset Password API..
app.put("/resetpassword/:userid",function(req,res){
    var user=req.params.userid;
    console.log(user);
    var pass={
        user_Password:req.body.user_Password
    }
    console.log(pass);
    mongoClient.connect(dataStr).then((clientObj)=>{
        var database=clientObj.db("videoProjectDB");
        database.collection("tbluser").updateOne({user_Id:user},{$set:pass}).then(()=>{
            console.log("Password Reset Successfully");
        })
        res.end();
    })
})
app.listen(7700);
console.log("server Started:http://127.0.0.1:7700");