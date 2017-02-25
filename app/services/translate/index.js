import queryString from 'querystring'
import url from 'url'
import rp from 'request-promise'
import cheerio from 'cheerio'

import {translateGoogle} from './config'

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
  let firstUrl = translateGoogle + queryString.stringify(parameter)
  
  /*return rp("http://127.0.0.1:8989/nodejsorg.html").then(()=>{
    return Promise.all([rp("http://127.0.0.1:8989/nodejsorg.html"), rp("http://127.0.0.1:8989/translate.html")])
  }).then((htmlString)=>{
    let [originHtml,translateHtml] = htmlString
    
  })*/

  console.log(firstUrl,"--- begin ----")
  return rp(firstUrl).then(function (htmlString) {
    console.log(firstUrl,"--- end ----")
    let $ = cheerio.load(htmlString)
    let translateUrl = $('body iframe[name="c"]').attr('src')
    console.log(translateUrl,"--- begin ----")
    return rp(translateUrl)
  }).then(function(htmlString){
    let $ = cheerio.load(htmlString)
    let redirectUrl = $('head meta[http-equiv="refresh"]').attr('content')
    redirectUrl = redirectUrl.match(/(URL)\=(https\:\/\/.*)/)[2]
    // console.log(redirectUrl,3344)
    let options = {
      uri: redirectUrl,
      encoding: 'UTF-8',
      headers: {
          'User-Agent': userAgent
      }
    }
    console.log("---all begin ----")
    return Promise.all([rp(targetUrl), rp(options)])
    //return rp(options)
  }).then(function(htmlStrings){
    console.log("---all end ----")
    return removeTranslateMark(htmlStrings)
    //console.log(htmlString,5566)
    //return htmlString
  })
  
}

// 移除翻译添加的元素
const removeTranslateMark = ([originHtml,translateHtml]) => {
  let $ = cheerio.load(translateHtml)
  let headLength,$head,$body;
  headLength = cheerio.load(originHtml)('head').children().length
  //console.log(targetUrl,889988)
  $head = $('head').children()
  $head.filter((index,item)=> {
    return index<($head.length-headLength) && item.tagName!=="base" && item.tagName!=="BASE"
  }).remove()
  $('iframe').first().remove()
  $('body').first().nextAll().remove()

  let $notranslate = $('body span.notranslate')
  $notranslate.children('a').each(function(index,item){
    let $item = $(item)
    let href = $item.attr("href")
    href = href && queryString.parse(url.parse(href).query).u
    $item.attr("href",href)
  })
  $notranslate.children('span.google-src-text').remove()
  $notranslate.removeAttr('onmouseover').removeAttr("onmouseout").removeClass("notranslate")
  
  return $.html()
}

module.exports = {
  getPage
};

