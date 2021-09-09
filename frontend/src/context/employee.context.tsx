import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { DataNode } from "../interfaces/data.interface";

interface IEmployeeContext {
  employee: DataNode;
  setEmployee: Dispatch<SetStateAction<DataNode>>;
}

export const EmployeeContext = createContext<IEmployeeContext>(
  {} as IEmployeeContext
);

export const EmployeeContextProvider: React.FC = ({ children }) => {
  const [employee, setEmployee] = useState<DataNode>({} as DataNode);

  return (
    <EmployeeContext.Provider value={{ employee, setEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
