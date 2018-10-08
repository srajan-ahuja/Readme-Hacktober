var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Crawler = require("crawler");


var a = JSON.parse(fs.readFileSync('rankdata.json', 'utf8'));
var links=[];
var flag = 0;
var RankPage = (html)=>{
    var text = html.replace(/(<([^>]+)>)/g, "");
    // text = text.replace(/&amp;/g, "");
    // console.log(text)
    fs.writeFileSync(`html.json`,text,function (){console.log("written")});
    var rank = 0;
    var arr = [];
    for(var i =0;i<a.length;i++)
    {
        // console.log(i);
        if(text.indexOf(a[i])!==-1)
        {
            // console.log("position os ",a[i]," is ",text.indexOf(a[i]));
            arr.push(a[i]);
            rank++;
        }
    }
    return {rank:rank,arr:arr};
}

function Spider(url,o){
    // var o = "hello";
    // if(flag)
    // {
    //     console.log("found");
    //     exit();
    //     return;
    //
    // }
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var d = [];
            var c = new Crawler({
                rateLimit: 2000, // `maxConnections` will be forced to 1
                callback: function(err, res, done){
                    $( "a" ).each(function() {
                        let l = $( this ).attr().href;
                        if(l&& (url.indexOf(o)!==-1)&&(links.findIndex((data)=>data===l)===-1))
                        { d.push({"url":l})
                          links.push(l);
                            var r = RankPage(html);
                            console.log("rank is ",r.rank);
                            console.log("array is ",r.arr);
                            if(r>15)
                            {
                                console.log("Found the page")
                                console.log(url);
                                flag=1
                                exit();
                                // exit();
                            }
                        }
                    });
                    // console.log(o);
                    console.log(d);
                    for(var i=0;i<d.length;i++)
                    {   console.log("calling spider with url");
                            console.log(d[i].url);
                            Spider(d[i].url,o)
                    }
                    // var k = JSON.parse(fs.readFileSync('Links.json', 'utf8'));
                    // k.push(d);
                    // fs.writeFileSync(`Links.json`,JSON.stringify(k),function (){console.log("written")});
                    // for(var i=0;i<d.length;i++)
                    //     c.queue(d[i].url);
                    done();
                }
            });
            c.queue(url);

        }
    })
}
function ParentSpider(url){
    // var o = "hello"
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var d = [];
            var c = new Crawler({
                rateLimit: 2000, // `maxConnections` will be forced to 1
                callback: function(err, res, done){
                    // links.push(url);
                    var f = url;
                    var q = f.indexOf("https");
                    if(q>=0)
                        f = f.slice(12,d.length);
                    else
                        f = f.slice(11,d.length);
                    $( "a" ).each(function() {
                        let l = $( this ).attr().href;
                        // &&(links.find((data)=>data===l)===-1)
                        if(l && (url.indexOf(f)!==-1))
                        {d.push({"url":l})
                            var r = RankPage(html);
                            console.log("rank 1 is ",r.rank);
                            if(r>15)
                            {
                                console.log("Found the page")
                                console.log(url);

                            }
                        }
                    });
                    // console.log(d);


                    // console.log(o);
                    // var k = JSON.parse(fs.readFileSync('Links.json', 'utf8'));
                    // k.push(d);
                    // fs.writeFileSync(`Links.json`,JSON.stringify(k),function (){console.log("written")});
                    for(var i=0;i<d.length;i++)
                    {   console.log("calling spider with url");
                                console.log(d[i].url);
                                Spider(d[i].url,f);
                    }
                    done();
                }
            });

            c.queue(url);
        }
    })
}

function go(url){

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var d;
            var c = new Crawler({
                rateLimit: 2000, // `maxConnections` will be forced to 1
                callback: function(err, res, done){
                    // d = $('.r').children()[0].attribs.href;
                    // d = d.slice(7,d.length);
                    // var k = d.indexOf("/&sa")
                    // d = d.slice(0,k);
                    //
                    // var s ={"name":name,"url":d};
                    // console.log(s);
                    // var k = JSON.parse(fs.readFileSync('data.json', 'utf8'));
                    // k.push(s);
                    //     fs.writeFileSync(`data.json`,JSON.stringify(k),function (){console.log("written")});
                    //     ParentSpider(d);
                    //     // fs.appendFileSync(`data.json`,",",function (){console.log("written")})
                    console.log(html);
                    done();
                }
            });

            c.queue(url);
        }
    })
}

//MAIN CODE START FROM HERE

// var obj = JSON.parse(fs.readFileSync('colleges.json', 'utf8'));
// var t = []
// //READ SEARCH DATA FROM FILE
// fs.writeFile(`data.json`,JSON.stringify(t),function (){console.log("written")});
// fs.writeFile(`Links.json`,JSON.stringify(t),function (){console.log("written")});
// // yo("https://explorecourses.stanford.edu/");
// //CRAWL GOOGLE FOR WEBSITE LINKS OF THAT DATA
// for (var i in obj)
// {
//     console.log(obj[i])
//     var name = obj[i]
//     var url = `https://www.google.co.in/search?source=hp&ei=wBGYW-v2BMjrvgTy06vgBA&q=${name}`;
var url = `https://www.linkedin.com/in/tarun-trehan/`;
    go(url);
// }
// ,
// "Massachusetts Institute of Technology",
//     "Harvard University",
//     "Carnegie Mellon University",
//     "University of California, Berkeley (UCB)",
//     "Princeton University",
//     "University of California, Los Angeles (UCLA)",
//     "Georgia Institute of Technology (Georgia Tech)",
//     "Cornell University",
//     "California Institute of Technology (Caltech)",
//     " University of Washington"
