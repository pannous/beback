#!/usr/bin/env nodemon
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var db = require('./db');
var db = require('./extensions.js');
var express = require('express');
var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport")
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var storage = require('node-persist');
var app = express();
const tokens={}

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true })); // to support URL-encoded bodies
app.use(favicon("public/fav.icon"))
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var conf = require('./conf')
port=80
app.set('view engine', 'ejs');
// app.set('view engine', 'html');
app.use(require('serve-static')(__dirname+'./public'));
app.use(require('cookie-parser')());
// app.use(app.router);
// app.use(require('express-session')({ secret: 'miau', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// var transporter = nodemailer.createTransport({
//     service: 'mandrill',
//         auth: {
//             user: 'info@pannous.com',
//             pass: 'nDxB22mYq9vk4b!'
//     }
// });
var transporter = nodemailer.createTransport(smtpTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secureConnection:true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
}));

// confirm_plain=(when)=>`Hello 🐴, 
// 	You created a watch guard at BeBack.com. 
// 	Please confirm that it was you and that the details are correct: ${when}
// 	If it wasn\'t you please ignore this email or complain.'`

panic_html=(params)=>`Hey,<p/> 
	${params.email} got into some trouble.<p/> 
	His alert message was:<p/> 
	${params.message}<p/>
	I should be back at ${params.day} ${params.hour}<p/>
	Please try to get in touch with him.<p/> 
	c/o of <a href="http://BeBack.at">BeBack.at</a> watch guard.<p/>
`
allclear_html=(params)=>`Hello 🐴,<p/> 
	${params.email} just wanted to let you know that he arrived safely.<p/> 
	Cheers, c/o of <a href="http://BeBack.at">BeBack.at</a> watch guard.<p/>
	<small>If you don't care, please ignore this email or <a>opt-out</a>.</small>
`

confirm_html=(params)=>`Hello 🐴,<p/> 
	Please <a href="http://BeBack.at/confirm/${params.token}">confirm</a> that you created a watch guard, and that the details are correct:<p/>
	${params.message}<p/>
	I should be back at ${params.day} ${params.hour}<p/>
	If not, contact ${params.contacts}<p/>
	Cheers, your guardian <a href="http://BeBack.at">BeBack.at</a>.<p/> 
	<a href="http://BeBack.at/checkin/${params.token}"><img src="http://files.pannous.net/safe.jpg" alt="SAFE!"/></a>
	<a href="http://BeBack.at/panic/${params.token}"><img src="http://files.pannous.net/panic.png" alt="PANIC!"/></a><p/> 
	<small>If it wasn\'t you please ignore this email or <a>report</a>.</small>
`
confirm_plain=confirm_html
var mailOptions = {from: '"BeBack 👥" <beback@pannous.com>'};

function sendAllClear(params){
	mailOptions.to=params.contacts
	mailOptions.from=params.email
    mailOptions.subject='I am safe ✔'
	mailOptions.text=allclear_html(params)
	mailOptions.html=allclear_html(params)
	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){return console.log(error);}
	    console.log('Message sent: ' + info.response);
	});
}

function sendPanic(params){
	mailOptions.to=params.contacts
	mailOptions.text=panic_html(params)
	mailOptions.html=panic_html(params)
    mailOptions.subject=params.name +' got into some trouble.'
	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){return console.log(error);}
	    console.log('Message sent: ' + info.response);
	});
}

function sendConfirmation(params){
	console.log(params)
	params.hour=params.hour||"6pm"
	when=params.day+" "+params.hour
	mailOptions.to=params.email
	mailOptions.text=confirm_html(params)
	mailOptions.html=confirm_html(params)
    mailOptions.subject='Confirm your BeBack watch guard ✔', // Subject line
	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){return console.log(error);}
	    console.log('Message sent: ' + info.response);
	});
}

function getParams(req,res){
	token=req.params.token||req.headers.cookie
	params=tokens[token]||storage.getItem(token);
	console.log(params);
	if(!params)return res.render('error')
	return params
}

function saveParams(token, params){
    storage.setItem(token, params);
	tokens[token]=params
}

app.get('/again/:token',(req,res)=>{
	sendConfirmation(getParams(req,res))
	res.render('ok')
})

app.get('/panic/:token',(req,res)=>{// /:email
	params=getParams(req,res)
	res.render('panic')
	if(!params.panic){
		params.panic=true
		saveParams(params.token, params)
		sendPanic(params)
	}
})

app.get('/checkin/:token',(req,res)=>{///:email
	params=getParams(req,res)
	res.render('checkin')
	if(!params.safe){
		params.safe=true
		saveParams(params.token, params)
		sendAllClear(params)
	}
})

app.get('/confirm/:token',(req,res)=>{// /:email
	params=getParams(req)
	res.render('confirmed')
})

app.post('/submit',(req,res)=>{
	params=req.body||{error:"NO DATA"}
	params.token=params.token+"|"+params.email
	params.name=params.name||params.email.replace(/\@.*/,"")
	saveParams(params.token, params)	
	sendConfirmation(params)
	res.render('ok')
})

app.get('/',(req,res)=>{
	token=random()
	res.cookie('token', token, { maxAge: 900000, httpOnly: false });
	res.header("Access-Control-Allow-Origin", "*");
	res.render('index')}
)

app.get('/please',(req,res)=>{
	token=random()
	res.cookie('token', token, { maxAge: 900000, httpOnly: false });
	res.render('please')}
)

app.listen(port, function () {
	// setup();
	storage.initSync();
  	console.log('app listening on http://localhost:'+port);
});  

// Create an HTTPS service identical to the HTTP service.
// var privateKey = fs.readFileSync('cert/key.pem').toString();
// var certificate = fs.readFileSync('cert/certificate.pem').toString();  
// express.createServer({key: privateKey, cert: certificate},app).listen(443); // https
