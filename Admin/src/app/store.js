import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerSlice from "../features/customers/customerSlice";
import brokerSlice from "../features/Brokers/brokerSlice";
import carSlice from "../features/CarListing/CarlistSlice";
import houseSlice from "../features/HouseList/HouselistSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brands/brandSlice";
import pCategoryReducer from "../features/prodCategory/pcategorySlice";
import colorReducer from "../features/color/colorSlice";
import blogReducer from "../features/blogs/blogSlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    brand: brandReducer,
    pCategory: pCategoryReducer,
    color: colorReducer,
    blogs: blogReducer,
    bCategory: bCategoryReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    coupon: couponReducer,
    customer: customerSlice,
    broker: brokerSlice,
    carList: carSlice,
    houseList: houseSlice,
  },
});
