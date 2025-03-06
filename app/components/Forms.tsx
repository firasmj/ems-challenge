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

interface errors {
    email: string;
    phone: string;
    birthDate: string;
    salary: string;
}

type formProps = {
    method: 'post' | 'put';
    employee?: Employee;
}
const EmployeesForm: React.FC<formProps> = ({ method, employee }) => {

    const header = method === 'post' ? 'Create Employee' : 'Update Employee';

    const [errors, setErrors] = useState<errors>({
        email: '',
        phone: '',
        birthDate: '',
        salary: ''
    });

    const [empData, setEmpData] = useState<Employee>({
        full_name: employee?.full_name || '',
        email: employee?.email || '',
        phone: employee?.phone || '',
        birthDate: employee?.birthDate || '',
        jobTitle: employee?.jobTitle || '',
        department: employee?.department || '',
        salary: employee?.salary || 800,
        startDate: employee?.startDate || '',
        endDate: employee?.endDate || ''
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    setErrors({ ...errors, [name]: 'Invalid email format' });
                    empData.email = '';
                }else{
                    setErrors({ ...errors, [name]: '' });
                }
                break;
            case 'phone':
                const phoneRegex = /^\+\d{5,}$/;
                if (!phoneRegex.test(value)) {
                    setErrors({ ...errors, [name]: 'Invalid phone number' });
                    empData.phone = '';
                }else{
                    setErrors({ ...errors, [name]: '' });
                }
                break;
            case 'salary':
                if (Number(value) < 800) {
                    setErrors({ ...errors, [name]: 'Salary cannot be under 800 (minimum wage)' });
                    empData.salary = 0;
                }else{
                    setErrors({ ...errors, [name]: '' });
                }
                break;
            case 'birthDate':
                const today = new Date();
                const birthDate = new Date(value);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDifference = today.getMonth() - birthDate.getMonth();
                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age < 18) {
                    setErrors({ ...errors, [name]: 'Employee must be at least 18 years old' });
                    empData.birthDate = '';
                }else{
                    setErrors({ ...errors, [name]: '' });
                }
                break;
        }

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
                <div className="text-red-500 flex-col">
                    <div className="text-red-500">{errors.birthDate}</div>
                    <div className="text-red-500">{errors.email}</div>
                    <div className="text-red-500">{errors.phone}</div>
                    <div className="text-red-500">{errors.salary}</div>
                </div>
                <h1 className="text-2xl font-[600]">{header}</h1>
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
                            value={empData.email}
                            onChange={handleChange}
                            required />
                    </div>
                    <div
                        className="flex flex-col"
                    >
                        <label htmlFor="phone" className="justify-start text-start ml-2">Phone Number</label>
                        <input type="text" name="phone" id="phone"
                            className="bg-gray-100 p-2 rounded-md"
                            value={empData.phone}
                            onChange={handleChange}
                            required />
                    </div>
                    <div
                        className="flex flex-col"
                    >
                        <label htmlFor="birthDate" className="justify-start text-start ml-2">Date of Birth</label>
                        <input type="date" name="birthDate" id="birthDate"
                            className="bg-gray-100 p-2 rounded-md"
                            value={empData.birthDate}
                            onChange={handleChange}
                            required />
                    </div>
                    <hr className="col-span-2 border-gray-300 my-3 " />
                    <div
                        className="flex flex-col col-span-2"
                    >
                        <label htmlFor="jobTitle" className="justify-start text-start ml-2">Job Title</label>
                        <input type="text" name="jobTitle" id="jobTitle"
                            className="bg-gray-100 p-2 rounded-md"
                            value={empData.jobTitle}
                            onChange={handleChange}
                            required />
                    </div>
                    <div
                        className="flex flex-col col-span-2"
                    >
                        <label htmlFor="department" className="justify-start text-start ml-2">Department</label>
                        <input type="text" name="department" id="department"
                            className="bg-gray-100 p-2 rounded-md"
                            value={empData.department}
                            onChange={handleChange}
                            required />
                    </div>
                    <div
                        className="flex flex-col col-span-2"
                    >
                        <label htmlFor="salary" className="justify-start text-start ml-2">Salary</label>
                        <input type="number" name="salary" id="salary"
                            className="bg-gray-100 p-2 rounded-md"
                            value={empData.salary}
                            onChange={handleChange}
                            required />
                    </div>
                    <div
                        className="flex flex-col"
                    >
                        <label htmlFor="startDate" className="justify-start text-start ml-2">Start Date</label>
                        <input type="date" name="startDate" id="startDate"
                            className="bg-gray-100 p-2 rounded-md"
                            value={empData.startDate}
                            onChange={handleChange}
                            required />
                    </div>
                    <div
                        className="flex flex-col"
                    >
                        <label htmlFor="endDate" className="justify-start text-start ml-2">End Date</label>
                        <input type="date" name="endDate" id="endDate"
                            className="bg-gray-100 p-2 rounded-md"
                            value={empData.endDate}
                            onChange={handleChange}
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