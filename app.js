var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose');

// APP CONFIG
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
//mongoose.connect('mongodb://localhost/notes_app');
mongoose.connect('mongodb://mike:incubus2180@ds021663.mlab.com:21663/supernotes');
var noteSchema = new mongoose.Schema({
   question: String,
   answer: String
});
var Note = mongoose.model('noteModel', noteSchema);

// SHOW ALL ROUTE
app.get('/', function(req, res) {
    Note.find({}, function(err, data) {
       if (err) {
           console.log(err);
       } else {
           res.render('body', { notesData: data});
       }
    });
});

// CREATE ROUTE
app.post('/save', function(req, res) {
    var question = req.body.question,
        answer = req.body.answer;

    Note.create({
      question: question,
      answer: answer
    }, function(err, note) {
       if (err) {
           console.log(err);
       } else {
           console.log('Saved ' + note);
           res.redirect('/');
       }
    });
});

// EDIT ROUTE
app.get('/edit/:id', function(req, res) {
    var NoteId = req.params.id;
    Note.findById(NoteId, function(err, noteData) {
       if (err) {
           console.log(err);
       } else {
           res.render('edit', { edit: noteData, id: NoteId });
       }
    });
});

// UPDATE ROUTE
app.put('/:id', function(req, res) {
    var question = req.body.question,
        answer = req.body.answer,
        id = req.params.id;
    
    Note.findByIdAndUpdate(id, { question: question, answer: answer }, function(err, data) {
       if (err) {
           console.log(err);
       } else {
           console.log('Updated :' + data);
           res.redirect('/');
       }
    });
});

// DELETE ROUTE
app.get('/delete/:id', function(req, res) {
    var question = req.body.question,
        answer = req.body.answer,
        id = req.params.id;
     
   Note.findByIdAndRemove(id, { question: question, answer: answer }, function(err, data) {
       if (err) {
           console.log(err);
       } else {
           console.log('Deleted :' + data);
           res.redirect('/');
       }
    }); 
});


app.listen(process.env.PORT, process.env.IP, function() {
   console.log('Supernotes server started..'); 
});