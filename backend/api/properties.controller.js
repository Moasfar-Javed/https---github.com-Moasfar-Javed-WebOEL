import PropertiesDAO from "../dao/propertiesDAO.js";

export default class PropertiesController {
    static async apiGetProperties(req, res, next) {

      const { propertiesList, totalNumproperties } = await PropertiesDAO.getProperties({

      });
  
      let response = {
        propertiesList: propertiesList,
        total_results: totalNumproperties,
      };
      res.json(response);
    }
  
    static async apiGetPropertyID(req, res, next) {
      const id = req.query.id;
      const { details } = await PropertiesDAO.getPropertyID(id);
      let response = { details };
      res.json(response);
    }

    static async apiPostProperties(req, res, next) {
        try {
          const name = req.body.name.toLowerCase();
          const description = req.body.description.toLowerCase();
          const owner_id = req.body.owner_id
    
          const userResponse = await PropertiesDAO.addProperties(
            name,
            description,
            owner_id
          );
          res.json({ Status: "Success" });
        } catch (e) {
          res.status(500).json({ Error: e.message });
        }
      }

      static async apiPutProperty(req, res, next) {
        try {
          const userResponse = await PropertiesDAO.updateProperty(
            req.query.id,
            req.query.renter_id
          );
    
          var { error } = userResponse;
          if (error) {
            res.status(400).json({ error });
          }
    
          if (userResponse.modifiedCount === 0) {
            throw new Error("Unable to rent property");
          }
    
          res.json({ Status: "Success" });
        } catch (e) {
          res.status(500).json({ Error: e.message });
        }
      }
    
}