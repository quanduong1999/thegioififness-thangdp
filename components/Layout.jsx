import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
  return (
    <div>
      <div className="header-layout">
        <Header />
      </div>
      <div className="body-layout">{props.children}</div>
      <div className="footer-layout">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
