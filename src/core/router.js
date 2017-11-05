import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import DataWrapper from '../components/DataWrapper';
import GuildView from '../components/GuildView';
import Navigation from '../components/Navigation';

const Home = () =>
  <div>
    <h2>Welcome to Kroniikkamaatti v3</h2>
  </div>;

const routes = [
  { path: '/',
    guild: 'Kroniikkamaatti',
    component: Home,
  },
  { path: '/asteriski',
    guild: 'Asteriski',
    component: GuildView,
  },
  { path: '/digit',
    guild: 'Digit',
    component: GuildView,
  },
  { path: '/nucleus',
    guild: 'Nucleus',
    component: GuildView,
  }
];

const RouteWrapper = (route) =>
  <Route exact path={route.path} render={ props => {
    return <DataWrapper route={route} {...props} />
  } }/>

const RouterComponent = () => (
  <Router>
    <div className="App">
      <Navigation routes={routes} />
      <div className="App-Content">
      {routes.map((route, i) => (
        <RouteWrapper key={i} {...route}/>
      )) }
      </div>
      <footer className="App-Footer">Made with ♥ by <a href="https://github.com/DigitKoodit">Digitkoodit</a>, 2017</footer>
    </div>
  </Router>
)

export default RouterComponent;