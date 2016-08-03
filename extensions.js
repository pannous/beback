// <script src="extensions.js" type="text/javascript" charset="utf-8"></script>
function extension(url='http://pannous.net/extensions.js'){var script = document.createElement('script');script.src = url;document.head.appendChild(script);};//extension()
extensions_version="1.2.4"
// try{require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"my-module":[function(require,module,exports){},{}]},{},[]);}catch(x){}
// try{require=(function e(t,n,r){})}catch(x){console.log(x);}
// request('http://www.google.com'
// rsync --update -auz extensions.js pannous.net:/public/
// document.head.innerHTML+="<script src='http://pannous.net/extensions.js'></script>";
// all_extensions=require('/me/dev/script/javascript/extensions.js')
// all_extensions()

// import('/me/dev/script/javascript/extensions.js')
// .load /me/dev/script/javascript/extensions.js
// delete require.cache['/me/dev/script/javascript/extensions.js'] // DOESNT! 

// It loads the file in line by line just as if you had typed it in the REPL. Unlike require this pollutes the REPL history with the commands you loaded. However, it has the advantage of being repeatable because it is not cached like require.

// import will be supported in v8+6 / node.js 7
// document.head.innerHTML+="<script src='http://pannous.net/extensions.js'></script>";
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];a[i - 1] = a[j]; a[j] = x;
    } return a;
}
// loadScript("http://pannous.net/extensions.js");
fullscreen=x=>document.getElementsByTagName('html')[0].mozRequestFullScreen()
// setTimeout(callback, delay[, arg][, ...])
// setInterval(callback, delay[, arg][, ...])#Schedules repeated execution of callback every delay milliseconds. Returns a intervalObject for possible
print=function(x){console.log(x);return x};
dir=function(x){return print(Object.getOwnPropertyNames(x))}
keys=function(x){return Object.keys(x)}
len=function(x){return x.length}
rand=random=function(x){return x?int(Math.random()*x):Math.random()}
hasChars=x=>len(x.replace(/[^a-zA-Z]/g,""))>0
isNumber=n=>!isNaN(parseFloat(n)) && isFinite(n);// parseInt() "SHOULD NOT BE USED".
nil=null

// puts=function(x){console.log(x);return x};
// puts=function(x){console.log("NOO"+x);return "OK"};
puts_hack=function(x){alert("NOO"+x);return "OK"};
int     = x=>parseInt(x)
float   = x=>parseFloat(x)
str     = x=>x.toString()
string  = x=>x.toString()
help    = x=>{
  try{}catch(e){};
  p("HOW TO HELP IN JS?");
  p(x);
  p(Object.getOwnPropertyDescriptor(x))
  p(Object.getKeys(x))
  p(dir(x))
}


download=function(url,callback){
  if(!callback)print("please give callback as 2nd param!")
    http.get(url).on('response', response=> {
      var body = '';
      response.on('data', chunk=>{body += chunk});
      response.on('end', x=>callback(body));
    });
}
fetch=download
// download('http://google.com',log)
// curl!=download


Object_Extensions={
  // in(xs){return xs.indexOf(this)>=0},
  // is_a(x){return this instanceof x},
  keys(){return Object.keys(this)},
  methods(){return Object.getOwnPropertyNames(this)},
  // select(){return Object.keys(this)}
}
function removeXfromArrayXS(x,xs){index =xs.indexOf(x);if (index > -1) xs.splice(index, 1);return xs} // selfmodifying! 
Array.prototype.remove=function(x){i=this.indexOf(x);if(i>-1)this.splice(i, 1);return this}// THIS NOT AVAILABLE FOR LAMDA!
Array_Extensions={
  g(x){return this.filter(a=>a==x||(""+a).match(x))},
  grep(x){return this.filter(a=>a==x||(""+a).match(x))},
  matches(x){all= this.filter(a=>a==x||(""+a).match(x)||x.match(""+a));return len(all)>0?all:false},
  match(x){all= this.filter(a=>a==x||(""+a).match(x)||x.match(""+a));return len(all)>0},
  has(x){return this.indexOf(x)>=0},
  removex(x){i =this.indexOf(x);if(i>-1)this.splice(i, 1);return this}, // selfmodifying! delete array[index];
  append(x){return this.concat(x)},
  strip(){return this.filter(x=>x.length>0)},
  sub(x,y){echo('use slice');return this.slice(x,y)},
  merge(x){return this.concat(x)},
  each(x){return this.forEach(x)},
  clone(){return this.slice()},
  deduplicate(){return this.filter((item, pos)=>this.indexOf(item) == pos)},
  shuffle(){return shuffle(this)},
  // join(x){if(x instanceof String){return old join }else return this.concat(x)},
  contains(x){return this.indexOf(x)>=0},
  last(){return this[this.length-1]},
  random(){return this[int(Math.random()*this.length)]},
  first(){return this[0]},// << shorter!
  // select(x){return this.filter(x)}
  // arr=[1,2,3,4];arr.filter(v => v % 2 == 0) // [6, 0, 18] // select / grep
}

String_Extensions={// StringExtensions
  in(xs){return xs.indexOf(this)>=0},
  grep(x){return this.split("\n").grep(x)},
  g(x){return this.split("\n").grep(x)},
  words(){return this.split(" ")},
  lines(){return this.split("\n")},
  // last(){return this.split("\n ").last()},
  // first(){return this.split("\n ")[0]},
  has(x){return this.match(x)},
  contains(x){return this.match(x)},
  template(){return eval('`'+this+'`')},
  strip(){return this.trim()},
  toUpper(){return this.toUpperCase()},
  toLower(){return this.toLowerCase()},
  replaceAll(a,b){return this.replace(new RegExp(a,"gi"),b)},
  hasChars(){return len(this.replace(/[^a-zA-Z]/g,""))>0}
}
HTMLCollection_Extensions={
  filter(l){return this.to_a().filter(l);},
  to_a(){return  Array.prototype.slice.call(this);}
}

var all=all_extensions=function(){
// Object.assign(Object.prototype,MyObject) // merge into!
    Object.assign(Object.prototype,Object_Extensions) // merge into!
    Object.assign(Array.prototype,Array_Extensions) 
    Object.assign(String.prototype,String_Extensions)
    try{       Object.assign(HTMLCollection.prototype,HTMLCollection_Extensions)    }catch(exc){}

    // use Properties carefully otherwise they can get very annoying:
    // IMPORTANT: configurable:true FOR RELOADS!!
    // Object.defineProperty(Array.prototype,'last', {get(){return this[this.length-1]},configurable:true});
    Object.defineProperty(Array.prototype,'len', { get(){return this.length},configurable:true /* READ-ONLY*/ });
    Object.defineProperty(String.prototype,'len', { get(){return this.length},configurable:true /* READ-ONLY*/ });
    Object.defineProperty(String.prototype,'ls', { get(){return this.split("\n")},configurable:true });
    Object.defineProperty(String.prototype,'up', { get(){return this.toUpperCase()},configurable:true });
    Object.defineProperty(String.prototype,'down', { get(){return this.toLowerCase()},configurable:true });
    // Object.defineProperty(Object.prototype,'kind', { get(){p('use typeof ');return typeof(this)},configurable:true });
    // Object.defineProperty(Object.prototype,'kind', { get(){p('use typeof ');return typeof this});
    // Object.defineProperty(Object.prototype,'class', { get(){p('use typeof ');return typeof this});
    Object.defineProperty(Object.prototype,'to_s', { get(){p('use str()');return this.toString()},configurable:true});
    Object.defineProperty(Object.prototype,'to_i', { get(){p('use int()');return parseInt(this.toString())},configurable:true});// 
    // Object.defineProperty(Object.prototype,'type', {
    //     get(){p('use typeof ');return typeof(this)},
    //     set(x){p("NOOO use typeof "+x)},
    //     configurable:true 
    //    });
    console.log(`extensions ${extensions_version} loaded`)
    return this
}
try{
  module.exports = all  // node.js
}catch(exc){
  all_extensions()  // browser
}

function loadScript(url, callback)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}

// export const sqrt = Math.sqrt;
// export function square(x) {
//     return x * x;
// }
// export function diag(x, y) {
//     return sqrt(square(x) + square(y));
// }
    
// // ------ main.js ------
// import { square, diag } from 'lib';
// console.log(square(11)); // 121
// console.log(diag(4, 3)); // 5


function ForwardingHandler(obj) {
  this.target = obj;
}
ForwardingHandler.prototype = {
  has: function(name) { return name in this.target; },
  get: function(rcvr,name) { return this.target[name]; },
  set: function(rcvr,name,val) { this.target[name]=val;return true; },
  delete: function(name) { return delete this.target[name]; },
  enumerate: function() {
    var props = [];
    for (name in this.target) { props.push(name); };
    return props;
  },
  iterate: function() {
    var props = this.enumerate(), i = 0;
    return {next: function() { // nice, on the fly objects!!
        if (i === props.length) throw StopIteration;
        return props[i++];
      }}},
  keys: function() { return Object.keys(this.target); },
};
// Proxy.wrap = (obj) => Proxy.create(new ForwardingHandler(obj),Object.getPrototypeOf(obj));
// x

try{
// SERVER STUFF, NOT BROWSER STUFF

os=require('os')
getIp=function getIp () {
  var interfaces = os.networkInterfaces();
  for (var k in interfaces) 
      for (var k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family === 'IPv4' && !address.internal) 
            return (address.address);
      }
}

// function* hihi(url){
//     var body = '';
//     http.get(url).on('response', response=> {
//       response.on('data', chunk=> body += chunk);
//       response.on('end', function*(){yield body})
//     });
//   }

// function download2(url){
//   return hihi(url).next()
// }

function downloadFile(url,dest){
  var http = require('http');
  var fs = require('fs');
  var file = fs.createWriteStream(dest);
  var request = http.get(url, response=> response.pipe(file)); 
}
curl = require('request');
sleeps=require('sleep').sleep // Seconds; blocking there is no way around this !! setTimeout just ADDS to cycles!
sleep=x=>require('sleep').usleep(x*1000) //  ms blocking there is no way around this !! setTimeout just ADDS to cycles!
// execSync=require('execSync')
var child_process=require('child_process') 
spawn = require('child_process').spawn;
run=execAsync=child_process.exec
exec=execSync=sys=system=x=>child_process.execSync(x).toString().split('\n')
// conflict sys{ ls: [Function],
// print=process.stdout.write
fs=require("fs")
r=read=load=cat= path=>fs.readFileSync(path).toString()
w=write=dump= (x,y)=>fs.writeFileSync(x,y)
ap=append=(file,text)=>fs.appendFileSync(file, text+"\n") // , err=>{p(err)}
rl=read_lines=read_list=path=>fs.readFileSync(path).toString().split('\n')
rb=read_buffer=read_binary=open_rb= path=>fs.readFileSync(path)
read_csv=load_csv=x=>read_lines(x).map(x=>x.split("\t"))
}catch(ex){
  console.log(ex);// ex
  console.log("file system extensions only supported on client");
  r=extension;
  rr=reload=()=>{location.reload();extension()}
}


// console.log('extensions.js loaded');

function range(start, stop, step=1){
  if(!stop){
    stop=start;
    start=1;
  }
  var a=[start], b=start;
  while(b<stop){b+=step;a.push(b)}
  return a;
};
