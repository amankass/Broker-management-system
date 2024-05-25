import Meta from "../Component/Mete";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import CustomInput from "../Component/custominput";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Your other imports...

function Contact() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Check for duplicate content before submitting
      if (formData.comment === formData.lastComment) {
        setLoading(false);
        toast.error(
          "Duplicate content detected. Please provide a different message."
        );
        return;
      }

      // Assuming your API endpoint is correct
      const res = await fetch("/api/auth/Contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        toast.error(data.message);
      } else {
        toast.success("Your message has been sent!");
        // Navigate to home page after successful submission
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Header isFixed={true} />
      <Meta title={"Contact Us"} />
      <div className="contact-wrapper home-wrapper-2 py-5">
        <div className="container-xxl pt-24">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.01806005281026!2d42.010211659762!3d9.39601824346826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1631a51142e75a3f%3A0xa35f6a33c915b2e2!2sHaramaya%20University!5e0!3m2!1sen!2sus!4v1707086805977!5m2!1sen!2sus"
                width="600"
                height="450"
                className="border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-liner-warpper d-flex justify-content-btween">
                <div>
                  <h3 className="contact-title mb-4 ">Contact Us</h3>
                  <form
                    onSubmit={handleSubmit}
                    action=""
                    className="d-flex flex-column gap-10"
                  >
                    <div>
                      <input
                        type="text"
                        id="fullname"
                        className="form-control"
                        placeholder="Full Name"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="email"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        id="mobile"
                        className="form-control"
                        placeholder="Mobile Number"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        cols="30"
                        id="comment"
                        rows="4"
                        className="w-100 form-control"
                        placeholder="Send Message"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div>
                      <button
                        disabled={loading}
                        type="submit"
                        className="button border-0"
                      >
                        {" "}
                        {loading ? "Loading..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title mb-4 ">Get In Touch With Us</h3>
                  <div>
                    <ul className="py-0">
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineHome className="fs-5 d-flex gap-15 align-items-center" />
                        <address className="mb-0">
                          Ethiopia, Haramaya Universty,IT Dep
                        </address>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiPhoneCall className="fs-5" />
                        <a href="tel: +251 920642496">+251 920642496</a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <AiOutlineMail className="fs-5" />
                        <a href="mailto:amanithetop@gmail.com">
                          aman@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex gap-15 align-items-center">
                        <BiInfoCircle className="fs-5 " />
                        <p className="mb-0">Monday-Friday 10AM-6PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
