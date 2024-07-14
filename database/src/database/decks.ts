/* 
    code taken from user Covalence on Youtube*/ 

    import type { RowDataPacket } from 'mysql2';
    import { ModifyQuery, SelectQuery } from './queryUtils';
    
    
    export interface IdeckRow extends RowDataPacket {
        id: number;
        name: string; 
    }
    
    export function getAllDecks(){
        return SelectQuery<IdeckRow>('SELECT * FROM decks;'); 
    }
    
    export function getAllOne(id: string){
        const queryString = 'SELECT * FROM decks WHERE id = ?;'; 
        return SelectQuery<IdeckRow>(queryString, [id]); 
    }
    
    export function insert(newDeck: {id: string, name: string}){
        const queryString = 'INSERT INTO decks SET ?;'; 
        return ModifyQuery(queryString, [newDeck]); 
    }
    
    export function update(updatedDecks: {name: string}, id:number){
        const queryString = 'UPDATE decks SET ? WHERE id = ?'; 
        return ModifyQuery(queryString, [updatedDecks, id]); 
    }
    
    export function destroy(id: number){
        const queryString = 'DELETE FROM decks WHERE id = ?'; 
        return ModifyQuery(queryString, [id]); 
    }