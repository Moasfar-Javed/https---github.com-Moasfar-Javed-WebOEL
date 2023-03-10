import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import UsersDAO from "./dao/usersDAO.js";
import PropertiesDAO from "./dao/propertiesDAO.js"

dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.MONGO_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await UsersDAO.injectDB(client);
    await PropertiesDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
