// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

let controllers = require('./controllers');

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/ellismitchell/express-personal-api/README.md",
    baseUrl: "http:///tranquil-springs-25959.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/projects", description: "Index of all my projects"},
      {method: "POST", path: "/api/projects", description: "Create a new project"},
      {method: "GET", path: "/api/projects/:id", description: "Get one project with id"},
      {method: "DELETE", path: "/api/projects/:id", description: "Delete a project"},
      {method: "PUT", path: "/api/projects/:id", description: "Update a project"},
    ]
  })
});

app.get('/api/profile', function(req, res){
  res.json({
    name: "Ellis Mitchell",
    githubUsername: "ellismitchell",
    githubLink: "http://github.com/ellismitchell",
    personalSiteLink: "http://ellismitchell.github.io",
    currentCity: "San Francisco, CA",

  })
});

app.get('/api/projects', controllers.projects.index);
app.get('/api/projects/:id', controllers.projects.show);
app.post('/api/projects', controllers.projects.create);
app.delete('/api/projects/:id', controllers.projects.destroy);
app.put('/api/projects/:id', controllers.projects.update);

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
