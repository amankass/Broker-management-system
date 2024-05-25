import React, { useState } from "react";
import Pay from "../Component/Pay"; // Make sure to import the Pay component

function Donet() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(1000);

  const public_key = "CHAPUBK_TEST-vrtaPOCrpb0UC0NcMaOcZfx2BbBP1cfS"; // You should set your public key here
  const tx_ref = `${fname}-tx-165114`; // You should set your transaction reference here

  return (
    <div
      id="donate"
      className="bg-slate-300 h-screen flex justify-center items-center"
    >
      <div className="bg-slate-200 w-[40em] h-[35em] p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Payment Form</h2>
        <div className="mb-4">
          <label htmlFor="fname" className="block font-semibold text-gray-700">
            First Name:
          </label>
          <input
            id="fname"
            type="text"
            placeholder="Please Enter First name"
            onChange={(e) => {
              setFname(e.target.value);
              console.log(fname);
            }}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lname" className="block font-semibold text-gray-700">
            Last Name:
          </label>
          <input
            id="lname"
            type="text"
            placeholder="Please Enter Last name"
            onChange={(e) => {
              setLname(e.target.value);
              console.log(lname);
            }}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold text-gray-700">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="Please Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(email);
            }}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block font-semibold text-gray-700">
            Amount:
          </label>
          <input
            id="amount"
            type="number"
            placeholder="1000"
            value={1000}
            className="border border-gray-300 rounded-md p-2 w-full"
            readOnly
          />
        </div>
        {/* Pass state values as props to the Pay component */}
        <button
          className="bg-slate-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          ///onClick={() => console.log('Form submitted')}
        >
          <Pay
            fname={fname}
            lname={lname}
            email={email}
            amount={amount}
            tx_ref={tx_ref}
            public_key={public_key}
          />
        </button>
      </div>
    </div>
  );
}

export default Donet;
