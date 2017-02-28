import models from '../models/index';
import { markdown } from '../helpers/markdown';

import  translate,{ getPage, getText }  from '../services/translate/index';
import {isUrl} from '../util';

const page = async (ctx, next) => {
  let url = 'https://nodejs.org/en/'
  console.log("---------http translate page------------")
  // console.log(ctx.request.body)
  console.log(ctx.query.u)
  if(isUrl(ctx.query.u)){
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
