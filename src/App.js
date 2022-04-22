import React from 'react';
import {LoginPage, Dashboard, PlaylistPage, getParamValues} from './components';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveToken, saveHash } from "./redux/action";

function App() {
  let isLogin = false;
  const response = getParamValues(window.location.hash);
  const getToken = response.access_token;
  const dispatch = useDispatch();
  dispatch(saveToken(getToken));

    if (getToken){
      isLogin=true;
    }

  const PrivateRoute = ({ children }) => {
    return isLogin ? children : <Navigate to="/" />;
  }
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<PrivateRoute>
                                              <Dashboard token={getToken}/>
                                            </PrivateRoute>} />
          <Route path="/create-playlist" element={<PrivateRoute>
                                              <PlaylistPage/>
                                            </PrivateRoute>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
