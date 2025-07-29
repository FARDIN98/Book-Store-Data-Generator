export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  likes: number;
  reviews: Review[];
  coverImage?: string;
}

export interface Review {
  id: number;
  reviewer: string;
  text: string;
  rating: number;
  date: string;
}

export interface Language {
  code: 'en-US' | 'de-DE' | 'ja-JP' | 'fr-FR';
  name: string;
  region: string;
  flag: string;
}

export interface GeneratorConfig {
  language: 'en-US' | 'de-DE' | 'ja-JP' | 'fr-FR';
  seed: string | number;
  averageLikes: number;
  averageReviews: number;
}

export interface BookGeneratorParams extends GeneratorConfig {
  startIndex?: number;
  count?: number;
}

export type LanguageCode = 'en-US' | 'de-DE' | 'ja-JP' | 'fr-FR';