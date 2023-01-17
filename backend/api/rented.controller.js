import RentedDAO from "../dao/rentedDAO.js";

export default class RentedController {
    static async apiGetrented(req, res, next) {
      let filters = {};
     if (req.query.name) {
        filters.name = req.query.name.toLowerCase();
      }
  
      const { rentedList, totalNumrented } = await RentedDAO.getrented({
        filters,
      });
  
      let response = {
        rentedList: rentedList,
        filters: filters,
        total_results: totalNumrented,
      };
      res.json(response);
    }
  
    static async apiGetUserID(req, res, next) {
      const email = req.query.email;
      const password = req.query.password;
      const { details } = await rentedDAO.getUserID(email, password);
      let response = { details };
      res.json(response);
    }

    static async apiPostrented(req, res, next) {
        try {
          const name = req.body.name.toLowerCase();
          const email = req.body.email;
          const password = req.body.password
    
          const userResponse = await rentedDAO.addUser(
            name,
            email,
            password
          );
          res.json({ Status: "Success" });
        } catch (e) {
          res.status(500).json({ Error: e.message });
        }
      }

      static async apiPutrented(req, res, next) {
        try {
          const userResponse = await rentedDAO.updateUser(
            req.query.name,
          );
    
          var { error } = userResponse;
          if (error) {
            res.status(400).json({ error });
          }
    
          if (userResponse.modifiedCount === 0) {
            throw new Error("Unable to delete user");
          }
    
          res.json({ Status: "Success" });
        } catch (e) {
          res.status(500).json({ Error: e.message });
        }
      }
    
}