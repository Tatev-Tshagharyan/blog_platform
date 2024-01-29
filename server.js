const http = require('http');

const mongoose = require('mongoose')
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();




const PORT = process.env.PORT || 8080
 const mongoUrl = process.env.DB_URL

const server = http.createServer(app);

async function mongoConnect () {
try {
    mongoose.connect(mongoUrl,{

    })
} catch (error) {
    console.log(error.message);
  }
}
  async function startServer() {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }) 
  } 
startServer();

