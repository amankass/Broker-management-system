import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import { createBroker } from "../features/Brokers/brokerSlice";
import { useDispatch } from "react-redux";

function AddBroker() {
  const dispatch = useDispatch();
  let schema = yup.object().shape({
    fname: yup.string().required("First Name is Required"),
    lname: yup.string().required("Last name is Required"),
    password: yup.string().required("Password is Required"),
    username: yup.string().required("username is Required"),
    email: yup.string().required("email is Required"),
    mobile: yup.string().required("mobile is Required"),
    experiance: yup.string().required("experiance is Required"),
    TypeofBroker: yup.string().required("TypeofBroker is Required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fname: "",
      lname: "",
      password: "",
      username: "",
      email: "",
      mobile: "",
      experiance: "",
      TypeofBroker: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(createBroker(values));

      formik.resetForm();

      setTimeout(() => {
        //   dispatch(resetState());
      }, 3000);
    },
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-7">Add Broker</h1>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="mt-4">
          <CustomInput
            type="text"
            label="Enter First Name"
            name="fname"
            onChng={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fname}
          />
          <div className="error">
            {formik.touched.fname && formik.errors.fname}
          </div>
          <CustomInput
            type="text"
            label="Enter Last Name"
            name="lname"
            onChng={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lname}
          />
          <div className="error">
            {formik.touched.lname && formik.errors.lname}
          </div>
          <CustomInput
            type="password"
            label="Enter Password"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password}
          </div>
          <CustomInput
            type="username"
            label="Enter UserName"
            name="password"
            onChng={formik.handleChange("username")}
            onBlr={formik.handleBlur("username")}
            val={formik.values.username}
          />
          <div className="error">
            {formik.touched.username && formik.errors.username}
          </div>
          <CustomInput
            type="email"
            label="Enter Email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="text"
            label="Enter Phone"
            name="mobile"
            onChng={formik.handleChange("mobile")}
            onBlr={formik.handleBlur("mobile")}
            val={formik.values.mobile}
          />
          <div className="error">
            {formik.touched.mobile && formik.errors.mobile}
          </div>
          <CustomInput
            type="text"
            label="Enter Year of Experiance"
            name="mobile"
            onChng={formik.handleChange("experiance")}
            onBlr={formik.handleBlur("experiance")}
            val={formik.values.experiance}
          />
          <div className="error">
            {formik.touched.experiance && formik.errors.experiance}
          </div>
          <CustomInput
            type="text"
            label="Enter Type of Broker"
            name="TypeofBroker"
            onChng={formik.handleChange("TypeofBroker")}
            onBlr={formik.handleBlur("TypeofBroker")}
            val={formik.values.TypeofBroker}
          />
          <div className="error">
            {formik.touched.TypeofBroker && formik.errors.TypeofBroker}
          </div>
        </div>
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          Add Broker
        </button>
      </form>
    </div>
  );
}

export default AddBroker;
