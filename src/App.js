import React from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import AddProducts from "./pages/AddProducts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllProducts from "./components/AllProducts";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import YourCartPage from "./pages/YourCartPage";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/"><Homepage /></Route>
          <Route path="/add-products"><AddProducts /></Route>
          <Route path="/produs-getAll"><AllProducts /></Route>
          <Route path="/your-cart"><YourCartPage /></Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
