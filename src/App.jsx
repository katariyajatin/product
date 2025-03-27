import logo from './logo.svg';
import './App.css';
import Product from './Product';
import Header from './Pages/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';


function App() {
  return (
    <div className="App">
      {/* <Product/> */}
      <Header/>
      <Home/>

    </div>
  );
}

export default App;
