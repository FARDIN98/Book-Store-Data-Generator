import React, { useState, useEffect, useRef, useCallback } from "react";
import { useBookGenerator } from "../hooks/useBookGenerator";
import { LANGUAGES } from "../data/languages";
import Papa from "papaparse";
import type { Book } from "../types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  RefreshCw,
  Star,
  ChevronDown,
  ChevronUp,
  Download,
  Sparkles,
  Heart,
  Eye,
  Calendar,
  User,
} from "lucide-react";

export const BookGenerator: React.FC = () => {
  const [lang, setLang] = useState<"en-US" | "de-DE" | "ja-JP" | "fr-FR">(
    "en-US"
  );
  const [seedValue, setSeedValue] = useState<string>("42");
  const [likesAvg, setLikesAvg] = useState<number>(3.7);
  const [reviewsAvg, setReviewsAvg] = useState<number>(4.7);
  const [openBook, setOpenBook] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [view, setView] = useState<"table" | "gallery">("table");
  const tableContainer = useRef<HTMLDivElement>(null);
  const galleryContainer = useRef<HTMLDivElement>(null);

  const { generateBooksForPage } = useBookGenerator();

  useEffect(() => {
    setPage(1);
    const newBooks = generateBooksForPage(
      1,
      20,
      lang,
      seedValue,
      likesAvg,
      reviewsAvg
    );
    setBooks(newBooks);
    setOpenBook(null);
  }, [lang, seedValue, likesAvg, reviewsAvg, generateBooksForPage]);

  const loadMoreBooks = useCallback(() => {
    const container =
      view === "table" ? tableContainer.current : galleryContainer.current;
    if (container && !loading) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 30;

      if (nearBottom && books.length >= 20) {
        setLoading(true);
        const moreBooks = generateBooksForPage(
          page + 1,
          10,
          lang,
          seedValue,
          likesAvg,
          reviewsAvg
        );
        setBooks((prev) => [...prev, ...moreBooks]);
        setPage((prev) => prev + 1);
        setTimeout(() => setLoading(false), 100);
      }
    }
  }, [
    page,
    lang,
    seedValue,
    likesAvg,
    reviewsAvg,
    books.length,
    generateBooksForPage,
    loading,
    view,
  ]);

  useEffect(() => {
    const table = tableContainer.current;
    const gallery = galleryContainer.current;

    if (view === "table" && table) {
      table.addEventListener("scroll", loadMoreBooks);
      return () => table.removeEventListener("scroll", loadMoreBooks);
    } else if (view === "gallery" && gallery) {
      gallery.addEventListener("scroll", loadMoreBooks);
      return () => gallery.removeEventListener("scroll", loadMoreBooks);
    }
  }, [loadMoreBooks, view]);

  const exportToCSV = () => {
    const data = books.map((book, i) => ({
      Index: i + 1,
      ISBN: book.isbn,
      Title: book.title,
      Author: book.author,
      Publisher: book.publisher,
      Year: book.year,
      Likes: book.likes,
      "Average Rating":
        book.reviews.length > 0
          ? (
              book.reviews.reduce((sum, review) => sum + review.rating, 0) /
              book.reviews.length
            ).toFixed(1)
          : "N/A",
      "Number of Reviews": book.reviews.length,
    }));

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `books-${seedValue}-${books.length}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const toggleBook = (bookId: number) => {
    setOpenBook(openBook === bookId ? null : bookId);
  };

  const getRowStyle = (index: number) => {
    const styles = [
      "bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100",
      "bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100",
      "bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100",
      "bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100",
      "bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100",
    ];
    return styles[index % styles.length];
  };

  const getBadgeStyle = (index: number) => {
    const styles = [
      "bg-blue-500 text-white",
      "bg-purple-500 text-white",
      "bg-green-500 text-white",
      "bg-orange-500 text-white",
      "bg-teal-500 text-white",
    ];
    return styles[index % styles.length];
  };

  const randomSeed = () => {
    setSeedValue(Math.floor(Math.random() * 100000000).toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            📚 Book Store Data Generator
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Generate realistic book store data with customizable parameters
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  🌍 Language
                </Label>
                <Select
                  value={lang}
                  onValueChange={(
                    value: "en-US" | "de-DE" | "ja-JP" | "fr-FR"
                  ) => setLang(value)}
                >
                  <SelectTrigger className="border-2 border-blue-200 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((language) => (
                      <SelectItem key={language.code} value={language.code}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{language.flag}</span>
                          <span>{language.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  🎯 Seed
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    value={seedValue}
                    onChange={(e) => setSeedValue(e.target.value)}
                    className="border-2 border-purple-200 focus:border-purple-500 pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-purple-100"
                    onClick={randomSeed}
                  >
                    <RefreshCw className="h-4 w-4 text-purple-600" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  ❤️ Likes: {likesAvg}
                </Label>
                <Input
                  type="number"
                  value={likesAvg.toString()}
                  onChange={(e) => {
                    const val = e.target.value === '' ? 0 : parseFloat(e.target.value);
                    if (!isNaN(val)) {
                      setLikesAvg(Math.max(Math.min(val, 10), 0));
                    }
                  }}
                  min={0}
                  max={10}
                  step={0.1}
                  className="border-2 border-red-200 focus:border-red-500"
                  placeholder="e.g., 3.7"
                />
                <div className="px-2">
                  <Slider
                    value={[likesAvg]}
                    onValueChange={(value) => setLikesAvg(value[0])}
                    max={10}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  📝 Reviews: {reviewsAvg}
                </Label>
                <Input
                  type="number"
                  value={reviewsAvg.toString()}
                  onChange={(e) => {
                    const val = e.target.value === '' ? 0 : parseFloat(e.target.value);
                    if (!isNaN(val)) {
                      setReviewsAvg(Math.max(val, 0));
                    }
                  }}
                  min={0}
                  step={0.1}
                  className="border-2 border-yellow-200 focus:border-yellow-500"
                  placeholder="e.g., 4.7"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              {books.length > 0 && (
                <>
                  <Button
                    onClick={exportToCSV}
                    variant="outline"
                    className="border-green-300 text-green-700 hover:bg-green-50 w-full sm:w-auto"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">
                      Export CSV ({books.length} records)
                    </span>
                    <span className="sm:hidden">CSV ({books.length})</span>
                  </Button>
                  <Button
                    onClick={() =>
                      setView(view === "table" ? "gallery" : "table")
                    }
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50 w-full sm:w-auto"
                  >
                    {view === "table" ? (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Gallery View</span>
                        <span className="sm:hidden">Gallery</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Table View</span>
                        <span className="sm:hidden">Table</span>
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {books.length > 0 ? (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden rounded-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 sm:p-6">
              <CardTitle className="flex items-center justify-center text-lg sm:text-xl text-center">
                Generated Books ({books.length})
              </CardTitle>
              <CardDescription className="text-indigo-100 text-center text-sm sm:text-base">
                {view === "table"
                  ? "Click on any row to view details. Scroll to load more."
                  : "Browse books in gallery view. Scroll to load more."}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {view === "table" ? (
                <div
                  ref={tableContainer}
                  className="overflow-auto max-h-[600px] border border-gray-200 rounded-lg"
                >
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10">
                      <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                        <TableHead className="w-12 font-bold text-gray-700 text-center"></TableHead>
                        <TableHead className="w-16 font-bold text-gray-700 text-center">
                          Index
                        </TableHead>
                        <TableHead className="font-bold text-gray-700 text-center">
                          ISBN
                        </TableHead>
                        <TableHead className="font-bold text-gray-700 text-center">
                          Title
                        </TableHead>
                        <TableHead className="font-bold text-gray-700 text-center">
                          Author
                        </TableHead>
                        <TableHead className="font-bold text-gray-700 text-center">
                          Publisher
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {books.map((book, index) => (
                        <React.Fragment key={book.id}>
                          <TableRow
                            className={`cursor-pointer transition-all duration-200 border-b border-gray-100 ${getRowStyle(
                              index
                            )}`}
                            onClick={() => toggleBook(book.id)}
                          >
                            <TableCell className="text-center">
                              {openBook === book.id ? (
                                <ChevronUp className="h-4 w-4 text-indigo-600" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-indigo-600" />
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                className={`${getBadgeStyle(index)} font-bold`}
                              >
                                {book.id}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm text-gray-600 text-center">
                              {book.isbn}
                            </TableCell>
                            <TableCell className="font-semibold text-gray-800 max-w-xs truncate text-center">
                              {book.title}
                            </TableCell>
                            <TableCell className="text-gray-700 max-w-xs truncate text-center">
                              {book.author}
                            </TableCell>
                            <TableCell className="text-gray-600 max-w-xs truncate text-center">
                              {book.publisher}
                            </TableCell>

                          </TableRow>

                          {openBook === book.id && (
                            <TableRow className="bg-gradient-to-r from-indigo-50 to-purple-50">
                              <TableCell colSpan={9} className="p-0">
                                <div className="p-4 sm:p-6 border-l-4 border-indigo-500">
                                  <div className="flex flex-col md:flex-row items-start gap-3">
                                    <div className="w-24 h-32 sm:w-32 sm:h-40 rounded-lg flex-shrink-0 shadow-lg overflow-hidden">
                                      <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 128 160"
                                        className="w-full h-full"
                                      >
                                        <defs>
                                          <linearGradient
                                            id={`grad-${book.id}`}
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                          >
                                            <stop
                                              offset="0%"
                                              stopColor={`hsl(${
                                                (book.id * 137.5) % 360
                                              }, 70%, 60%)`}
                                            />
                                            <stop
                                              offset="100%"
                                              stopColor={`hsl(${
                                                (book.id * 137.5 + 60) % 360
                                              }, 70%, 40%)`}
                                            />
                                          </linearGradient>
                                        </defs>
                                        <rect
                                          width="128"
                                          height="160"
                                          fill={`url(#grad-${book.id})`}
                                        />
                                        <rect
                                          x="8"
                                          y="8"
                                          width="112"
                                          height="144"
                                          fill="none"
                                          stroke="rgba(255,255,255,0.3)"
                                          strokeWidth="1"
                                        />

                                        <foreignObject
                                          x="12"
                                          y="20"
                                          width="104"
                                          height="80"
                                        >
                                          <div
                                            className="text-white text-xs font-bold leading-tight text-center p-2"
                                            style={{
                                              fontSize: "10px",
                                              lineHeight: "12px",
                                            }}
                                          >
                                            {book.title.length > 50
                                              ? book.title.substring(0, 47) +
                                                "..."
                                              : book.title}
                                          </div>
                                        </foreignObject>

                                        <foreignObject
                                          x="12"
                                          y="120"
                                          width="104"
                                          height="30"
                                        >
                                          <div
                                            className="text-white text-xs text-center p-1"
                                            style={{ fontSize: "8px" }}
                                          >
                                            {book.author.length > 20
                                              ? book.author.substring(0, 17) +
                                                "..."
                                              : book.author}
                                          </div>
                                        </foreignObject>
                                      </svg>
                                    </div>

                                    <div className="flex-1 space-y-2">
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                                          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            Book Details
                                          </h4>
                                          <div className="space-y-0.5 text-sm">
                                            <div className="flex gap-2">
                                              <span className="font-bold text-gray-600 w-20">
                                                Title:
                                              </span>
                                              <span className="text-gray-800">
                                                {book.title}
                                              </span>
                                            </div>
                                            <div className="flex gap-2">
                                              <span className="font-bold text-gray-600 w-20">
                                                Author:
                                              </span>
                                              <span className="text-gray-800">
                                                {book.author}
                                              </span>
                                            </div>
                                            <div className="flex gap-2">
                                              <span className="font-bold text-gray-600 w-20">
                                                Publisher:
                                              </span>
                                              <span className="text-gray-800">
                                                {book.publisher}
                                              </span>
                                            </div>
                                            <div className="flex gap-2">
                                              <span className="font-bold text-gray-600 w-20">
                                                Year:
                                              </span>
                                              <span className="text-gray-800">
                                                {book.year}
                                              </span>
                                            </div>
                                            <div className="flex gap-2">
                                              <span className="font-bold text-gray-600 w-20 ">
                                                ISBN:
                                              </span>
                                              <span className="text-gray-800 font-mono text-xs">
                                                {book.isbn}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                                          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            Stats
                                          </h4>
                                          <div className="space-y-0.5 text-sm">
                                            <div className="flex items-center gap-2">
                                              <Heart className="h-4 w-4 text-red-500" />
                                              <span>{book.likes} likes</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Star className="h-4 w-4 text-yellow-500" />
                                              <span>
                                                {book.reviews.length} reviews
                                              </span>
                                            </div>
                                            {book.reviews.length > 0 && (
                                              <div className="flex items-center gap-2">
                                                <span className="text-yellow-600 font-semibold">
                                                  {(
                                                    book.reviews.reduce(
                                                      (sum, review) =>
                                                        sum + review.rating,
                                                      0
                                                    ) / book.reviews.length
                                                  ).toFixed(1)}{" "}
                                                  ⭐
                                                </span>
                                                <span className="text-gray-500">
                                                  avg rating
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>

                                      {book.reviews.length > 0 && (
                                        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                                          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <User className="h-4 w-4 text-blue-500" />
                                            Recent Reviews
                                          </h4>
                                          <div className="space-y-1 max-h-40 overflow-y-auto">
                                            {book.reviews
                                              .slice(0, 3)
                                              .map((review, idx) => (
                                                <div
                                                  key={idx}
                                                  className="border-l-2 border-blue-200 pl-3 py-1"
                                                >
                                                  <div className="flex items-center gap-2 mb-1">
                                                    <div className="flex">
                                                      {[...Array(5)].map(
                                                        (_, i) => (
                                                          <Star
                                                            key={i}
                                                            className={`h-3 w-3 ${
                                                              i < review.rating
                                                                ? "text-yellow-400 fill-current"
                                                                : "text-gray-300"
                                                            }`}
                                                          />
                                                        )
                                                      )}
                                                    </div>
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                      <Calendar className="h-3 w-3" />
                                                      {new Date(
                                                        review.date
                                                      ).toLocaleDateString()}
                                                    </span>
                                                  </div>
                                                  <p className="text-sm text-gray-700">
                                                    {review.text}
                                                  </p>
                                                </div>
                                              ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                  {loading && (
                    <div className="text-center py-4">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto text-indigo-600" />
                    </div>
                  )}
                </div>
              ) : (
                <div
                  ref={galleryContainer}
                  className="p-3 sm:p-6 max-h-96 overflow-y-auto"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                    {books.map((book, index) => (
                      <Card
                        key={book.id}
                        className={`${getRowStyle(
                          index
                        )} border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                        onClick={() => toggleBook(book.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center space-y-3">
                            <div className="w-20 h-28 rounded-lg shadow-md overflow-hidden">
                              <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 80 112"
                                className="w-full h-full"
                              >
                                <defs>
                                  <linearGradient
                                    id={`gallery-grad-${book.id}`}
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                  >
                                    <stop
                                      offset="0%"
                                      stopColor={`hsl(${
                                        (book.id * 137.5) % 360
                                      }, 70%, 60%)`}
                                    />
                                    <stop
                                      offset="100%"
                                      stopColor={`hsl(${
                                        (book.id * 137.5 + 60) % 360
                                      }, 70%, 40%)`}
                                    />
                                  </linearGradient>
                                </defs>
                                <rect
                                  width="80"
                                  height="112"
                                  fill={`url(#gallery-grad-${book.id})`}
                                />
                                <rect
                                  x="4"
                                  y="4"
                                  width="72"
                                  height="104"
                                  fill="none"
                                  stroke="rgba(255,255,255,0.3)"
                                  strokeWidth="1"
                                />

                                <foreignObject
                                  x="6"
                                  y="12"
                                  width="68"
                                  height="60"
                                >
                                  <div
                                    className="text-white text-xs font-bold leading-tight text-center p-1"
                                    style={{
                                      fontSize: "8px",
                                      lineHeight: "10px",
                                    }}
                                  >
                                    {book.title.length > 35
                                      ? book.title.substring(0, 32) + "..."
                                      : book.title}
                                  </div>
                                </foreignObject>

                                <foreignObject
                                  x="6"
                                  y="85"
                                  width="68"
                                  height="20"
                                >
                                  <div
                                    className="text-white text-xs text-center p-1"
                                    style={{ fontSize: "7px" }}
                                  >
                                    {book.author.length > 15
                                      ? book.author.substring(0, 12) + "..."
                                      : book.author}
                                  </div>
                                </foreignObject>
                              </svg>
                            </div>

                            <div className="space-y-1">
                              <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">
                                {book.title}
                              </h3>
                              <p className="text-xs text-gray-600">
                                {book.author}
                              </p>
                              <p className="text-xs text-gray-500">
                                {book.year}
                              </p>
                            </div>

                            <div className="flex items-center gap-3 text-xs">
                              <div className="flex items-center gap-1">
                                <Heart className="h-3 w-3 text-red-500" />
                                <span>{book.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                <span>{book.reviews.length}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {loading && (
                    <div className="text-center py-6">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto text-indigo-600" />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <Sparkles className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Ready to Generate Books
              </h3>
              <p className="text-gray-500">
                Adjust the parameters above and books will be generated
                automatically
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookGenerator;
