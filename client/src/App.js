import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';


const App = () => (
  <Switch>
    <Route path='/sign-in' component={LoginPage} />
  </Switch>
)

export default App;