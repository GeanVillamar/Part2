import ReactDOM from "react-dom/client";
import App from "./App";

const persons = [
  {
    id: 1,
    name: "Arturo Rodriguez",
    important: true,
  },
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <App persons={persons} />
);
