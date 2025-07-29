import seedrandom from 'seedrandom';
import type { Book, BookGeneratorParams, Review, LanguageCode } from '../types';
import { BOOK_DATA } from '../data/languages';

export class BookGenerator {
  private rng: () => number;
  private config: BookGeneratorParams;

  constructor(config?: BookGeneratorParams) {
    this.config = config || {
      language: 'en-US',
      seed: 'default',
      averageLikes: 5,
      averageReviews: 3
    };
    this.rng = seedrandom(this.config.seed.toString());
  }

  generateBooks(params: {
    language: string;
    seed: string;
    averageLikes: number;
    averageReviews: number;
    page: number;
    booksPerPage: number;
  }): Book[] {
    const books: Book[] = [];
    const start = (params.page - 1) * 20 + 1;
    
    for (let i = 0; i < params.booksPerPage; i++) {
      const bookId = start + i;
      const bookSeed = params.seed + params.language + bookId.toString();
      const bookConfig: BookGeneratorParams = {
        language: params.language as LanguageCode,
        seed: bookSeed,
        averageLikes: params.averageLikes,
        averageReviews: params.averageReviews
      };
      
      const gen = new BookGenerator(bookConfig);
      const book = gen.generateBook(bookId);
      books.push(book);
    }
    
    return books;
  }

  private pickRandom<T>(items: T[]): T {
    return items[Math.floor(this.rng() * items.length)];
  }

  private makeISBN(): string {
    const prefix = '978';
    const group = this.rng() < 0.5 ? '0' : '1';
    const pub = Math.floor(this.rng() * 900000 + 100000).toString();
    const title = Math.floor(this.rng() * 900 + 100).toString();
    
    const digits = (prefix + group + pub + title).split('').map(Number);
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      sum += digits[i] * (i % 2 === 0 ? 1 : 3);
    }
    const check = (10 - (sum % 10)) % 10;
    
    return `${prefix}-${group}-${pub.slice(0, 2)}-${pub.slice(2)}-${title}-${check}`;
  }

  private makeReviews(): Review[] {
    const data = BOOK_DATA[this.config.language];
    const reviews: Review[] = [];

    
    const reviewsSeed = hashString(this.config.seed + '_reviews');
    const reviewsRng = seedrandom(reviewsSeed);
    for (let i = 0; i < 20; i++) {
      reviewsRng();
    }

    const count = Math.floor(this.config.averageReviews);
    const fraction = this.config.averageReviews - count;
    
    let actualCount = count;
    
    if (fraction > 0 && reviewsRng() < fraction) {
      actualCount += 1;
    }

    const pickRandomForReview = <T>(items: T[]): T => {
        return items[Math.floor(reviewsRng() * items.length)];
    };

    const makeDateForReview = (): string => {
        const start = new Date(2020, 0, 1);
        const end = new Date();
        const time = start.getTime() + reviewsRng() * (end.getTime() - start.getTime());
        return new Date(time).toLocaleDateString(this.config.language);
    }

    for (let i = 0; i < actualCount; i++) {
      const first = pickRandomForReview(data.firstNames);
      const last = pickRandomForReview(data.lastNames);
      const text = pickRandomForReview(data.reviewTexts);
      
      reviews.push({
        id: i + 1,
        reviewer: `${first} ${last}`,
        rating: Math.floor(reviewsRng() * 5) + 1,
        text: text,
        date: makeDateForReview()
      });
    }

    return reviews;
  }

  private makeDate(): string {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const time = start.getTime() + this.rng() * (end.getTime() - start.getTime());
    return new Date(time).toLocaleDateString(this.config.language);
  }

  private makeLikes(): number {
    
    const likesSeed = hashString(this.config.seed + '_likes');
    const likesRng = seedrandom(likesSeed);
    for (let i = 0; i < 20; i++) {
      likesRng();
    }

    const base = Math.floor(this.config.averageLikes);
    const fraction = this.config.averageLikes - base;
    
    let likes = base;
    if (likesRng() < fraction) {
      likes += 1;
    }
    
    return likes;
  }



  private makeYear(): number {
    const now = new Date().getFullYear();
    const start = now - 50;
    return Math.floor(this.rng() * (now - start + 1)) + start;
  }

  generateBook(id: number): Book {
    const data = BOOK_DATA[this.config.language];
    
    const title = this.pickRandom(data.titles);
    const first = this.pickRandom(data.firstNames);
    const last = this.pickRandom(data.lastNames);
    const pub = this.pickRandom(data.publishers);
    
    
    const likes = this.makeLikes();
    const reviews = this.makeReviews();
    
    return {
      id,
      isbn: this.makeISBN(),
      title,
      author: `${first} ${last}`,
      publisher: pub,
      year: this.makeYear(),
      likes,
      reviews
    };
  }
}

export const generateBooks = (config: BookGeneratorParams, count: number = 50, start: number = 1): Book[] => {
  const books: Book[] = [];
  
  for (let i = 0; i < count; i++) {
    const bookId = start + i;
    const bookSeed = config.seed + config.language + bookId;
    const gen = new BookGenerator({ ...config, seed: bookSeed });
    
    const book = gen.generateBook(bookId);
    books.push(book);
  }
  
  return books;
};


function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString();
}