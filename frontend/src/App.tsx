import { PageHeader } from "antd";
import React from "react";
import "./App.css";
import { EmployeeContextProvider } from "./context/employee.context";
import Info from "./Info";
import EmployeeTree from "./Tree";

function App() {
  return (
    <EmployeeContextProvider>
      <PageHeader
        ghost={false}
        className="site-page-header"
        title="База данных сотрудников"
      />
      <div className="App">
        <div className="content">
          <div className="left">
            <EmployeeTree />
          </div>
          <div className="info">
            <Info />
          </div>
        </div>
      </div>
    </EmployeeContextProvider>
  );
}

export default App;
