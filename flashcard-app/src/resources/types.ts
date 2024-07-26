export interface IquestionRow {
  id: number;
  deck_id: number; 
  question: string; 
  answer: string; 
}

export interface NewQuestion {
  deck_id: string;
  question: string;
  answer: string;
}

export const Colors = {
  bgBlue: '#bcd7ff',
  bgray: '#b0b8bf', 

}
