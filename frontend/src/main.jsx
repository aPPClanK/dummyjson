import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import AppLayout from "./components/AppLayout";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);
