// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useState } from "react";

// export default function Header() {
//   const { currentUser } = useSelector((state) => state.user);
//   const { currentBroker } = useSelector((state) => state.broker);

//   // State to manage dropdown menu visibility
//   const [isOpen, setIsOpen] = useState(false);

//   // Function to toggle dropdown menu visibility
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <header className="bg-slate-300 shadow-md">
//       <div className="flex justify-between items-center max-w-6xl mx-auto py-4 px-4">
//         {" "}
//         {/* Added py-4 px-4 for padding */}
//         <Link to="/">
//           <h1 className="font-bold text-sm sm:text-xl flex-wrap">
//             <span className="text-slate-950 hover:text-red-900">
//               IBS BROKER
//             </span>
//           </h1>
//         </Link>
//         <form className="bg-slate-100 p-3 rounded-lg flex items-center">
//           <input
//             type="text"
//             placeholder="what you are looking..."
//             className="bg-transparent focus:outline-none w-24 sm:w-64"
//           />
//           <FaSearch className="text-slate-950" />
//         </form>
//         <ul className="hidden sm:flex gap-4">
//           {" "}
//           {/* Hide list on small screens */}
//           <Link to="/">
//             <li
//               className="py-1 text-slate-950 hover:text-red-600 font-medium text-sm 
//             transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-210 duration-300"
//             >
//               HOME
//             </li>
//           </Link>
//           <Link to="/About">
//             <li
//               className="py-1 text-slate-950 hover:text-red-600 font-medium text-sm
//             transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-210 duration-300"
//             >
//               ABOUT
//             </li>
//           </Link>
//           <Link to="/Store">
//             <li
//               className="py-1 text-slate-950 hover:text-red-600 font-medium text-sm 
//             transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-210 duration-300"
//             >
//               STORE
//             </li>
//           </Link>
//           <Link to="/Blog">
//             <li
//               className="py-1 text-slate-950 hover:text-red-600 font-medium text-sm
//             transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-210 duration-300"
//             >
//               BLOG
//             </li>
//           </Link>
//           <Link to="/Contact">
//             <li
//               className="py-1 text-slate-950 hover:text-red-600 font-medium text-sm 
//             transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-210 duration-300"
//             >
//               CONTACT
//             </li>
//           </Link>
//           <Link to={currentBroker || currentUser ? "/BProfile" : "/Profile"}>
//             {currentBroker || currentUser ? (
//               <img
//                 className="rounded-full h-7 w-7 object-cover"
//                 src={currentUser?.avatar || currentBroker?.avatar}
//                 alt="profile"
//               />
//             ) : (
//               <li className="text-slate-700 ease-in-out delay-150 hover:-translate-y-1 hover:scale-210 duration-300 hover:text-red-600 uppercase font-medium">
//                 Sign in
//               </li>
//             )}
//           </Link>
//           <button
//             onClick={toggleDropdown}
//             className="py-1 text-slate-950 hover:text-red-600 font-medium text-sm 
//           transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-210 duration-300 uppercase"
//           >
//             Account
//           </button>
//           {isOpen && (
//             <ul
//               className="absolute ml-96 mt-8 w-30 bg-slate-300 border
//           rounded-lg shadow-lg z-10"
//             >
//               <li
//                 className="py-2 px-3 text-sm text-gray-700 hover:text-red-600 
//           ease-in-out delay-150 hover:-translate-y-1 hover:scale-210 duration-300 font-medium"
//               >
//                 <Link to="/Sign-up">Broker Sign Up</Link>
//               </li>
//               <li
//                 className="py-2 px-3 text-sm text-gray-700 hover:text-red-600 
//           ease-in-out delay-150 hover:-translate-y-1 hover:scale-210 duration-300 font-medium"
//               >
//                 <Link to="/User-Sign-up">User Sign Up</Link>
//               </li>
//               <li
//                 className="py-2 px-3 text-sm text-gray-700 hover:text-red-600 
//           ease-in-out delay-150 hover:-translate-y-1 hover:scale-210 duration-300  font-medium"
//               >
//                 <Link to="/admin">Admin</Link>
//               </li>
//             </ul>
//           )}
//         </ul>
//       </div>
//     </header>
//   );
// }

// {
//   /*   import { FaSearch } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';


// export default function Header() {
  
//   const { currentUser } = useSelector((state) => state.user);
//   const { currentBroker } = useSelector((state) => state.user);
  

//   return (
//     <header className="bg-slate-300 shadow-md">
//       <div className="flex justify-between items-center max-w-6xl mx-auto py-4 px-4">
//         <Link to="/">
//           <h1 className="font-bold text-sm sm:text-xl flex-wrap">
//             <span className="text-slate-950 hover:text-red-900">IBS BROKER</span>
//           </h1>
//         </Link>

        
//         <form className="bg-slate-100 p-3 rounded-lg flex items-center">
//           <input
//             type="text"
//             placeholder="What you are looking for..."
//             className="bg-transparent focus:outline-none w-24 sm:w-64"
//           />
//           <FaSearch className="text-slate-950" />
//         </form>

       
//         <ul className="hidden sm:flex gap-4">
         
//         </ul>

//         <Link to={currentBroker ? '/BProfile' : '/Profile'}>
//           {currentUser || currentBroker ? (
//             <img
//               className='rounded-full h-7 w-7 object-cover'
//               src={currentUser?.avatar || currentBroker?.avatar}
//               alt='profile'
//             />
//           ) : (
//             <li className=' text-slate-700 hover:underline'> Sign in</li>
//           )}
//         </Link>
//       </div>
//     </header>
//   );
// }

          
//           */
// }
