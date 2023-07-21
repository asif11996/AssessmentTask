import {useState} from 'react';
import {useDispatch} from 'react-redux';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {loginUser, signupUser} from '../redux/actions';

// import AuthContent from '../components/Auth/AuthContent';\

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  async function signupHander({email, password}) {
    console.log('email and password is .........>', email, password);

    // let userData = new FormData();
    // userData.append("email", email);
    // userData.append("password", password);
    setIsAuthenticating(true);

    try {
      await dispatch(signupUser(email, password));
    } catch (err) {
      console.log('error', err.message);
      // setError(err.message);
      // setIsLoading(false);
    }

    // await signUp(email, password);
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user ..... " />;
  }
  return <AuthContent onAuthenticate={signupHander} />;
}

export default SignupScreen;
