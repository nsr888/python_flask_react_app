import { PageHeader } from "antd";
import "./App.css";
import Info from "./components/Info/Info";
import EmployeeTree from "./components/EmployeeTree/EmployeeTree";
import { EmployeeContextProvider } from "./context/employee.context";

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
