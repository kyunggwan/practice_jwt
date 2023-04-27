
import SideMenu from "./SideMenu";
import Content1 from "./Content";
import "./index.css";


function MainLayout() {


  return (
    <>
      <div className="mainForm" style={{ display: "flex", flexDirection: "row" }}>
        <SideMenu />
        <Content1 />
        <br />

      </div>
    </>
  );
}

export default MainLayout;
