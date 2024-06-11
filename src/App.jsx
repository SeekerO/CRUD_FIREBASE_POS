import Mainlayout from "./layout/main/Mainlayout";
import Sidebar from "./layout/sidebar/Sidebar";

function App() {
  return (
    <div className="w-screen h-screen bg-slate-100 flex overflow-hidden">
      <Sidebar />
      <Mainlayout />
    </div>
  );
}

export default App;
