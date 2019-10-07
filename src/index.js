import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import AppBuilder from "./components/AppBuilder"
import "./styles/index.css"

ReactDOM.render(
  <Router>
      <AppBuilder />
  </Router>
  , document.getElementById("root"))
