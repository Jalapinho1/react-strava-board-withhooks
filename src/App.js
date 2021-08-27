import './App.css';

import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import ProfilePage from './pages/ProfilePage';
import ActivitiesPage from './pages/ActivitiesPage';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import StravaRedirectPage from './pages/StravaRedirectPage';
import { AuthContext } from './store/auth-context';
import ActivityDetails from './components/Activity/ActivityDetails/ActivityDetails';

function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>
      <Switch>
        {!isLoggedIn &&
          <Route path='/login'>
            <LoginPage></LoginPage>
          </Route>
        }
        {isLoggedIn &&
          <Route path='/profile'>
            <ProfilePage></ProfilePage>
          </Route>
        }
        {isLoggedIn &&
          <Route path='/activities' exact>
            <ActivitiesPage></ActivitiesPage>
          </Route>
        }
        {isLoggedIn &&
          <Route path='/activities/:id'>
            <ActivityDetails></ActivityDetails>
          </Route>
        }
        <Route path="/redirect">
          <StravaRedirectPage></StravaRedirectPage>
        </Route>
        <Route path='/profile'>
          {isLoggedIn && <ProfilePage></ProfilePage>}
          {!isLoggedIn && <Redirect to='/login'></Redirect>}
        </Route>
        <Route path='*'>
          <Redirect to='/profile'></Redirect>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
