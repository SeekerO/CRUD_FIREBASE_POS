import Mainlayout from "./layout/main/Mainlayout";
import Sidebar from "./layout/sidebar/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="w-screen h-screen bg-slate-100 flex overflow-hidden">
      <Sidebar />

      <Mainlayout />
      <ToastContainer />
    </div>
  );
}

export default App;
