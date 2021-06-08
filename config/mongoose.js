//require the library
const mongoose = require('mongoose');
//connect to the database
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/codeial_development_db', {useNewUrlParser: true, useUnifiedTopology: true});
// acqire the connection (to check if it is successfull)
const db = mongoose.connection;
//error
db.on('error',console.error.bind(console,'error connection to db'));
// up and running then print the message
db.once('open',function(){
    console.log('Succesfully connected to the  database');
});
