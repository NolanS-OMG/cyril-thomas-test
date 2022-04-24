import JobPoster from './JobPoster';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={'/'} element={<JobPoster/>}/>
      </Routes>
    </Router>
  );
}

export default App;
