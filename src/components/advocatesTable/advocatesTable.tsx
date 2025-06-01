import { Advocate } from "@/app/types";
import {
  dataStyle,
  paginationButtonStyle,
  paginationContainerStyle, tableRowStyle
} from "@/components/advocatesTable/advocatesTable.style";
import { useCallback, useState } from "react";

interface AdvocatesTableProps {
  advocates: Advocate[];
  filteredAdvocates: Advocate[];
  searchTerm?: string;
}
const AdvocatesTable = ({
  filteredAdvocates,
  advocates,
  searchTerm,
}: AdvocatesTableProps) => {
  const [page, setPage] = useState(1);
  const [tableAmount, setTableAmount] = useState(5);
  const headings: string[] = [
    "First Name",
    "Last Name",
    "City",
    "Degree",
    "Specialties",
    "Years Of Experience",
    "Phone Number",
  ];

  const handlePrevPage = ()=> {
    if(page === 1) {
      setPage(1)
      return;
    } setPage(page - 1)
  }

  const handleNextPage = () => {
    const nextIndex = page * tableAmount
    if (!advocates[nextIndex]){
      setPage(page);
      return;
    } setPage(page + 1);
  }

  const handlePagination = useCallback((): Advocate[] => {
    const startIndex = (page - 1) * tableAmount;
    const endIndex = startIndex + tableAmount;
    if (startIndex >= 0) {
      return advocates.slice(startIndex, endIndex);
    } return advocates.slice(0, tableAmount)
  }, [tableAmount, page, advocates]);

  const createTable = (advocatesList: Advocate[]) => {
    if (advocatesList.length) {
      return advocatesList.map((advocate, i) => (
        <tr
          key={i}
          className={tableRowStyle}
        >
          <td className={dataStyle}>{advocate.firstName}</td>
          <td className={dataStyle}>{advocate.lastName}</td>
          <td className={dataStyle}>{advocate.city}</td>
          <td className={dataStyle}>{advocate.degree}</td>
          <td className={`${dataStyle}`}>
            {advocate.specialties.map((s, i) => (
              <div key={`specialty-${i}`}>{s}</div>
            ))}
          </td>
          <td className={dataStyle}>{advocate.yearsOfExperience}</td>
          <td className={dataStyle}>{advocate.phoneNumber}</td>
        </tr>
      ));
    } return null;
  };

  return (
    <div className={"mt-[32px] flex flex-col justify-center"}>
      <table className={"bg-clip-border shadow-lg rounded-xl"} data-testid={"advocatesTable"}>
        <tr className={"bg-green-900 text-white rounded-lg"}>
          {headings.map((name) => (
            <th className={"text-[12px] font-light"} scope="col" key={name}>
              <div className={"m-2 md:m-4"}>{name}</div>
            </th>
          ))}
        </tr>
        <tbody className={""}>
          {filteredAdvocates.length && searchTerm !== ""
            ? createTable(filteredAdvocates)
            : createTable(handlePagination())}
        </tbody>
      </table>
      <div className={"flex flex-row justify-between mt-4 w-[full]"}>
        <div className={paginationContainerStyle}>
          <button className={paginationButtonStyle} disabled={page === 1} onClick={handlePrevPage}>Prev</button>
        </div>
        <div className={paginationContainerStyle}>
          <button className={paginationButtonStyle} disabled={!advocates[page*tableAmount]} onClick={handleNextPage}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdvocatesTable;
