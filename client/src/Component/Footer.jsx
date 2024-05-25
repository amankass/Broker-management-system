import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsInstagram, BsTelegram } from "react-icons/bs";
//import newsletter from "../images/newsletter.png";
function Footer() {
  return (
    <>
      <footer className="py-4 bg-slate-300 shadow-md">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="mb-4 text-slate-950 font-bold">Contact Us</h4>
              <div>
                <address className="text-slate-950 fs-6">
                  Amanuel
                  <br /> IS ,4th Year
                  <br /> Haramaya University
                </address>
                <a
                  href="tel: +251 920642496"
                  className="mt-3 d-block mb-2 text-slate-950"
                >
                  +251-919410682
                </a>
                <a
                  href="mailto:amanithetop@gmail.com"
                  className="mt-3 d-block mb-2 text-slate-950"
                >
                  amankas@gmail.com
                </a>
                <div className="soical_icon d-flex align-items-center gap-30 mt-4">
                  <a className="text-slate-950" href="https://linkedin.com">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a
                    className="text-slate-950"
                    href="https://Github.com/amani0988"
                  >
                    <BsGithub className="fs-4 " />
                  </a>
                  <a
                    className="text-slate-950"
                    href="https://instagram.com/amani0941"
                  >
                    <BsInstagram className="fs-4" />
                  </a>
                  <a
                    className="text-slate-950"
                    href="https://telegram.com/BeYourSelfamu"
                  >
                    <BsTelegram className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="mb-3 text-slate-950 font-bold">Information</h4>
              <div className="d-flex flex-column">
                <Link className="text-slate-950 p-2 mb-1">Privacy policy</Link>
                <Link className="text-slate-950 p-2 mb-1">Refund Policy</Link>
                <Link className="text-slate-950 p-2 mb-1">Shipping Policy</Link>
                <Link className="text-slate-950 p-2 mb-1">
                  Terms & Condtions
                </Link>
                <Link className="text-slate-950 p-2 mb-1">Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="mb-3 text-slate-950 font-bold">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-slate-950 p-2 mb-1">About Us</Link>
                <Link className="text-slate-950 p-2 mb-1">Contact Us</Link>
                <Link className="text-slate-950 p-2 mb-1">Faq</Link>
              </div>
            </div>
            {/* <div className="col-2">
              <h4 className="mb-3 text-slate-950 font-bold">Quick Link</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-slate-950 p-2 mb-1">Automotives</Link>
                <Link className="text-slate-950 p-2 mb-1">Apartment</Link>
              </div>
            </div> */}
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center text-white mb-0">
                &copy; {new Date().getFullYear()}; Powered by Amanuel
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
