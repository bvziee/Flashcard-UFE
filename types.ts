
export interface FlashcardData {
  id: string;
  front: string;
  back: string;
  category?: string;
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
  UFE = 'UFE',
  CYBERPUNK = 'CYBERPUNK',
  BLUEPRINT = 'BLUEPRINT',
  RETRO = 'RETRO',
  SWISS = 'SWISS',
  GAMER = 'GAMER',
  BRUTALIST = 'BRUTALIST'
}

export type Orientation = 'PORTRAIT' | 'LANDSCAPE';

export interface CardTheme {
  type: ThemeType;
  name: string;
  orientation: Orientation;
  // Custom Style Overrides
  fontFamily?: string;
  fontSizeScale?: number; // 1 = default
  textOffsetX?: number; // pixels
  textOffsetY?: number; // pixels
  customTextColor?: string;
  customBorderColor?: string;
  frontBg?: string;
  backBg?: string;
}
