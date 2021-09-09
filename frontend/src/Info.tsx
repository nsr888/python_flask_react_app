import { Descriptions } from "antd";
import React, { useContext } from "react";
import { EmployeeContext } from "./context/employee.context";

const Info: React.FC<{}> = () => {
  const { employee } = useContext(EmployeeContext);
  return (
    <>
      {employee.name && (
        <Descriptions title="Информация о сотруднике" bordered column={2}>
          <Descriptions.Item label="ФИО" span={2}>
            {employee.name}
          </Descriptions.Item>
          <Descriptions.Item label="Должность" span={2}>
            {employee.position}
          </Descriptions.Item>
          <Descriptions.Item label="Дата приема на работу" span={2}>
            {employee.hired_at}
          </Descriptions.Item>
          <Descriptions.Item label="Размер заработной платы" span={2}>
            {employee.salary} руб.
          </Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
};

export default Info;
