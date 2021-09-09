import { Tree } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "./context/employee.context";
import { DataNode, DataNodeApi } from "./interfaces/data.interface";

// It's just a simple demo. You can use tree map to optimize update perf.
function updateTreeData(
  list: DataNode[],
  key: React.Key,
  children: DataNode[]
): DataNode[] {
  return list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
}

const initTreeData: DataNode[] = [
  { title: "Expand to load", key: "0", childs: 0 },
];

const convertApiResponse = (response: DataNodeApi[]): DataNode[] => {
  var r: DataNode[] = [];
  for (var i = 0; i < response.length; i++) {
    let newObj: DataNode = {
      id: response[i].id!,
      title: response[i].name!,
      name: response[i].name!,
      position: response[i].position!,
      key: response[i].id!.toString(),
      hired_at: response[i].hired_at,
      salary: response[i].salary,
      childs: response[i].childs,
      isLeaf: response[i].childs ? false : true,
    };
    r.push(newObj);
  }
  return r;
};

const api = async (id: string) => {
  return await axios
    .get<DataNodeApi[]>("http://localhost:3001/" + id)
    .then((response) => {
      return response.data;
    });
};

const EmployeeTree: React.FC<{}> = () => {
  const [treeData, setTreeData] = useState<DataNode[]>(initTreeData);
  const { setEmployee } = useContext(EmployeeContext);

  useEffect(() => {
    api("0").then((response) => {
      // console.log("init resp : ", response);
      setTreeData(convertApiResponse(response));
    });
  }, []);

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    // console.log("selected", info.node);
    let newObj: DataNode = {
      id: info.node.id,
      title: info.node.name,
      name: info.node.name,
      position: info.node.position,
      key: info.node.key,
      hired_at: info.node.hired_at,
      salary: info.node.salary,
      childs: info.node.childs,
    };
    setEmployee(newObj);
  };

  const onLoadData = ({ key, children }: any) =>
    new Promise<void>((resolve) => {
      if (children) {
        resolve();
        return;
      }
      // console.log("key : ", key);
      setTimeout(() => {
        async function myFunction() {
          const resp = await api(key);
          setTreeData((origin) =>
            updateTreeData(origin, key, convertApiResponse(resp))
          );
        }
        myFunction();
        resolve();
      }, 20);
    });

  return <Tree onSelect={onSelect} loadData={onLoadData} treeData={treeData} />;
};

export default EmployeeTree;
