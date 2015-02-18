//environment ======================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var devPort = 8080;
var db = mongoose.connection;

// app config ======================================

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(methodOverride());

//db with models======================================
db.on('error', console.error);
db.once('open', function(){

  var Todo = mongoose.model('Todo', {
    text: String
  });

});

mongoose.connect('mongodb://localhost/test');
//routes======================================
  app.get('/todos', function(request, resolve){
    Todo.find(function(err, todos){
      if(err){
        resolve.send(err);
      }

      resolve.json(todos);
    });
  });

  app.post('/todos', function(request, resolve){
    Todo.create({
      text: request.body.text,
      done: false
    }, function(err, todo){
      if(err){
        resolve.send(err);
      }

      Todo.find(function(err, todos){
        if(err){
          resolve.send(err);
        }
        resolve.json(todos);
      });
    });
  });

  app.delete('todos/:todo_id', function(request, resolve){
    Todo.remove({
      _id : request.params.todo_id
    }, function(err, todo){

      if(err){
        resolve.send(err);
      }

      Todo.find(function(err, todos){
        if(err){
          resolve.send(err);
        }
        resolve.json(todos);
      });
    });
  });


//listen======================================
app.listen(devPort);
console.log("App listening on port "+ devPort );