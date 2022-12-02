import React, { useContext } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import Error from "./components/Error";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import MovieDetails from "./Pages/MovieDetails";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";

function App() {
  return (
    <MovieProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/dashboard"
            element={
              <div>
                <Dashboard></Dashboard>
                <Header />
                <MovieList></MovieList>
              </div>
            }
          />

          <Route
            path="/movie/:movieID"
            element={<MovieDetails></MovieDetails>}
          ></Route>
          <Route path="/movie/:movieID/*" element={<Error />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/*" element={<Error />}></Route>
        </Routes>
      </Router>
    </MovieProvider>
  );
}

export default App;
