import { Advocate } from "@/app/types";
import {dataStyle} from "@/components/advocatesTable/advocatesTable.style";


interface AdvocatesTableProps {
  advocates: Advocate[];
  filteredAdvocates: Advocate[];
  searchTerm: string;
}
const AdvocatesTable = ({
  filteredAdvocates,
  advocates,
  searchTerm,
}: AdvocatesTableProps) => {
  const headings: string[] = [
    "First Name",
    "Last Name",
    "City",
    "Degree",
    "Specialties",
    "Years Of Experience",
    "Phone Number",
  ];
  const createTable = (advocatesList: Advocate[]) => {
    if (advocatesList.length) {
      return advocatesList.map((advocate, i) => (
          <tr key={i} className={"divide-y divide-gray-200 font-light"}>
            <td className={dataStyle}>{advocate.firstName}</td>
            <td className={dataStyle}>{advocate.lastName}</td>
            <td className={dataStyle}>{advocate.city}</td>
            <td className={dataStyle}>{advocate.degree}</td>
            <td className={`text-[12px] ${dataStyle}`}>
              {advocate.specialties.map((s, i) => (
                <div key={`specialty-${i}`}>{s}</div>
              ))}
            </td>
            <td className={dataStyle}>{advocate.yearsOfExperience}</td>
            <td className={dataStyle}>{advocate.phoneNumber}</td>
          </tr>

      ));
    }
    return null;
  };

  return (
    <div className={"mt-[32px] shadow-md rounded-md bg-clip-border"}>
      <table className={"table-auto"}>
        <tr className={""}>
          {headings.map((name) => (
            <th className={"text-[12px] font-light"} key={name}>
              <div className={"my-4 mx-4"}>{name}</div>
            </th>
          ))}
        </tr>
          <tbody className={""}>
        {filteredAdvocates.length && searchTerm !== ""
          ? createTable(filteredAdvocates)
          : createTable(advocates)}
          </tbody>
      </table>
    </div>
  );
};

export default AdvocatesTable;
