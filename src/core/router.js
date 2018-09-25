import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import DataWrapper from '../components/DataWrapper';
import GuildView from '../components/GuildView';
import Navigation from '../components/Navigation';

const Home = () =>
  <div className="Home">
    <h2>Tervetuloa käyttämään Kroniikkamaattia</h2>
    <p>Kronikoiden ideana on esitellä jokainen uusi opiskelija "hauskoilla" kommenteilla kaikille.
Kroniikkamaatin avulla kerätään näitä "hauskoja" kommentteja ja niistä parhaimmat julkaistaan Piltti/fuksikronikoissa Filessä.</p>
    <p>Mietippä siis parhaat palat kavereittesi toilailuista fuksivuodelta ja jaa ne maailmalle.</p>
    <p>Otathan myös huomioon, ettemme julkaise täysin asiattomia kommentteja.</p>
    <p>Terkuin,</p>
    <p><i>Kroniikkamaatin Väki</i></p>
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
      <footer className="App-Footer">Made with ♥ by <a href="https://github.com/DigitKoodit">Digitkoodit</a>, 2017-2018</footer>
    </div>
  </Router>
)

export default RouterComponent;