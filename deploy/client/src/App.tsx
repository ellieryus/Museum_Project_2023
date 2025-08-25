import "./Style/App.scss";
import "./Style/_globalStyle.scss";

import React, { useState, useRef, useEffect, LegacyRef } from "react";
import axios from "axios";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import LoginPage from "./pages/Authen/LoginPage";
import SignUpPage from "./pages/Authen/SignUpPage";
import About from "./pages/LandingPage/About";
import Visit from "./pages/LandingPage/Visit";
import Shop from "./pages/LandingPage/Shop";

import Profile from "./pages/Profile/Profile";
import HomeUser from "./pages/HomeUser/HomeUser";
import HomeEmployee from "./pages/HomeEmployee/HomeEmployee";
import Gallery from "./pages/Gallery/Gallery";
import Artwork from "./pages/Artwork/Artwork";
import Booking from "./pages/Booking/Booking";
import Shopping from "./pages/Shopping/Shopping";
import ViewDatabaseRoot from "./pages/ViewDatabase/ViewDatabaseRoot";
import ViewDatabaseChild from "./pages/ViewDatabase/ViewDatabaseChild";
import CheckInOut from "./pages/CheckInOut/CheckInOut";
import ModifyDatabaseRoot from "./pages/ModifyDatabase/ModifyDatabaseRoot";
import ModifyDatabaseChild from "./pages/ModifyDatabase/ModifyDatabaseChild";
import ShoppingCart from "./pages/Shopping/Cart/ShoppingCart";
import Inventory from "./pages/Inventory/Inventory";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Review from "./pages/Review/Review";

//import Login from "./pages/_test/Login/Login";
import DECRYPT from "./utils/decrypt";
import Swagger from "./pages/Swagger/Swagger";
import authHeader from "./utils/authHeader";
import { host } from "./config/host";

function App() {
  // auto check existing token
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      axios
        .get("http://" + host + "/default/check-login", {
          headers: authHeader(),
        })
        .then((res) => {
          var response = DECRYPT(res.data);
          console.log(response.message);

          if (response.errorMessage) {
            localStorage.removeItem("userData");
          } else {
            const token: string = JSON.parse(
              localStorage.getItem("userData")!
            ).Token;

            localStorage.setItem(
              "userData",
              JSON.stringify({
                UID: Object.values(response.info[0])[0],
                Role: Object.values(response.info[0])[1],
                Token: token,
              })
            );
          }
        });
    }
  }, []);
  return (
    <div className="App">
      <Router>
        {/* {authContext.page == 0 ? ( */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="landing-page">
                <Home />
                <About />
                <Visit />
                <Shop />
                <Review />
              </div>
            }
          />
          <Route
            path="/customer"
            element={
              <div className="landing-page">
                <HomeUser />
                <About />
                <Visit />
                <Shop />
                <Review />
              </div>
            }
          />
          <Route path="/customer/profile/:uid" element={<Profile />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/artwork/:artID" element={<Artwork />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/shopping/Cart" element={<ShoppingCart />} />

          {/* Employee Interface */}

          <Route path="/employee" element={<HomeEmployee />}></Route>

          <Route
            path="/employee/view-database"
            element={<ViewDatabaseRoot />}
          />
          <Route
            path="/employee/view-database/:tableName"
            element={<ViewDatabaseChild />}
          />

          <Route path="/employee/check-in-out" element={<CheckInOut />} />
          <Route path="/employee/inventory" element={<Inventory />} />
          <Route
            path="/employee/modify-database"
            element={<ModifyDatabaseRoot />}
          />
          <Route
            path="/employee/modify-database/:tableName"
            element={<ModifyDatabaseChild />}
          />

          {/* testing */}
          {/* <Route path="/test" element={<Login />} /> */}

          {/* documenting */}
          <Route path="/api-docs" element={<Swagger />} />

          {/* Page not found */}
          <Route path="/404" element={<PageNotFound />} />

          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
