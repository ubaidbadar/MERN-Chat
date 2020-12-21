import { Route, Switch } from 'react-router-dom';
import ChatRoom from './pages/ChatRoom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { intialUserAction } from './store/actions/auth';

const App = props => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  useEffect(() => {
    dispatch(intialUserAction());
  }, [dispatch]);
  return user === 'initial' ? <div className='__spinner __middle'></div> : (
    !user ? (
      <Switch>
        <Route path='/sign-up' component={SignUpPage} />
        <Route path='/' component={LoginPage} />
      </Switch>
    ) : (
        <Switch>
          <Route path='/chat/:selectedUserId' component={ChatRoom} />
          <Route path='/' component={ChatRoom} />
        </Switch>
      )
  )
}

export default App;