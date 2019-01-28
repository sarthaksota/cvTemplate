const express= require('express');

const app=express();

const bodyParser=require('body-parser');

const urlencodedParser=bodyParser.urlencoded({extended:false});

const fs=require('fs');

const hbs=require('express-handlebars');

const fetch = require('node-fetch');
app.use(express.json()); //this is to enable the json parsing... we will read the request body while doing a post  request...req.body.something

//app.set('views',path.join(__dirname,'./views'));
app.set('view engine','hbs');
app.use('/public',express.static('public'));



/* getting data from json */

app.get('/',(req,res)=>{
    fetch('https://api.myjson.com/bins/18tjrs').
    then(result=>result.json()).
    then((data)=>{
        //console.log(data);
    res.render("main",{data});
    }).
    catch((err)=>{
        console.log(err);
    });
    
});

/* download cv */

app.get('/download', function(req, res){
    var file = __dirname + '/download.jpg';
    res.download(file); 
    });





/* logging user data */

app.post('/contact',urlencodedParser,function(req,res){
    console.log(req.body);
     //   let content= fs.readFileSync('info.json');
       // let oldData=JSON.parse(content);

        let newData={
                "name":req.body.name,
                "email":req.body.email,
                "phone":req.body.phone,
                "message":req.body.message
            };
        //oldData.push(newData);
        let newObject=JSON.stringify(newData);
        
        fs.appendFileSync('info.json',newObject);

    res.send("Thank-You your message has been sent.")
});











const port=process.env.PORT || 3000; //so if the former is set, port will take that value otherwise it will take 3000
app.listen(port, () => console.log(`listening on port ${port}...`));