import AdvocatesTable from "@/components/advocatesTable/advocatesTable";
import {render} from "@testing-library/react"
import {Advocate} from "@/app/types";

const specialties = [
    "Bipolar",
    "LGBTQ",
    "Medication/Prescribing",
    "Suicide History/Attempts",
    "General Mental Health (anxiety, depression, stress, grief, life transitions)",
    "Men's issues",
    "Relationship Issues (family, friends, couple, etc)",
    "Trauma & PTSD",
]

const mockAdvocateData = [{
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    degree: "MD",
    specialties: specialties.slice(0,4),
    yearsOfExperience: 10,
    phoneNumber: 5551234567,
},
    {
        firstName: "Jane",
        lastName: "Smith",
        city: "Los Angeles",
        degree: "PhD",
        specialties: specialties.slice(4,8),
        yearsOfExperience: 8,
        phoneNumber: 5559876543,
    },
    {
        firstName: "Alice",
        lastName: "Johnson",
        city: "Chicago",
        degree: "MSW",
        specialties: specialties.slice(2,5),
        yearsOfExperience: 5,
        phoneNumber: 5554567890,
    }] as Advocate[]

describe("Advocates Table", ()=> {
    it("renders the table", ()=> {
        const component = render(<AdvocatesTable advocates={mockAdvocateData} filteredAdvocates={[]} searchTerm={""}/>)
        expect(component.getByTestId("advocatesTable")).toBeInTheDocument();
    })
})
