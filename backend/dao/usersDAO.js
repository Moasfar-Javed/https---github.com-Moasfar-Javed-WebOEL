import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let users;

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.MONGO_NS).collection("Users");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in employeesDAO: ${e}`
      );
    }
  }

  static async getUsers({ filters = null } = {}) {
    let query;

    let cursor;

    try {
      cursor = await users.find();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { usersList: [], totalNumusers: 0 };
    }

    try {
      const usersList = await cursor.toArray();
      const totalNumusers = await users.countDocuments(query);

      return { usersList, totalNumusers };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { usersList: [], totalNumusers: 0 };
    }
  }


static async getUserID(email, password) {
    let cursor;

    try {
      cursor = await users.find({ email: email, password: password });
      //.project(projection)

      const details = await cursor.toArray();
      return { details };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { details: [] };
    }
  }

  static async addUser(
    name,
    email,
    password
  ) {
    try {
      const usersDoc = {
        name: name,
        email: email,
        password: password,
        isdeleted: 0
      };
      return await users.insertOne(usersDoc);
    } catch (e) {
      console.error(`Unable to add employee: ${e}`);
      return { Error: e };
    }
  }

  static async updateUser(
    name
  ) {
    try {
      const updateResponse = await users.updateOne(
        { name: name },
        {
          $set: {
            isdeleted: 1,
          },
        }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to delete employee: ${e}`);
      return { Error: e };
    }
  }
}