import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UploadPicturePage from './pages/UploadPicturePage';


const App = () => (
  <Switch>
    <Route path='/sign-in' component={LoginPage} />
    <Route path='/sign-up' component={SignUpPage} />
    <Route path='/upload-profile-picture' component={UploadPicturePage} />
  </Switch>
)

export default App;