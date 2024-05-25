import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  // FaBath,
  // FaBed,
  // FaChair,
  // FaMapMarkedAlt,
  FaMapMarkerAlt,
  // FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../Component/Contact.jsx";
import Header from "../Component/Header.jsx";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function CarListing() {
  SwiperCore.use([Navigation]);
  const { userId } = useAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const [taxAmount, setTaxAmount] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/carlist/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  // useEffect(() => {
  //   const fetchListing = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch(`/api/carlist/get/${params.listingId}`);
  //       const data = await res.json();
  //       if (data.success === false) {
  //         setError(true);
  //         setLoading(false);
  //         return;
  //       }
  //       setListing(data);
  //       setLoading(false);
  //       setError(false);
  //     } catch (error) {
  //       setError(true);
  //       setLoading(false);
  //     }
  //   };
  //   fetchListing();
  // }, [params.listingId]);
  useEffect(() => {
    // Calculate tax when listing or offer status changes
    if (listing) {
      const propertyTaxRate = 0.02; // Example property tax rate (2%)
      const listingPrice = listing.regularPrice;
      const calculatedTax = listingPrice * propertyTaxRate;
      setTaxAmount(calculatedTax);
    }
  }, [listing]);
  const handleContactClick = () => {
    if (userId) {
      // Only navigate if the user is logged in
      setContact(true);
    } else {
      // Display message or redirect to sign-in page if not logged in
      alert("Please create an account to contact the broker.");
    }
  };

  return (
    <>
      <Header isFixed={true} />
      <main className="pt-24">
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && (
          <p className="text-center my-7 text-2xl">Something went wrong!</p>
        )}
        {listing && !loading && !error && (
          <div>
            <Swiper navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className="h-[900px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
              <FaShare
                className="text-slate-500"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                Link copied!
              </p>
            )}
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
              <p className="text-2xl font-semibold">
                {listing.model} - ETB{" "}
                {listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " / month"}
              </p>
              {/* Display tax amount */}
              <p className="text-green-900 font-semibold text-lg">
                Property Tax: ETB{taxAmount.toFixed(2)}
              </p>
              <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
                <FaMapMarkerAlt className="text-green-700" />
                {listing.address}
              </p>
              <div className="flex gap-4">
                <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {listing.type === "rent" ? "For Rent" : "For Sell"}
                </p>
                {listing.offer && (
                  <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    ETB{listing.discountPrice} OFF
                  </p>
                )}
              </div>
              <p className="text-slate-800">
                <span className="font-semibold text-black">
                  Derscription -{" "}
                </span>
                {listing.description}
              </p>

              <div className="-mt-5">
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-lg font-semibold">Color:</p>
                  <p>{listing.color}</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-lg font-semibold">Year:</p>
                  <p>{listing.year}</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-lg font-semibold">Mileage:</p>
                  <p>{listing.mileage}</p>
                </div>
              </div>
              <div className="ml-80 -mt-44">
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-lg font-semibold">Condition:</p>
                  <p>{listing.condition}</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-lg font-semibold">Fuel Type:</p>
                  <p>{listing.fuelType}</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-lg font-semibold">Transmission:</p>
                  <p>{listing.transmission}</p>
                </div>
              </div>
              {/* </div> */}

              {userId ? (
                listing.userRef !== userId && !contact ? (
                  <button
                    onClick={() => setContact(true)}
                    className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                  >
                    Contact Broker
                  </button>
                ) : (
                  contact && <Contact listing={listing} />
                )
              ) : (
                <button
                  onClick={() =>
                    alert("Please create an account to contact the broker!")
                  }
                  className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                >
                  Contact Broker
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore from "swiper";
// import { useAuth } from "../context/AuthContext.jsx";
// import { Navigation } from "swiper/modules";
// import "swiper/css/bundle";
// import {
//   FaBath,
//   FaBed,
//   FaChair,
//   FaMapMarkedAlt,
//   FaMapMarkerAlt,
//   FaParking,
//   FaShare,
// } from "react-icons/fa";
// import Contact from "../Component/Contact.jsx";
// import Header from "../Component/Header.jsx";

// // https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

// export default function CarListing() {
//   SwiperCore.use([Navigation]);
//   const { userId } = useAuth();
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [contact, setContact] = useState(false);
//   const params = useParams();

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/carlist/get/${params.listingId}`);
//         const data = await res.json();
//         if (data.success === false) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         setListing(data);
//         setLoading(false);
//         setError(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [params.listingId]);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/carlist/get/${params.listingId}`);
//         const data = await res.json();
//         if (data.success === false) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         setListing(data);
//         setLoading(false);
//         setError(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [params.listingId]);

//   return (
//     <>
//       <Header />
//       <main>
//         {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
//         {error && (
//           <p className="text-center my-7 text-2xl">Something went wrong!</p>
//         )}
//         {listing && !loading && !error && (
//           <div>
//             <Swiper navigation>
//               {listing.imageUrls.map((url) => (
//                 <SwiperSlide key={url}>
//                   <div
//                     className="h-[550px]"
//                     style={{
//                       background: `url(${url}) center no-repeat`,
//                       backgroundSize: "cover",
//                     }}
//                   ></div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//             <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
//               <FaShare
//                 className="text-slate-500"
//                 onClick={() => {
//                   navigator.clipboard.writeText(window.location.href);
//                   setCopied(true);
//                   setTimeout(() => {
//                     setCopied(false);
//                   }, 2000);
//                 }}
//               />
//             </div>
//             {copied && (
//               <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
//                 Link copied!
//               </p>
//             )}
//             <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
//               <p className="text-2xl font-semibold">
//                 {listing.model} - ${" "}
//                 {listing.offer
//                   ? listing.discountPrice.toLocaleString("en-US")
//                   : listing.regularPrice.toLocaleString("en-US")}
//                 {listing.type === "rent" && " / month"}
//               </p>
//               {/* Display tax amount */}
//               <p className="text-green-900 font-semibold text-lg">
//                 Property Tax: ${taxAmount.toFixed(2)}
//               </p>
//               <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
//                 <FaMapMarkerAlt className="text-green-700" />
//                 {listing.address}
//               </p>
//               <div className="flex gap-4">
//                 <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
//                   {listing.type === "rent" ? "For Rent" : "For Sale"}
//                 </p>
//                 {listing.offer && (
//                   <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
//                     ${+listing.regularPrice - +listing.discountPrice} OFF
//                   </p>
//                 )}
//               </div>
//               <p className="text-slate-800">
//                 <span className="font-semibold text-black">
//                   Derscription -{" "}
//                 </span>
//                 {listing.description}
//               </p>

//               <div className="-mt-5">
//                 <div className="flex items-center gap-2 mb-4">
//                   <p className="text-lg font-semibold">Color:</p>
//                   <p>{listing.color}</p>
//                 </div>
//                 <div className="flex items-center gap-2 mb-4">
//                   <p className="text-lg font-semibold">Year:</p>
//                   <p>{listing.year}</p>
//                 </div>
//                 <div className="flex items-center gap-2 mb-4">
//                   <p className="text-lg font-semibold">Mileage:</p>
//                   <p>{listing.mileage}</p>
//                 </div>
//               </div>
//               <div className="ml-80 -mt-44">
//                 <div className="flex items-center gap-2 mb-4">
//                   <p className="text-lg font-semibold">Condition:</p>
//                   <p>{listing.condition}</p>
//                 </div>
//                 <div className="flex items-center gap-2 mb-4">
//                   <p className="text-lg font-semibold">Fuel Type:</p>
//                   <p>{listing.fuelType}</p>
//                 </div>
//                 <div className="flex items-center gap-2 mb-4">
//                   <p className="text-lg font-semibold">Transmission:</p>
//                   <p>{listing.transmission}</p>
//                 </div>
//               </div>
//               {/* </div> */}

//               {userId && listing.userRef !== userId && !contact && (
//                 <button
//                   onClick={() => setContact(true)}
//                   className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
//                 >
//                   Contact Broker
//                 </button>
//               )}
//               {contact && <Contact listing={listing} />}
//             </div>
//           </div>
//         )}
//       </main>
//     </>
//   );
// }
