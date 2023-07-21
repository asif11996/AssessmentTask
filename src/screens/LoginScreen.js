import {useState} from 'react';
import {useDispatch} from 'react-redux';
import AuthContent from '../components/Auth/AuthContent';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import {loginUser} from '../redux/actions';
import {signUp, signIn} from '../util/auth';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  async function signinHander({email, password}) {
    console.log('email and password is .........>', email, password);

    // let userData = new FormData();
    // userData.append('email', email);
    // userData.append('password', password);
    // userData.append('returnSecureToken', true);
    setIsAuthenticating(true);

    try {
      await dispatch(loginUser(email, password));
    } catch (err) {
      console.log('error', err.message);
      // setError(err.message);
      // setIsLoading(false);
    }

    // setIsAuthenticating(true);
    // await signIn(email, password);
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user ..... " />;
  }
  return <AuthContent isLogin onAuthenticate={signinHander} />;
}

export default LoginScreen;
