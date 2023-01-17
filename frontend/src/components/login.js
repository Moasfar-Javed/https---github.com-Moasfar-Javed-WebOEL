import React, { useState, useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import constants from '../utilities/constants';
import axios from 'axios'
import './../css/style.css'

const constant = constants.getConstant();

function Login(props) {

    const onRegister = () => {
        window.location = "#/register";
      };

      const onDelete = () => {
        window.location = "#/delete";
      };


      const [data, setData] = useState([]);
  var em;
  var pass;

  const changed = async () => {
    em = document.getElementById("forEmail").value;
    pass = document.getElementById("forPass").value;
    const result = await axios(constant.login + `?email=${em}&password=${pass}`);
    setData(result.data.usersList);
  }

  const onSubmit = async () => {
    em = document.getElementById("forEmail").value;
    pass = document.getElementById("forPass").value;
    const result = await axios(constant.login + `?email=${em}&password=${pass}`);
    setData(result.data.usersList);
   localStorage.setItem('data', JSON.stringify(data));
        props.history.push({
          pathname: '/rent',
        })
  }

  return (
    <div className="App">
      <section className="vh-100">
        <div className="container-fluid" style={{marginLeft: '30%', padding: '10px'}}>
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4">
                <i
                  className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "#709085" }}
                />
                <h1 style={{fontSize: "70px", marginBottom: "0px", marginTop: "80px" }}>
                  Login
                </h1>
              </div>
              <div style={{ marginTop: "50px" }} className="d-flex align-items-center px-5 ms-xl-4 pt-xl-0">
                <form style={{ width: "23rem" }}>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="forEmail"
                      placeholder="Email"
                      className="form-control form-control-lg"
                      onChange={changed}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="forPass"
                      placeholder="Password"
                      className="form-control form-control-lg"
                      onChange={changed}
                    />
                  </div>
                  <div className="d-grid gap-2">
                  <button className="btn btn-outline-info btn-lg btn-block" onClick={() => { onSubmit() }}>Login</button>
                    <br />
                  </div>
           
                  <br />
                  <p className="small mb-5 pb-lg-2">
                    <button className="btn btn-outline-info btn-lg btn-block" onClick={() => { onRegister() }}>Register</button>
                    <button className="btn btn-outline-info btn-lg btn-block" onClick={() => { onDelete() }}>Delete an Account</button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
