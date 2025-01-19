
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Planning from './pages/Planning';
import Register from './pages/Register';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/planning" element={<Planning />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
