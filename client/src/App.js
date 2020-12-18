import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import authWrapper from './authWrapper';
import AuthContext from './context/auth';
import ChatRoom from './pages/ChatRoom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const App = props => {
  const { user } = props;
  return (
    <AuthContext.Provider value={{ ...props }} >
      {!user ? (
        <Switch>
          <Route path='/sign-up' component={SignUpPage} />
          <Route path='/' component={LoginPage} />
        </Switch>
      ) : (
          <Switch>
            <Route path='/chat/:selectedUserId' component={ChatRoom} />
            <Route path='/' component={ChatRoom} />
          </Switch>
        )}
    </AuthContext.Provider>
  )
}

export default authWrapper(App);