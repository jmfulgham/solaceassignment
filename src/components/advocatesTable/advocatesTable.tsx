import {Advocate} from "@/app/types";

interface AdvocatesTableProps {
    advocates: Advocate[]
    filteredAdvocates: Advocate[];
    searchTerm: string;
}
const AdvocatesTable = ({filteredAdvocates, advocates, searchTerm}: AdvocatesTableProps)=> {
    const headings: string[] = ["First Name", "Last Name", "City", "Degree", "Specialties", "Years Of Experience", "Phone Number"]
    const createTable = (advocatesList: Advocate[]) => {
        if (advocatesList.length) {
            return advocatesList.map((advocate, i) => (
                <tbody key={i}><tr className={"mx-4"}>
                    <td>{advocate.firstName}</td>
                    <td>{advocate.lastName}</td>
                    <td>{advocate.city}</td>
                    <td>{advocate.degree}</td>
                    <td>
                        {advocate.specialties.map((s, i) => (
                            <div key={`specialty-${i}`}>{s}</div>
                        ))}
                    </td>
                    <td>{advocate.yearsOfExperience}</td>
                    <td>{advocate.phoneNumber}</td>
                </tr>
                </tbody>
            ))
        } return null
    }

    return (<div className={"mt-[32px]"}>
        <table>
            <tr>
                {headings.map((name)=> <th className={"text-[12px]"} key={name}><div className={"my-4 mx-4"}>{name}</div></th>)}
            </tr>
            {filteredAdvocates.length && searchTerm !== "" ? createTable(filteredAdvocates) : createTable(advocates)}
        </table>
    </div>)
}

export default AdvocatesTable
