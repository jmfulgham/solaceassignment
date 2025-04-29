import {useEffect} from "react";

interface SearchProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string)=> void;
    searchError: boolean;
    setSearchError:  (value: (((prevState: boolean) => boolean) | boolean)) => void;
}

const Search = ({searchTerm, setSearchTerm, searchError, setSearchError}: SearchProps)=> {
    const handleReset = () => {
       setSearchTerm("");
        setSearchError(false);
    };

    useEffect(()=> {
        if(searchTerm === "" && searchError){
            setSearchError(false);
        }
    }, [searchTerm])

    return(
        <div>
            <p className={"mb-2"}>Search</p>
            <input className={'border border-black mr-2 rounded-md h-[40px] p-2'} value={searchTerm} onChange={e=>setSearchTerm(e.target.value.toLowerCase())}/>
            <button className={'text-[12px] ml-2 text-gray-500 hover:text-blue-600'} onClick={handleReset}>Reset Search</button>
            {searchError && <div className={"text-[12px] text-red-600 mt-2"}><p>No results found</p></div>}
    </div>)
}

export default Search;
