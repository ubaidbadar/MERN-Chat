import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';


const App = () => (
  <Switch>
    <Route path='/sign-in' component={LoginPage} />
    <Route path='/sign-up' component={SignUpPage} />
  </Switch>
)

export default App;