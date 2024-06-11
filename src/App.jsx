import Mainlayout from "./layout/main/Mainlayout";
import Sidebar from "./layout/sidebar/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { isMobile } from "react-device-detect";
function App() {
  return (
    <div className="w-screen h-screen bg-slate-100 flex overflow-hidden">
      <Sidebar isMobile={isMobile} />

      <Mainlayout isMobile={isMobile} />
      <ToastContainer />
    </div>
  );
}

export default App;
