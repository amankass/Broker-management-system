import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../Component/Footer";
import Header from "../Component/Header";
import ListingItem from "../Component/ListningItem";
import { FaEnvelope, FaPhone, FaTelegramPlane } from "react-icons/fa"; // Importing icons from react-icons

export default function Store() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [selectedBrokerId, setSelectedBrokerId] = useState(null);
  const [contactBrokerId, setContactBrokerId] = useState(null);
  const [emailBody, setEmailBody] = useState("");
  const [showAllBrokers, setShowAllBrokers] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch all brokers
      const brokersRes = await fetch("/api/auth/get/");
      const brokersData = await brokersRes.json();
      setBrokers(brokersData);

      // Fetch all listings
      const listingsRes = await fetch("/api/combinelist/get");
      const listingsData = await listingsRes.json();
      if (Array.isArray(listingsData) && listingsData.length > 0) {
        setListings(listingsData);
      } else {
        setListings([]);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleBrokerClick = (brokerId) => {
    setSelectedBrokerId(selectedBrokerId === brokerId ? null : brokerId);
  };

  const handleContactClick = (brokerId) => {
    setContactBrokerId(contactBrokerId === brokerId ? null : brokerId);
  };

  // const handleSendEmail = (email) => {
  //   // Logic to send email (e.g., using a backend API)
  //   alert(`Message sent to ${email}: ${emailBody}`);
  //   setEmailBody("");
  //   setContactBrokerId(null);
  // };

  // const handleShowMoreBrokers = () => {
  //   setShowAllBrokers(true);
  // };

  const renderBrokers = () => {
    let displayedBrokers = brokers.slice(0, 5);
    if (showAllBrokers) {
      displayedBrokers = brokers;
    }

    return displayedBrokers.map((broker) => {
      const brokerListings = listings.filter(
        (listing) => listing.userRef === broker._id
      );
      const isSelected = selectedBrokerId === broker._id;
      const isContacting = contactBrokerId === broker._id;

      return (
        <div
          key={broker._id}
          className="rounded-lg shadow-md p-6 mb-4 ml-18"
          style={{ cursor: brokerListings.length ? "pointer" : "default" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2
              className="text-xl font-bold uppercase text-gray-900 cursor-pointer"
              onClick={() => handleBrokerClick(broker._id)}
            >
              {broker.fname} {broker.lname}
            </h2>
            <h2 className="font-bold text-gray-900">
              <p>Click Name to See {broker.fname}'s Previous Post</p>
            </h2>
          </div>
          <button
            className="bg-red-700 px-4 py-2 text-white rounded"
            onClick={() => handleContactClick(broker._id)}
          >
            Contact Broker
          </button>
          {isContacting &&
            (userId ? (
              <div className="mt-2">
                <p className="flex items-center font-bold">
                  <FaEnvelope className="h-6 w-6 text-blue-600 mr-2" />{" "}
                  {broker.email}
                </p>
                <p className="flex items-center font-bold">
                  <FaPhone className="h-6 w-6 text-blue-600 mr-2" />{" "}
                  {broker.mobile}
                </p>
                <p className="flex items-center font-bold">
                  <a
                    href={`https://t.me/${broker.mobile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <FaTelegramPlane className="h-6 w-6 text-blue-600 mr-2" />
                    Telegram
                  </a>
                </p>
              </div>
            ) : (
              <p>Please create an account to view Broker details.</p>
            ))}
          {isSelected && brokerListings.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
              {brokerListings.map((listing) => (
                <ListingItem
                  key={listing._id}
                  listing={listing}
                  onClick={() => handleListingClick(listing._id)}
                />
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  const handleListingClick = (id) => {
    navigate(`/listing/${id}`);
  };

  return (
    <>
      <Header isFixed={true} />
      <div className="flex flex-col md:flex-row pt-16 justify-center mt-3 ">
        <div className="p-10 md:min-h-screen max-w-max">
          <h1 className="uppercase text-3xl font-bold text-center ml-30">
            Brokers List
          </h1>
          <br />
          {loading && <p>Loading...</p>}
          {!loading && brokers.length === 0 && <p>No brokers found.</p>}
          {!loading && brokers.length > 0 && (
            <>
              <div>{renderBrokers()}</div>
              {!showAllBrokers && brokers.length > 5 && (
                <button
                  className="mt-4 px-4 py-2 bg-red-700 text-white rounded"
                  onClick={handleShowMoreBrokers}
                >
                  Show More Brokers
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
