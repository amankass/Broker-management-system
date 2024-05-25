import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  console.log("Listing User Ref:", listing.userRef);

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/broker/${listing.userRef}`);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch landlord data (status ${res.status})`
          );
        }
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.error("Error fetching landlord data:", error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            at <span className="font-semibold">{landlord.mobile}</span> for{" "}
            <span className="font-semibold">
              {listing.model ? listing.model : listing.name}
            </span>
          </p>
          {/* <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">
              {listing.model ? listing.model : listing.name}
            </span>
          </p> */}
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Email Message
          </Link>
        </div>
      )}
    </>
  );
}
