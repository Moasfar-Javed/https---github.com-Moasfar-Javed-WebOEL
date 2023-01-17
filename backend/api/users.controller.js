import UsersDAO from "../dao/usersDAO.js";

export default class UsersController {
    static async apiGetUsers(req, res, next) {
      let filters = {};
     if (req.query.name) {
        filters.name = req.query.name.toLowerCase();
      }
  
      const { usersList, totalNumUsers } = await UsersDAO.getUsers({
        filters,
      });
  
      let response = {
        usersList: usersList,
        filters: filters,
        total_results: totalNumUsers,
      };
      res.json(response);
    }
  
    static async apiGetUserID(req, res, next) {
      const email = req.query.email;
      const password = req.query.password;
      const { details } = await UsersDAO.getUserID(email, password);
      let response = { details };
      res.json(response);
    }

    static async apiPostUsers(req, res, next) {
        try {
          const name = req.body.name.toLowerCase();
          const email = req.body.email;
          const password = req.body.password
    
          const userResponse = await UsersDAO.addUser(
            name,
            email,
            password
          );
          res.json({ Status: "Success" });
        } catch (e) {
          res.status(500).json({ Error: e.message });
        }
      }

      static async apiPutUsers(req, res, next) {
        try {
          const userResponse = await UsersDAO.updateUser(
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