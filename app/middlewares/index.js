
// 异常监听处理
async function catchError(ctx, next) {
  try {
    await next();
    if (ctx.status === 404) ctx.throw(404);
  } catch (err) {
    let status = err.status || 500;
    if (status < 0) {
      status = 500;
    }
    ctx.status = status;
    
    if (status === 500) {
      console.log('server error', err, ctx);
      ctx.body = {
        error: err
      }
    }else{
      ctx.redirect('/404.html')
    }
  }
}


export default {
  catchError
  //addHelper
};
