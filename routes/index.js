'use strict';

//Add routes from other files
var collectionRoute  = require('./collection');
var databaseRoute    = require('./database');
var documentRoute    = require('./document');

var routes = function(config) {
  var exp = {};

  exp.addDatabase       = databaseRoute(config).addDatabase;
  exp.deleteDatabase    = databaseRoute(config).deleteDatabase;
  exp.viewDatabase      = databaseRoute(config).viewDatabase;

  exp.viewDatabases     = databaseRoute(config).viewDatabases;

  exp.addCollection     = collectionRoute(config).addCollection;
  exp.deleteCollection  = collectionRoute(config).deleteCollection;
  exp.exportColArray    = collectionRoute(config).exportColArray;
  exp.exportCollection  = collectionRoute(config).exportCollection;
  exp.renameCollection  = collectionRoute(config).renameCollection;
  exp.updateCollections = collectionRoute(config).updateCollections;
  exp.viewCollection    = collectionRoute(config).viewCollection;

  exp.getProperty       = documentRoute(config).getProperty;
  exp.addDocument       = documentRoute(config).addDocument;
  exp.checkValid        = documentRoute(config).checkValid;
  exp.deleteDocument    = documentRoute(config).deleteDocument;
  exp.updateDocument    = documentRoute(config).updateDocument;
  exp.viewDocument      = documentRoute(config).viewDocument;

  //Homepage route
  exp.index = function(req, res) {
    var ctx = {
      title: 'Mongo Express',
      info: false,
    };

    if (typeof req.adminDb === 'undefined') {
      return res.render('index');
    }

    req.adminDb.serverStatus(function(err, info) {
      if (err) {
        //TODO: handle error
        console.error(err);
      }

      ctx.info = info;

      res.render('index', ctx);
    });
  };

  return exp;
};

module.exports = routes;
