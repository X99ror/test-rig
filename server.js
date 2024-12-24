require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser")
const colors = require('colors');
const morgan = require('morgan');
const dbconnect = require('./config/dbconnect');
const memberRoutes = require('./routes/memberRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js')
const teamRoutes = require('./routes/teamRoutes.js')
const app = express();
const path = require('path')


app.use(cors({ origin: true }));

app.use(express.json());
app.use(cookieParser())
app.use(morgan('dev'));


dbconnect();


app.use('/api/v1/member', memberRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/events',eventRoutes);
app.use('/api/v1/teams',teamRoutes)



app.use(express.static(path.join(__dirname, "./client/build")))

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`.bgRed.white);
});
