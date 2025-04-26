import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-100">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* <Navbar /> */}
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
