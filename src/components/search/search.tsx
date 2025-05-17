import { useEffect } from "react";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  searchError: boolean;
  setSearchError: (boolean) => void;
  isSearchExpanded: boolean;
  setSearchExpanded: (boolean) => void;
}

const Search = ({
  searchTerm,
  setSearchTerm,
  searchError,
  setSearchError,
  isSearchExpanded,
  setSearchExpanded,
}: SearchProps) => {
  const handleReset = () => {
    setSearchTerm("");
    setSearchError(false);
  };

  useEffect(() => {
    if (searchTerm === "" && searchError) {
      setSearchError(false);
    }
  }, [searchTerm, searchError]);

  return (
    <div className={"ml-4 flex justify-items-end"}>
      <button
        onClick={() => setSearchExpanded(!isSearchExpanded)}
        className={"justify-self-center items-center mr-2"}
      >
        <HiMagnifyingGlassCircle
          className={"w-[30px] h-[30px] text-green-900"}
          alt={"Search"}
        />
      </button>

      <>
        <input
          className={`${isSearchExpanded ? "w-[200px] h-[40px] duration-500 " : "duration-500 w-[1px] h-[1px] border-none"} flex ease-in-out border border-black mr-2 rounded-md p-2`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        {isSearchExpanded && (
          <>
            <button
              className={"text-[12px] ml-2 text-gray-500 hover:text-blue-600"}
              onClick={handleReset}
            >
              Reset Search
            </button>
            <button
              className={"text-[12px] ml-3 text-gray-500 hover:text-blue-600"}
              onClick={() => {
                setSearchExpanded(false)
                setSearchTerm("")
              }}
            >
              Cancel
            </button>
          </>
        )}
      </>
      {searchError && (
        <div className={"text-[12px] text-red-600 mt-2"}>
          <p>No results found</p>
        </div>
      )}
    </div>
  );
};

export default Search;
