import { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
            <Redirect from='' to='/sign-in' />
          </Fragment>
        ) : !user.photoURL ? (
          <Fragment>
            <Route path='/upload-profile-picture' component={UploadPicturePage} />
            <Redirect from='' to='/upload-profile-picture' />
          </Fragment>
        ) : (
              <Fragment>
                <Route path='/chat/:userId' render={() => <div>Chat App</div>} />
                <Route path='/chat' render={() => <div>Chat App</div>} />
                <Redirect from='' to='/upload-profile-picture' />
              </Fragment>
            )}
      </Switch>
    </AuthContext.Provider>
  )
}

export default authWrapper(App);