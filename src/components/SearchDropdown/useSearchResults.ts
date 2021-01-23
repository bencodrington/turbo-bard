import { useEffect, useState } from "react";

export default function useSearchResults<T>(fetchFunction: (searchText: string) => Promise<T[]>) {
  const [results, setResults] = useState<T[]>([]);
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    let isCancelled = false;
    async function fetch() {
      const results = await fetchFunction(searchText);
      if (isCancelled) return;
      setResults(results);
      setIsFetchingResults(false);
    }

    setIsFetchingResults(true);
    fetch();

    return () => {
      isCancelled = true;
    }
  }, [searchText, fetchFunction]);

  function appendSearchText(text: string) {
    if (searchText.trim().length === 0) {
      setSearchText(text);
      return;
    }
    setSearchText(searchText.trim() + ' ' + text);
  }

  return {
    results,
    isFetchingResults,
    searchText,
    setSearchText,
    appendSearchText
  };
}