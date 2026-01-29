import { Search, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { getPostByTitle } from "@/actions/postActions/get-post-by-title";
import { Post } from "@/model/post";
import Link from "next/link";

export const SearchBar = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchString, 500);

  const [results, setResults] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const searchItems = useCallback(async () => {
    if (!debouncedSearchTerm) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const result = await getPostByTitle(debouncedSearchTerm);
      setResults(result);
    } catch (e) {
      console.error("Erro ao buscar os dados:", e);
    } finally {
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    searchItems();
  }, [searchItems]);

  const showResults = isFocused && searchString.length > 0;

  return (
    <div className="hidden md:flex flex-1 items-start justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-label="Ícone de busca"
          />
          <Input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            type="search"
            placeholder="Buscar posts..."
            className="w-full pl-10 bg-slate-50 border-slate-300 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-700"
            aria-label="Campo de busca de posts"
          />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 animate-spin" />
          )}
        </div>

        {showResults && (
          <div className="absolute top-full z-10 mt-2 w-full overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
            {!isSearching && results.length === 0 && debouncedSearchTerm && (
              <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Nenhum resultado encontrado para {debouncedSearchTerm}.
              </div>
            )}

            {results.length > 0 && (
              <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                {results.map((result) => (
                  <li key={result.id}>
                    <Link
                      href={`/post/${result.slug}`} // Ajuste a URL conforme sua estrutura
                      className="block p-3 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      {result.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
