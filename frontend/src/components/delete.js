import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import constants from "../utilities/constants";
import axios from "axios";
import "./../css/style.css";

const constant = constants.getConstant();

let del;

function Delete(props) {

    const [data, setData] = useState([]);
  
    const changed = async () => {
        del = document.getElementById("forDelete").value;
        axios.put(constant.userList + `name=${del}`)
      }
    
      const onSubmit = async () => {
        del = document.getElementById("forDelete").value;
        axios.put(constant.userList + `name=${del}`)
       window.location = "http://localhost:3000/";
      }

  return (
    <div className="form-demo">
        <div className="container-fluid" style={{marginLeft: '30%', padding: '10px'}}>
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4">
                <i
                  className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "#709085" }}
                />
                <h1 style={{fontSize: "70px", marginBottom: "0px", marginTop: "80px" }}>
                  Delete
                </h1>
              </div>
              <div style={{ marginTop: "50px" }} className="d-flex align-items-center px-5 ms-xl-4 pt-xl-0">
                <form style={{ width: "23rem" }}>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="forDelete"
                      placeholder="Enter name"
                      className="form-control form-control-lg"
                      onChange={changed}
                    />
                  </div>
                  <div className="d-grid gap-2">
                  <button className="btn btn-outline-info btn-lg btn-block" onClick={() => { onSubmit() }}>Delete</button>
                    <br />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Delete;
