import Router from 'koa-router';
import translate from '../controllers/translate';

const router = Router({
  prefix: '/translate'
});
router.get('/page', translate.page );
router.get('/api', translate.page);
router.post('/', translate.page );

// for require auto in index.js
module.exports = router;