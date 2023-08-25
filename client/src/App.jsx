import { RouterProvider } from "react-router-dom";
import { router } from "./config/routerConfig";

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;