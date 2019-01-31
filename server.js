const express= require('express');

const app=express();

const bodyParser=require('body-parser');

const urlencodedParser=bodyParser.urlencoded({extended:true});

const fs=require('fs');

const hbs=require('express-handlebars');

const fetch = require('node-fetch');
app.use(express.json()); //this is to enable the json parsing... we will read the request body while doing a post  request...req.body.something

//app.set('views',path.join(__dirname,'./views'));
app.set('view engine','hbs');
app.use('/public',express.static('public'));


/* download cv */

app.get('/download', function(req, res){
    var file = __dirname + '/download.jpg';
    res.download(file); 
    });


    /***api call */

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

    /***from submit */

    app.post('/resume', function(req, res) {
    
            let form = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                message: req.body.message
           }
           console.log(form);
           fs.appendFile('info.txt', JSON.stringify(form), function(err) {
               if (err) throw err;
               //console.log('Saved!');
           });
           res.send('your response have been submitted');
        });



const port=process.env.PORT || 3000; //so if the former is set, port will take that value otherwise it will take 3000
app.listen(port, () => console.log(`listening on port ${port}...`));