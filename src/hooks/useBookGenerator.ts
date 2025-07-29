import { useCallback } from 'react';
import { BookGenerator } from '../utils/bookGenerator';
import type { Book } from '../types';

export const useBookGenerator = () => {
  const generateBooksForPage = useCallback((page: number, count: number, lang: string, seed: string, likes: number, reviews: number) => {
    const gen = new BookGenerator();
    return gen.generateBooks({
      language: lang,
      seed,
      averageLikes: likes,
      averageReviews: reviews,
      page,
      booksPerPage: count
    });
  }, []);

  const exportCSV = (books: Book[]) => {
    const headers = ['Index', 'ISBN', 'Title', 'Author', 'Publisher'];
    const rows = books.map((book, i) => [
      i + 1,
      book.isbn,
      `"${book.title}"`,
      `"${book.author}"`,
      `"${book.publisher}"`
    ].join(','));
    
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'books.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    generateBooksForPage,
    exportCSV
  };
};