//import  translate,{ getPage, getText }  from '../services/translate/index';
import  { getPage, getText }  from 'translate-api';
import {isUrl} from '../util';

const page = async (ctx, next) => {
  let url = ctx.query.u || 'https://nodejs.org/en/'
  console.log("---------http translate page------------")
  // console.log(ctx.request.body)
  //console.log(url)
  if(isUrl(url)){
    let val = await getPage(url)
    //console.log(val,"----- out page -------")
    ctx.body=val
  }
  
};

const api = async (ctx, next) => {
  console.log("-----api-------")

  let text = ctx.request.body.text

  let val = await getText(text,{to: 'zh-CN'})
  ctx.body = val
}

module.exports = {
  page,
  api
};
