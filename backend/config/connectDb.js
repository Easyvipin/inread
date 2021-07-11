const Mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const conn = await Mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`connected on ${conn.connection.host} `);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDb,
};
