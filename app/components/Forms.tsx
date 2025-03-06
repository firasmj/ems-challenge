import { Form } from "react-router";
import SubmitButton from "./Buttons";
import { useState } from "react";

interface Employee {
    full_name: string;
    email: string;
    phone: string;
    birthDate: string;
    jobTitle: string;
    department: string;
    salary: number;
    startDate: string;
    endDate: string;
}

type formProps = {
    method: 'post' | 'put';
    employee?: Employee;
}
const EmployeesForm: React.FC<formProps> = ({ method, employee }) => {

    const [empData, setEmpData] = useState<Employee>({
        full_name: employee?.full_name || '',
        email: employee?.email || '',
        phone: employee?.phone || '',
        birthDate: employee?.birthDate || '',
        jobTitle: employee?.jobTitle || '',
        department: employee?.department || '',
        salary: employee?.salary || 0,
        startDate: employee?.startDate || '',
        endDate: employee?.endDate ||''
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmpData({
            ...empData,
            [name]: value
        });
    }


    return (
        <>
            <div
                className="rounded-xl m-5 flex-col w-screen text-center justify-center bg-gray-200 p-5"
            >
                <h1 className="text-2xl font-[600]">Create/Update an Employee</h1>
                <br />
                <Form
                    method={method}
                    className="grid grid-cols-2 gap-2 gap-x-5"
                >
                    <div
                        className="flex flex-col"
                    >
                        <label htmlFor="full_name" className="justify-start text-start ml-2">Full Name</label>
                        <input type="text" name="full_name" id="full_name"
                            className="bg-gray-100 p-2 rounded-md"
                            value={empData.full_name}
                            onChange={handleChange}
                            required />
                    </div>
                    <div
                        className="flex flex-col"
                    >
                        <label htmlFor="email" className="justify-start text-start ml-2">Email</label>
                        <input type="text" name="email" id="email"
                            className="bg-gray-100 p-2 rounded-md"
                            required />
                    </div>
                    <div
                        className="flex flex-col"
                    >
                        <label htmlFor="phone" className="justify-start text-start ml-2">Phone Number</label>
                        <input type="text" name="phone" id="phone"
                            className="bg-gray-100 p-2 rounded-md"
                            required />
                    </div>
                    <div
                        className="flex flex-col"
                    >
                        <label htmlFor="birthDate" className="justify-start text-start ml-2">Date of Birth</label>
                        <input type="date" name="birthDate" id="birthDate"
                            className="bg-gray-100 p-2 rounded-md"
                            required />
                    </div>
                    <hr className="col-span-2 border-gray-300 my-3 "/>
                    <div
                        className="flex flex-col col-span-2"
                    >
                        <label htmlFor="jobTitle" className="justify-start text-start ml-2">Job Title</label>
                        <input type="text" name="jobTitle" id="jobTitle"
                            className="bg-gray-100 p-2 rounded-md"
                            required />
                    </div>
                    <div
                        className="flex flex-col col-span-2"
                    >
                        <label htmlFor="department" className="justify-start text-start ml-2">Department</label>
                        <input type="text" name="department" id="department"
                            className="bg-gray-100 p-2 rounded-md"
                            required />
                    </div>
                    <div
                        className="flex flex-col col-span-2"
                    >
                        <label htmlFor="salary" className="justify-start text-start ml-2">Salary</label>
                        <input type="number" name="salary" id="salary"
                            className="bg-gray-100 p-2 rounded-md"
                            required />
                    </div>
                    <div
                        className="flex flex-col"
                    >
                        <label htmlFor="startDate" className="justify-start text-start ml-2">Start Date</label>
                        <input type="date" name="startDate" id="startDate"
                            className="bg-gray-100 p-2 rounded-md"
                            required />
                    </div>
                    <div
                        className="flex flex-col"
                    >
                        <label htmlFor="endDate" className="justify-start text-start ml-2">End Date</label>
                        <input type="date" name="endDate" id="endDate"
                            className="bg-gray-100 p-2 rounded-md"
                            required />
                    </div>
                    {/* <button type="submit" className="">Create Employee</button> */}
                    <div
                        className="col-span-2 mt-5"
                    >
                        <SubmitButton text={"Create Employee"} />
                    </div>
                </Form>
            </div>
        </>
    )
}

export default EmployeesForm;