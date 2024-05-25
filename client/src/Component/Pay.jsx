import React, { useState } from "react";
import { toast } from "react-toastify";

function Pay({ fname, lname, email, amount, public_key, tx_ref }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ general: null });
  const [uploading, setUploading] = useState(false);

  const saveFormDataToMongoDB = async () => {
    const formData = { fname, lname, email, amount }; // Construct formData here

    try {
      const res = await fetch("/api/auth/SystemPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError({ general: data.message });
        return false;
      }
      return true;
    } catch (error) {
      setError({ general: error.message });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formDataSaved = await saveFormDataToMongoDB();

    if (formDataSaved) {
      document.getElementById("paymentForm").submit();
    } else {
      setLoading(false);
      toast.error("Failed to save form data. Please try again.");
    }
  };

  return (
    <div>
      <form
        id="paymentForm"
        method="POST"
        action="https://api.chapa.co/v1/hosted/pay"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="public_key" value={public_key} />
        <input type="hidden" name="tx_ref" value={tx_ref} />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="first_name" value={fname} />
        <input type="hidden" name="last_name" value={lname} />
        <input type="hidden" name="title" value="Let us do this" />
        <input
          type="hidden"
          name="description"
          value="Paying with Confidence with cha"
        />
        <input
          type="hidden"
          name="logo"
          value="https://chapa.link/asset/images/chapa_swirl.svg"
        />
        <input
          type="hidden"
          name="callback_url"
          value="https://example.com/callbackurl"
        />
        <input
          type="hidden"
          name="return_url"
          value="http://localhost:5173/Bprofile"
        />
        <input type="hidden" name="meta[title]" value="test" />
        <button disabled={loading || uploading} type="submit">
          {loading ? "Loading..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

export default Pay;
