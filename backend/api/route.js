import express from "express"
import PropertiesController from "./properties.controller.js"
import RentedController from "./rented.controller.js"
import UsersController from "./users.controller.js"

const router = express.Router()

router
    .route("/login")
    .get(UsersController.apiGetUserID)
    
router
    .route("/users")
    .get(UsersController.apiGetUsers)
    .post(UsersController.apiPostUsers)
    .put(UsersController.apiPutUsers)

router
    .route("/properties")
    .get(PropertiesController.apiGetProperties)
    .post(PropertiesController.apiPostProperties)
    .put(PropertiesController.apiPutProperty)

router
    .route("/prop")
    .get(PropertiesController.apiGetPropertyID)

router
    .route("/rented")
    .get(RentedController.apiGetUserID)
    .post(RentedController.apiPostrented)
    .put(RentedController.apiPutrented)
    .get(RentedController.apiGetrented)

export default router