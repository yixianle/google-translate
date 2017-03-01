import Koa from 'koa';
import views from 'koa-views';
import convert from 'koa-convert';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import methodOverride from 'koa-methodoverride';
import logger from 'koa-logger';

import config from '../config/config';
import router from './routes';
import middlewares from './middlewares';



const app = new Koa();

// console.log(config.secretKeyBase, '-------config.secretKeyBase------')
app.keys = [config.secretKeyBase];

// not serve static when deploy
if(config.serveStatic){
  app.use(convert(require('koa-static')(__dirname + '/../public')));
}


app.use(bodyParser());
app.use(methodOverride((req, _res) => {
  if (req.body && (typeof req.body === 'object') && ('_method' in req.body)) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(convert(json()));
app.use(convert(logger()));

//views with pug
app.use(views(__dirname + '/views', { extension: 'pug' }));

// catch error
// 临时注释
app.use(middlewares.catchError);


app.use(router.routes(), router.allowedMethods());

if (process.argv[2] && process.argv[2][0] == 'c') {
  const repl = require('repl');
  // global.models = models;
  repl.start({
    prompt: '> ',
    useGlobal: true
  }).on('exit', () => { process.exit(); });
}
else {
  app.listen(config.port);
}

export default app;
