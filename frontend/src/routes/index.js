import React from "react";
import { Route } from "react-router-dom";
import Delete from "../components/delete";
import Register from "../components/register";
import Renting from "../components/rent";

export const Routes = () => (
  <div>
    <Route path="/register" component={Register} />
    <Route path="/rent" component={Renting} />
    <Route path="/delete" component={Delete} />
  </div>
);
