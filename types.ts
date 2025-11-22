export interface FlashcardData {
  id: string;
  front: string;
  back: string;
}

export interface FlashcardResponse {
  front: string;
  back: string;
}

export enum AppMode {
  EDITOR = 'EDITOR',
  THEME = 'THEME'
}

export interface CardTheme {
  frontBg: string;
  backBg: string;
  textColor: string;
  headerFront: string;
  headerBack: string;
}