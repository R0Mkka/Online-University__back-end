import * as dotenv from 'dotenv';

import { MySql } from './mysql';
import { IConnectionConfig, IConnection, IQueryCallback } from '@models/database.models';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const connectionConfig: IConnectionConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export class Database {
  private static instance: Database;

  private connection: IConnection;

  private constructor() {
    this.connection = MySql.createConnection(connectionConfig);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public query<T>(...args): void {
    if (args.length === 2) {
      this.queryWithoutParams<T>(args[0], args[1]);

      return;
    }

    this.parameterizedQuery<T>(args[0], args[1], args[2]);
  }

  private queryWithoutParams<T>(queryString: string, callback: IQueryCallback<T>): void {
    this.connection.query<T>(queryString, callback);
  }

  private parameterizedQuery<T>(queryString: string, params: any[], callback: IQueryCallback<T>): void {
    this.connection.query<T>(queryString, params, callback);
  }
}
