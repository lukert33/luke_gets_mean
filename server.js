//environment ======================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var devPort = 8080;
mongoose.connect('mongodb://127.0.0.1/tododb');

// app config ======================================
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(methodOverride());

//models======================================
var Todo = mongoose.model('Todo', {
  text: String
});

//routes======================================
  app.get('/api/todos', function(request, resolve){
    Todo.find(function(err, todos){
      if(err){
        resolve.send(err);
      }

      resolve.json(todos);
    });
  });

  app.post('/api/todos', function(request, resolve){
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

  app.delete('/api/todos/:todo_id', function(request, resolve){
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

app.get('*', function(req, res){
  res.sendfile('/public/index.html');
});
//listen======================================
app.listen(port);
console.log("App listening on port "+ port );