import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
  
      const result = await signInWithPopup(auth, provider);
  
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL // Fixed typo: 'phote' to 'photo'
        }),
      });
      const data = await res.json()
      dispatch(signInSuccess(data));
        navigate('/');
    } catch (error) {
      console.log("Could not sign in with Google", error); // Fixed typo: 'witj' to 'with'
    }
  }
  

  

  return (
    <button 
    onClick={handleGoogleClick} 
    type='button' 
    className='w-full py-2 bg-red-700 px-4 rounded-full hover:opacity-75 uppercase text-white font-bold'>
    Continue with Email</button>
  );
}
