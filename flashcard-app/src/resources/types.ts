export interface IquestionRow {
  id: number;
  deck_id: number; 
  question: string; 
  answer: string; 
}

export interface IDeckRow {
  deck_id: number, 
  name: string  
}

export interface NewQuestion {
  deck_id: number;
  question: string;
  answer: string;
}

export interface updatedQuestion {
  question: string | null;
  answer: string | null;
}

export const Colors = {
  bgBlue: '#bcd7ff',
  bgray: '#b0b8bf', 
  main: '#F38181',
  yellow: '#FCE38A', 
  light: '#EAFFD0', 
  dark: '#95E1D3'

}


/* 
FFBB5C
FF9B50
E25E3E
C63D2F
*/ 
