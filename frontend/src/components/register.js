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

function Register(props) {
  const [showMessage, setShowMessage] = useState(false);
  const [setShowData, setFormData] = useState({});

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setFormData(data);

    axios
      .post(constant.userList, data)
      .then((result) => {
        setShowMessage(true);
      })
      .catch((error) => setShowMessage(false));

    window.location = "http://localhost:3000/";
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  return (
    <div className="form-demo">
      <div className="justify-content-center ">
        <h2 className="text-center">
          <b>Register Employee</b>
        </h2>
        <div
          className="card"
          style={{ paddingBottom: "2rem", paddingTop: "2rem" }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="grid p-fluid">
            <div className="field col-4">
              <span className="p-float-label">
                <Controller
                  name="name"
                  placeholder="Name"
                  control={control}
                  rules={{ required: "Name is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
              </span>
              {getFormErrorMessage("name")}
            </div>
            <br></br>

            <div className="field col-4">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <Controller
                  name="email"
                  placeholder="Email"
                  control={control}
                  rules={{
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address. E.g. example@email.com",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
              </span>
              {getFormErrorMessage("email")}
            </div>
            <br></br>
            <div className="field col-4">
              <span className="p-float-label">
                <Controller
                  name="password"
                  placeholder="Password"
                  control={control}
                  rules={{ required: "Password is required." }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
              </span>
              {getFormErrorMessage("password")}
            </div>
            <br></br>

            <div className="col-12">
              <button
                className="btn btn-outline-info btn-lg btn-block"
                type="submit"
                label="Submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
