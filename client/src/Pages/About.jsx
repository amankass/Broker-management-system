import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Header isFixed={true} />
      <div className="min-h-screen dark:bg-gray-100 dark:text-gray-800">
        <div className="p-6 space-y-8 mt-5">
          <main>
            <div className="container mx-auto space-y-16 mt-4">
              <section className="grid gap-6 text-center lg:grid-cols-2 xl:grid-cols-5">
                <div className="w-full p-6 rounded-md sm:p-16 xl:col-span-2 dark:bg-gray-50">
                  <h1 className="text-5xl font-extrabold dark:text-gray-900">
                    Work With IBS
                  </h1>
                  <p className="my-8">
                    <span className="font-medium dark:text-gray-900">
                      Simplicity and Accesibility.
                    </span>
                    Here our system make you selling and Buying activity Easy
                    and Accesible any where in any time
                  </p>
                  <form
                    noValidate=""
                    action=""
                    className="self-stretch space-y-3"
                  >
                    <Link
                      to={"/Sign-up"}
                      className="w-full py-2 font-semibold rounded bg-red-700 hover:bg-transparent dark:text-gray-50"
                    >
                      Join the our Platform
                    </Link>
                  </form>
                </div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Broker_%282022_film%29_Logo.png"
                  alt=""
                  className="object-cover w-full h-full rounded-md xl:col-span-3 bg-slate-300"
                />
              </section>
              <section>
                <span className="block font-semibold mb-2 text-xs tracking-widest uppercase lg:text-center">
                  How you Stay With Our System
                </span>
                <h2 className="text-5xl font-bold lg:text-center dark:text-gray-900">
                  Make your Trade Activity Easy
                </h2>
                <div className="grid gap-6 my-16 lg:grid-cols-3">
                  <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-50">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-red-700 dark:text-gray-50">
                      1
                    </div>
                    <p className="text-2xl font-thin size-22">
                      <span className="font-bold  text-red-700">Visiter </span>if you are just a visitor please free and
                      visite the entire System working activity as a visitore
                      you can give a comment for our platform just go to contact
                      section and fill the credential then give comment your
                      comment makes us more productiv!{" "}
                      <span className="text-red-700">
                        Thankyou for your Visiting
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-50">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-red-700 dark:text-gray-50">
                      2
                    </div>
                    <p className="text-2xl font-thin">
                      <span className="font-bold  text-red-700">Seller and Buyers </span>If you are comming to our System
                      to sell or Buy Property please Make SUre you are SignUp
                      for our Platform if you are sure with SignUp for the
                      System. you can contact any broker in our system to buy
                      just go one post and see detail then inside the detail
                      there is Contact Broker Button by clicking that you can
                      talk about what you what with that broker
                    </p>
                  </div>
                  <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-50">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-red-700 dark:text-gray-50">
                      3
                    </div>
                    <p className="text-2xl font-thin size-22">
                      
                      <span className="font-bold  text-red-700">
                      Brokers Hey This simple Manuel is for Brokers
                      </span>{" "}
                       this Website is for you with our Platform you can get your
                      best Clients. Please make sure register for our System as
                      when you register you have to upload your licence wich or
                      better security then. To start Uploading Property with our
                      system you have to pay System fee which is monthly fee any
                      post in our platform stay online for one month only the it
                      will be deleted to upload that lsiting you have to pay
                      payment for that Listing
                    </p>
                  </div>
                </div>
              </section>
              <section className="grid gap-6 lg:grid-cols-2">
                <img
                  src="https://ibsrent.com/wp-content/uploads/2020/07/logo.png"
                  alt=""
                  className="object-cover w-full rounded-md max-h-96 dark:bg-gray-500"
                />
                <div className="flex flex-col items-center p-6 space-y-8 rounded-md lg:h-full lg:p-8 dark:bg-gray-50">
                  <img
                    src="https://nahbprodlhstorage.blob.core.windows.net/uploads/Logos_Photos/IBS_logo_NAHB_Black_RGB-HiRes.jpg"
                    alt=""
                    className="object-cover w-20 h-20 rounded-full dark:bg-gray-500"
                  />
                  <blockquote className="max-w-lg text-lg italic font-medium text-center">
                    "Et, Make brokers, Sellers, Buyers business activity easy.
                    our team always on the way to working with Our System System
                    Clients!"
                  </blockquote>
                  <div className="text-center dark:text-gray-600">
                    <p>Amanuel Kassahun</p>
                    <p>CEO of Company IBS.</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      aria-label="Page 1"
                      className="w-2 h-2 rounded-full dark:bg-gray-900"
                    ></button>
                    <button
                      type="button"
                      aria-label="Page 2"
                      className="w-2 h-2 rounded-full dark:bg-gray-400"
                    ></button>
                    <button
                      type="button"
                      aria-label="Page 3"
                      className="w-2 h-2 rounded-full dark:bg-gray-400"
                    ></button>
                    <button
                      type="button"
                      aria-label="Page 4"
                      className="w-2 h-2 rounded-full dark:bg-gray-400"
                    ></button>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
