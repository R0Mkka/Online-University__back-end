export interface ISqlSuccessResponce {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}

export interface ISqlErrorResponce {
  code: string;
  errno: number;
  sqlState: string;
  sqlMessage: string;
}

export type SqlResponce = ISqlSuccessResponce | ISqlErrorResponce;

export interface IErrorResponce {
  statusCode: number;
  message: string;
}
