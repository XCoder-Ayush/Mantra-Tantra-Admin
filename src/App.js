import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopUsersPage from './pages/TopUsers/TopUsers';
import AllUsers from './pages/AllUsers/AllUsers';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllUsers />}></Route>
        <Route path="/topusers" element={<TopUsersPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
