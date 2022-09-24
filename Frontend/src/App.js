import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Browse from './pages/Browse';
import CreateProject from './pages/CreateProject';
import Myprojects from './pages/Myprojects';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";


function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element = {<Homepage/>}/>
          <Route path="/browse" element = {<Browse/>}/>
          <Route path="/myprojects" element = {<Myprojects/>}/>
          <Route path="/createproject" element = { <CreateProject/> }/>
        </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;