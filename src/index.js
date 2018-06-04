import ReactDOM from "react-dom";
import "./index.css";
import LinkRouter from "./router";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(LinkRouter(), document.getElementById("root"));
registerServiceWorker();
