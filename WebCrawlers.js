/**
 * Created by gujiacheng on 2016/12/23.
 */
// const https = require("http");
const https = require("https");
const fs = require("fs");
const $ = require("cheerio");


var url='https://www.doutula.com/photo/list/?page=';

function get(url){
  return new Promise(function (resolve, reject) {
	  https.get(url, function(res) {
		  let data ='';
		  res.on('data', function(part) {
			  data += part;
		  });
		  res.on('end',function() {
			  // console.log(html);
			  resolve(data)
			  // fs.writeFile('./resource/1.html',html)
		  });
	  }).on('error', function(err) {
		  console.log('geterror' + err);
		  reject(err)
	  });
  })
}


// var start = async function () {
// 	// 在这里使用起来就像同步代码那样直观
// 	console.log('start');
// 	await sleep(3000);
// 	console.log('end');
// };

const getPage = async function (pageNum){
	const html = await get(url+pageNum);
	return Object.values($('.page-content .col-xs-4', html)).map(a=>a.attribs && a.attribs.href).filter(url=>!!url)
	
	// console.log(html)
}

const getPhotos = async function (pageUrl){
	const detailHtml = await get(pageUrl)
	console.log(Object.values($('img', html)));
	return
	const imgsUrls = Object.values($('img', html))
	// console.log(html)
}

// const pageCount = 5;
// for(let i=2;i<=pageCount;i++){
// 	const pageUrls = getPage(i);
// 	console.log(pageUrls)
// 	// pageUrls
// }

const go = async function(){
	const pageUrls = await getPage(6)
	for(let url of pageUrls){
		const html = await get(url);
		console.log(html.type)
		const photoSrcs = Object.values($("img", html)).map(img=>img.attribs && img.attribs.src).filter(url=>!!url)
		// const photoSrcs = Object.values($("img", html)).map(img=>img.attribs);
		console.log(photoSrcs)
		
		for(let src of photoSrcs){
			if(src.indexOf("//") === 0){
				src.replace("//", "https://");
			}
			console.log(src)
			
			const photoData = await get(src);
			console.log(photoData)
			// fs.writeFile(`./resource/${+new Date()+Math.random}.html`,html)
			
		}
	}
}
go()
// var gg =
// console.log(gg)
// get(url+2);