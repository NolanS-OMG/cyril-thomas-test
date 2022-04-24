import JobPoster from './JobPoster';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={'/'} element={<div><h1>Post your job</h1><JobPoster/></div>}/>
      </Routes>
    </Router>
  );
}

export default App;
