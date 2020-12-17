import { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import authWrapper from './authWrapper';
import AuthContext from './context/auth';
import ChatRoom from './pages/ChatRoom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

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
        ) : (
            <Fragment>
              <Route path='/chat/:userId' component={ChatRoom} />
              <Route exact path='/chat' component={ChatRoom} />
              <Redirect from='' to='/chat' />
            </Fragment>
          )}
      </Switch>
    </AuthContext.Provider>
  )
}

export default authWrapper(App);