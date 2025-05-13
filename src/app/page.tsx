"use client";

import React, { useEffect, useState } from "react";
import Search from "../components/search/search";
import AdvocatesTable from "../components/advocatesTable/advocatesTable";
import ErrorPage from "../components/error/error";
import { Advocate } from "@/app/types";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<String>("");
  const [searchError, setSearchError] = useState<boolean>(false);
  const [pageError, setPageError] = useState<boolean>(false);
  const [isSearchExpanded, setSearchExpanded] = useState<boolean>(false);

  useEffect(() => {
    try {
      (async () => {
        const response = await fetch("/api/advocates");
        if (!response.ok) {
          setPageError(true);
        }
        const data = await response.json();
        setAdvocates(data.data);
      })();
    } catch (err) {
      setPageError(true);
      console.error("Error fetching advocates ", err);
    }
  }, []);

  useEffect(() => {
    if (searchTerm !== "") {
      const formattedSearchTerm = searchTerm.toLowerCase();
      const filteredSearch = advocates.filter((obj) => {
        return Object.values(obj).some((value) => {
          if (Array.isArray(value)) {
            return value.some((val) =>
              val.toLowerCase().includes(formattedSearchTerm),
            );
          }
          if (Number.isInteger(value)) {
            return value.toString().includes(formattedSearchTerm);
          }
          return value.toLowerCase().includes(formattedSearchTerm);
        });
      });
      if (filteredSearch.length > 1) {
        setFilteredAdvocates(filteredSearch);
        return;
      }
      setSearchError(true);
    }
  }, [searchTerm, setSearchTerm]);

  return (
    <div className={"m-8"}>
      <div className={"m-2 flex justify-between mb-4"}>
        <div>
          <h1 className={"font-bold text-[28px]"}>Health Advocates</h1>
        </div>
        <Search
          isSearchExpanded={isSearchExpanded}
          setSearchExpanded={setSearchExpanded}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchError={searchError}
          setSearchError={setSearchError}
        />
      </div>
      {pageError && <ErrorPage />}
      <AdvocatesTable
        searchTerm={searchTerm}
        filteredAdvocates={filteredAdvocates}
        advocates={advocates}
      />
    </div>
  );
}
