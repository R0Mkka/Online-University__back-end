export interface IConnectionConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  charset?: string;
  timezone?: string;
}

export type IQueryCallback<T> = (
  error?: Error,
  data?: T,
  metadata?: any,
) => void;

export type Query = <T>(
  queryString: string,
  paramsOrCallback: any[] | IQueryCallback<T>,
  callback?: IQueryCallback<T>,
) => void;

export interface IConnection {
  query: Query;
}
