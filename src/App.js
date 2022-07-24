import Navbar from './Navbar';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Blogs from './Blogs';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <div className="bgr_app">
        <div className="bgr_navbar">
          <Navbar />
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
