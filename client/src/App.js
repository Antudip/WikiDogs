import './App.css';
import NavBar from './components/navBar/NavBar';
import Breeds from './components/breeds/BreedsContainer';
import CreationForm from './components/creationForm/CreationForm';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';


function App() {
  return (

    <div className="App">

      <Switch>
        <Route path='/creationForm' exact>
          <CreationForm></CreationForm>
        </Route>
        <Route path='/home' exact>
          <NavBar></NavBar>
          <Breeds></Breeds>
        </Route>
        <Route path='/'>
          <LandingPage></LandingPage>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
