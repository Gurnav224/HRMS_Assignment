const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const databaseConnection = require('./db/database');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const app = express();

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/', (req,res) => {
 res.send('<h1>HR Management server is running</h1>')
})

app.use('/auth',authRouter);
app.use('/hr',userRouter)

const PORT = process.env.PORT || 3000;

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'route not found' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'internal server error' });
});



databaseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('application crash', error);
    process.exit(1);
  });
