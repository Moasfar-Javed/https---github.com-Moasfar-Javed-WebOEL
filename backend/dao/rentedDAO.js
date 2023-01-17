import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let rented;

export default class RentedDAO {
  static async injectDB(conn) {
    if (rented) {
      return;
    }
    try {
      rented = await conn.db(process.env.MONGO_NS).collection("Rented");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in employeesDAO: ${e}`
      );
    }
  }

  static async getrented({ filters = null } = {}) {
    let query;

    let cursor;

    try {
      cursor = await rented.find();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { rentedList: [], totalNumrented: 0 };
    }

    try {
      const rentedList = await cursor.toArray();
      const totalNumrented = await rented.countDocuments(query);

      return { rentedList, totalNumrented };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { rentedList: [], totalNumrented: 0 };
    }
  }


static async getRentedID(email, password) {
    let cursor;

    try {
      cursor = await rented.find({ email: email, password: password });
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
      const rentedDoc = {
        name: name,
        email: email,
        password: password,
        isdeleted: 0
      };
      return await rented.insertOne(rentedDoc);
    } catch (e) {
      console.error(`Unable to add employee: ${e}`);
      return { Error: e };
    }
  }

  static async updateUser(
    name
  ) {
    try {
      const updateResponse = await rented.updateOne(
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