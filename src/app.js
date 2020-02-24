const path = require('path');
const express = require('express');
const hbs = require('hbs');

const util = require('./util');

const app = express();

//define paths for Express configurations
const publiDirectoryPath = path.join(__dirname,'..','public');
const viewsDirectoryPath = path.join(__dirname,'..','template','views');
const partialsDirectoryPath = path.join(__dirname,'..','template','partials');


//setup handle bars engine and view location
app.set('view engine','hbs');
app.set('views',viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

//setup static directory for images and css 
app.use(express.static(publiDirectoryPath));

app.get('',(req,res)=>{
  res.render('index',
  {title:'Weather',
   name:'Swapnil'});
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title : 'About',
    name:'Swapnil'
  });
});
app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help',
    text :'some helpful text',
    name:'Swapnil'
  })
});

app.get('/help/*',(req,res)=>{
  res.status(404).render('404',{
    title:'404',
    errorMessage:'help article not found',
    name:'Swapnil'
  });
});

app.get('/weather',(req,res)=>{
  const address = req.query.address;
  if(!address)
  {
    return res.send({error:'please provide the address'});

  }

  util.geocode(address,(error,{longitude,latitude,place_name}={})=>{
    if(error)
    {return res.send({error});}
    else{
      util.forecast(latitude,longitude,(error,data)=>{
        if(error)
        {return res.send({error});}

        res.send({latitude,longitude,place_name,data});
      })
    }

  })

  // res.send({
  //   forecast:'clear sky',
  //   location:'pune',
  //   address  });
});

app.get('/products',(req,res)=>{
  //console.log(req.query);
  if(req.query.search===undefined)
  {
  res.send({error:'please provide search term'});
    return;
  }
  res.send({
    products : []
  })
})

app.get('*',(req,res)=>{
  res.status(404).render('404',{
    title:'404',
    errorMessage:'page not found',
    name:'Swapnil'
  });
});

app.listen(3000,()=>{
  console.log('Server is up on port 3000');
});
