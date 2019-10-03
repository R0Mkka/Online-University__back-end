import { Database } from '../database';

const db = Database.getInstance();

export function getItemBySingleParam<T>(param: any, queryString: string): Promise<T> {
  return new Promise((resolve) => {
    db.query<T>(
      queryString,
      [param],
      (error, items: T[]) => {
        if (error || items.length === 0) {
          resolve(null);
        }

        resolve(items[0]);
      });
  });
}
