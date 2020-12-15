import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import authWrapper from './authWrapper';
import AuthContext from './context/auth';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UploadPicturePage from './pages/UploadPicturePage';

const App = props => {

  const { user } = props;
  return (
    <AuthContext.Provider value={{ ...props }} >
      <Switch>
        {!user ? (
          <Fragment>
            <Route path='/sign-in' component={LoginPage} />
            <Route path='/sign-up' component={SignUpPage} />
          </Fragment>
        ) : !user.photoURL && <Route path='/upload-profile-picture' component={UploadPicturePage} />}
      </Switch>
    </AuthContext.Provider>
  )
}

export default authWrapper(App);