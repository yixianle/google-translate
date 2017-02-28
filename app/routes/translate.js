import Router from 'koa-router';
import { page, api } from '../controllers/translate';

const router = Router({
  prefix: '/translate'
});
router.get('/page', page );
router.post('/api', api );
router.get('/api', api);

// for require auto in index.js
module.exports = router;