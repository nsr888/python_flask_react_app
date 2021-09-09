export interface DataNodeApi {
  id?: number;
  name?: string;
  position?: string;
  chief?: number;
  hired_at?: Date;
  salary?: number;
  childs: number;
}

export interface DataNode extends DataNodeApi {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}
