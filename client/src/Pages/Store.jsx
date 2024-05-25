import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Component/Footer";
import Header from "../Component/Header";
import ListingItem from "../Component/ListningItem";

export default function Store() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const res = await fetch("/api/combinelist/get");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setListings(data);
      } else {
        setListings([]);
      }
      setLoading(false);
    };

    fetchListings();
  }, []);

  const categorizeListings = (listings) => {
    const categorizedListings = {
      rent: [],
      sell: [],
      // Add more categories as needed
    };

    listings.forEach((listing) => {
      categorizedListings[listing.type].push(listing);
    });

    return categorizedListings;
  };

  const handleListingClick = (id) => {
    navigate(`/listing/${id}`);
  };

  const renderListings = (listings) => {
    return Object.entries(listings).map(([category, listings]) => (
      <div key={category}>
        <br></br>
        <div className="flex border-b">
          <h2 className="text-xl font-bold uppercase text-gray-900 p-2 w-48">
            {category}
          </h2>
        </div>
        <br></br>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingItem
              key={listing._id}
              listing={listing}
              onClick={() => handleListingClick(listing._id)}
            />
          ))}
        </div>
      </div>
    ));
  };

  return (
    <>
      <Header isFixed={true} />
      <div className="flex flex-col md:flex-row pt-16">
        <div className="p-10 border-b-2 md:border-r-2 md:min-h-screen">
          {/* <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Store
        </h1> */}
          {loading && <p>Loading...</p>}
          {!loading && listings.length === 0 && <p>No listings found.</p>}
          {!loading && listings.length > 0 && (
            <div>{renderListings(categorizeListings(listings))}</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
