import models from '../models/index';
import { markdown } from '../helpers/markdown';

import  translate,{ getPage }  from '../services/translate/index'

const page = async (ctx, next) => {
  let url = 'https://nodejs.org/en/'
  console.log("---------http translate page------------")
  let val = await getPage(url)
  //console.log(val,"----- out page -------")
  ctx.body=val

  return;

  const article = await models.Article.findById(ctx.params.id);
  if(article == null){
    ctx.redirect('/');
    return;
  }
  const author = await models.User.findById(article.userId);
  let canEdit = ctx.state.isUserSignIn && ctx.state.currentUser.id === author.id;
  const articleHtml = await markdown(article.content);
  const locals = {
    nav: 'article',
    title: article.title,
    description: article.description,
    article: article,
    articleHtml: articleHtml,
    canEdit: canEdit,
    author: author
  };
  await ctx.render('articles/show', locals);
};


export default {
  page
};
