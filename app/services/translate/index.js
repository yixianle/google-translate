import querystring from 'querystring'
import url from 'url'
import rp from 'request-promise'
import cheerio from 'cheerio'

import config from './config'

var userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/47.0.2526.70 Mobile/13B143 Safari/601.1.46'

// 翻译网页
const getPage = (targetUrl)=>{
  console.log(targetUrl,"---------- url ---------")
  let parameter ={
    sl: 'en',
    tl: 'zh-CN',
    js: 'y',
    prev: '_t',
    hl: 'zh-CN',
    ie: 'UTF-8',
    u: targetUrl,
    'edit-text': '',
    act: 'url' 
  }
  let firstUrl = config.translateUrl + querystring.stringify(parameter)
  
  return rp("http://127.0.0.1:8989/nodejsorg.html").then(()=>{
    return Promise.all([rp("http://127.0.0.1:8989/nodejsorg.html"), rp("http://127.0.0.1:8989/translate.html")])
  }).then((htmlString)=>{
    let [originHtml,translateHtml] = htmlString
    let $ = cheerio.load(translateHtml)
    let headLength,$head,$body;
    headLength = cheerio.load(originHtml)('head').children().length

    $head = $('head').children()
    $head.filter(index=> index<($head.length-headLength)).remove()
    $('iframe').first().remove()
    $('body').first().nextAll().remove()
    //$body = $('body').children()


    // console.log([11,22,33,445,55,66,77].indexOf(55),88)
    // console.log($("head").children().slice(8))
    return $.html()
  })


  return
  return rp(firstUrl).then(function (htmlString) {
    // console.log(iconv.decode(htmlString, 'utf8'),5566)
    let $ = cheerio.load(htmlString)
    let translateUrl = $('body iframe[name="c"]').attr('src')
    return rp(translateUrl)
    //console.log('User has %d repos', htmlString.length);
  }).then(function(htmlString){
    //console.log(arguments)
    //console.log(htmlString,1122)
    let $ = cheerio.load(htmlString)
    let redirectUrl = $('head meta[http-equiv="refresh"]').attr('content')
    redirectUrl = redirectUrl.match(/(URL)\=(https\:\/\/.*)/)[2]
    console.log(redirectUrl,3344)
    let options = {
      uri: redirectUrl,
      encoding: 'UTF-8',
      headers: {
          'User-Agent': userAgent
      }
    }
    return rp(options)
  }).then(function(htmlString){
    let $ = cheerio.load(htmlString)

    //console.log(htmlString,5566)
    return htmlString
  })
  
}


export default {
  getPage
};

