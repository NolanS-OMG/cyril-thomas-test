import './index.css';

import JobPoster from './JobPoster';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={'/'} element={<div><h1>Post your job</h1><JobPoster/></div>}/>
        <Route path={'/thanks'} element={
          <div>
            <h1>Thanks, you have posted a job</h1>
            <p>Now I can apply for the job and take a technical test.</p>
          </div>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
