var express = require('express');
var router = express.Router();
var Articles = require('../models/articles');

router.get('/', function(req, res, next) {
  res.render('articles/index', { article: article });
});

router.get('/view/:slug', function(req, res, next) {
  var slug = req.params.slug;
  
    Articles.findOne({'slug':slug}, function(err, article){
      console.log(article);
      if(err){
        res.render('error', { status:err});
      }
      res.render('articles/view', { article: article});
    });
    
});

router.get('/cms', function(req, res, next) {
  res.render('articles/cms', { title: 'CMS' });
});

module.exports = router;