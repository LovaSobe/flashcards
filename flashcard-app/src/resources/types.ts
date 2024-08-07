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

export interface NewDeck {
  name: string; 
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

export const headingFont = {
  headingOrange: 'font-family: Concert One, sans-serif; font-weight: 400; font-style: normal; color: #FE7A36',
  headingLink: 'font-family: Concert One, sans-serif; font-weight: 400; font-style: normal; color: #FE7A36',
  secondaryColor: 'font-family: Concert One, sans-serif; font-weight: 400; font-style: normal; color: #3652AD',
  bigMargins: 'margin-top: 20vh; margin-bottom:20vh;',
  buttonStyling: 'border: none; background-color: #FE7A36; font-family: Bebas Neue, sans-serif; font-weight:400, font-style: normal;',
  secondaryButton: 'border: medium solid #3652AD; color: #3652AD; background-color: white; font-family: Bebas Neue, sans-serif; font-weight:400, font-style: normal;'
} 

// font-family: Bebas Neue, sans-serif; font-weight: 400;'
/* 
FFBB5C
FF9B50
E25E3E
C63D2F
*/ 
