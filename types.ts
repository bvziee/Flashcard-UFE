export interface FlashcardData {
  id: string;
  front: string;
  back: string;
}

export interface FlashcardResponse {
  front: string;
  back: string;
}

export enum ThemeType {
  VISTA = 'VISTA',
  MACOS = 'MACOS',
  NOTEBOOK = 'NOTEBOOK',
  FINANCE = 'FINANCE',
  UFE = 'UFE'
}

export interface CardTheme {
  type: ThemeType;
  name: string;
  frontBg?: string;
  backBg?: string;
  textColor?: string;
}