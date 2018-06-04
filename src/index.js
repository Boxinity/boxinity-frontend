import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import LinkRouter from "./router";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(LinkRouter(), document.getElementById("root"));
registerServiceWorker();
