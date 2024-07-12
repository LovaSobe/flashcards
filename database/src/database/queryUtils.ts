/* 
  code taken from user Covalence on Youtube
*/ 

import pool from './connection'; 
import type { ResultSetHeader } from 'mysql2/promise';


//select
export async function SelectQuery<T>(queryString: string, params?: any[]): Promise<Partial<T[]>> {
    const [results] = await pool.execute(queryString, params); 
    return results as T[]; 
  }
  
  //insert/update/delete
 export async function ModifyQuery(queryString: string, params?: any[]): Promise<ResultSetHeader> {
    const [results] = await pool.query(queryString, params); 
    return results as ResultSetHeader;   
  }

