/* 
    code taken from user Covalence on Youtube*/ 

import type { RowDataPacket } from 'mysql2';
import { ModifyQuery, SelectQuery } from './queryUtils';


export interface IquestionRow extends RowDataPacket {
    id: number;
    deck_id: number; 
    question: string; 
    answer: string; 
}

export function getAllQuestions(){
    return SelectQuery<IquestionRow>('SELECT * FROM questions;'); 
}

export function getAllOne(id: string){
    const queryString = 'SELECT * FROM questions WHERE id = ?;'; 
    return SelectQuery<IquestionRow>(queryString, [id]); 
}

export function insert(newQuestion: {deck_id: string, question: string, answer: string}){
    const queryString = 'INSERT INTO questions SET ?;'; 
    return ModifyQuery(queryString, [newQuestion]); 
}

export function update(updatedQuestion: {question?: string, answer?: string}, id:number){
    const queryString = 'UPDATE questions SET ? WHERE id = ?'; 
    return ModifyQuery(queryString, [updatedQuestion, id]); 
}

export function destroy(id: number){
    const queryString = 'DELETE FROM questions WHERE id = ?;';
    console.log('Executing query:', queryString, 'with params:', [id]); 
    return ModifyQuery(queryString, [id]); 
}