// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// //import success from "../../images/success.png";
// import styles from "../EmailVerify/styles.module.css";
// // import { Fragment } from "react/cjs/react.production.min";

// const EmailVerify = () => {
//   const [validUrl, setValidUrl] = useState(true);
//   const param = useParams();

//   useEffect(() => {
//     const verifyEmailUrl = async () => {
//       try {
//         const url = `http://localhost:3000/api/broker/${param.id}/verify/${param.token}`;
//         const { data } = await axios.get(url);
//         console.log(data);
//         setValidUrl(true);
//       } catch (error) {
//         console.log(error);
//         setValidUrl(false);
//       }
//     };
//     verifyEmailUrl();
//   }, [param]);

//   return (
//     <Fragment>
//       {validUrl ? (
//         <div className={styles.container}>
//           <img src={success} alt="success_img" className="" />
//           <h1>Email verified successfully</h1>
//           <Link to="/Sign-In">
//             <button className={styles.green_btn}>Login</button>
//           </Link>
//         </div>
//       ) : (
//         <h1>404 Not Found</h1>
//       )}
//     </Fragment>
//   );
// };

// export default EmailVerify;
