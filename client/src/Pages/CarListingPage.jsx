import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import { useNavigate } from "react-router-dom";
import Header from "../Component/Header.jsx"; // Corrected import
import Footer from "../Component/Footer";
import { useAuth } from "../context/AuthContext.jsx";

export default function CreateListing() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    model: "",
    year: 1990,
    mileage: 100,
    color: "",
    condition: "NEW",
    transmission: "Manual",
    fuelType: "Petrol",
    engineCapacity: 50,
    color: "",
    imageUrls: [],
    description: "",
    address: "",
    type: "rent",
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
  });

  const { userId } = useAuth();
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    let newValue = value;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "number") {
      newValue = parseInt(value);
    }

    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      if (!userId) {
        throw new Error("User ID is not available");
      }
      const res = await fetch("/api/carlist/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: userId,
        }),
      });

      const data = await res.json();

      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listings/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Header isFixed={true} />
      <main className="p-3 max-w-4xl mt-5 mx-auto">
        <h1 className="text-3xl font-bold text-center my-7">
          Upload Car Listing
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Model"
              className="border p-3 rounded-lg"
              id="model"
              maxLength="62"
              minLength="5"
              required
              onChange={handleChange}
              value={formData.model}
            />
            <input
              type="text"
              placeholder="Color"
              className="border p-3 rounded-lg"
              id="color"
              maxLength="62"
              minLength="3"
              required
              onChange={handleChange}
              value={formData.color}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
            />

            <label
              htmlFor="condition"
              className=" text-gray-700 font-bold -mb-5 ml-2"
            >
              Year
            </label>
            <input
              type="number"
              placeholder="Year"
              className="border p-3 rounded-lg"
              id="year"
              min="1900"
              max="2099"
              required
              onChange={handleChange}
              value={formData.year}
            />
            <label
              htmlFor="condition"
              className=" text-gray-700 font-bold -mb-5 ml-2"
            >
              Mileage
            </label>
            <input
              type="number"
              placeholder="Mileage"
              className="border p-3 rounded-lg"
              id="mileage"
              min="0"
              max="1000000"
              required
              onChange={handleChange}
              value={formData.mileage}
            />

            <div className="rounded-lg border p-3 ">
              <label
                htmlFor="condition"
                className="block text-gray-700 font-bold mb-2"
              >
                Condition
              </label>
              <select
                className="border p-3 rounded-lg w-full"
                id="condition"
                value={formData.condition}
                onChange={handleChange}
              >
                <option value="NEW">New</option>
                <option value="USED">Used</option>
              </select>
            </div>
            <div className="rounded-lg border p-3 ">
              <label
                htmlFor="Fueltype"
                className="block text-gray-700 font-bold mb-2"
              >
                FuelType
              </label>
              <select
                className="border p-3 rounded-lg w-full"
                id="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
            <div className="rounded-lg border p-3 ">
              <label
                htmlFor="transmission"
                className="block text-gray-700 font-bold mb-2"
              >
                Transmission
              </label>
              <select
                className="border p-3 rounded-lg w-full"
                id="transmission"
                value={formData.transmission}
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>
                  Select Transmission
                </option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sell"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "sell"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">(ETB / month)</span>
                  )}
                </div>
              </div>
              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="10000000"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Discounted price</p>

                    {formData.type === "rent" && (
                      <span className="text-xs">(ETB / month)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              disabled={loading || uploading}
              className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Creating..." : "Upload listing"}
            </button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
