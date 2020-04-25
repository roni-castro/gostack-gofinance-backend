import app from './app';
import databaseConnection from './database/index';

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});

databaseConnection()
  .then(_connection => {
    console.log('Connected to database');
  })
  .catch(error => console.log('Error connection to database', error));
