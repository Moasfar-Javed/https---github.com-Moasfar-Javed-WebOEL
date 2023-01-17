import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let properties;

export default class UsersDAO {
  static async injectDB(conn) {
    if (properties) {
      return;
    }
    try {
        properties = await conn.db(process.env.MONGO_NS).collection("Properties");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in employeesDAO: ${e}`
      );
    }
  }

  static async getProperties({ filters = null } = {}) {
    let query;

    let cursor;

    try {
      cursor = await properties.find({isrented: 0});
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { propertiesList: [], totalNumproperties: 0 };
    }

    try {
      const propertiesList = await cursor.toArray();
      const totalNumproperties = await properties.countDocuments(query);

      return { propertiesList, totalNumproperties };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { propertiesList: [], totalNumproperties: 0 };
    }
  }


static async getPropertyID(id) {
    let cursor;

    try {
      cursor = await properties.find({ _id: ObjectId(id) });
      //.project(projection)

      const details = await cursor.toArray();
      return { details };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { details: [] };
    }
  }

  static async addProperties(
    name,
    description,
    owner_id
  ) {
    try {
      const usersDoc = {
        name: name,
        description: description,
        owner_id: ObjectId(owner_id),
        isrented: 0
      };
      return await properties.insertOne(usersDoc);
    } catch (e) {
      console.error(`Unable to add employee: ${e}`);
      return { Error: e };
    }
  }

  static async updateProperty(
    id,
    renter_id
  ) {
    try {
      const updateResponse = await properties.updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            renter_id: ObjectId(renter_id),
            isrented: 1,
          },
        }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to rent property: ${e}`);
      return { Error: e };
    }
  }
}