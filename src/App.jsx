import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import Home from './components/Home';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <div onClick={() => window.location = "/"} className='header'>
        <h1 className='headerText'>Skvost-post</h1>
      </div>
      <div className='content'>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
