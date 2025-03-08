import { Form } from "react-router";
import { SubmitButton, DisabledButton, CancelButton } from "./Buttons";
import { useState } from "react";

interface Employee {
    full_name: string;
    email: string;
    phone: string;
    birth_date: string;
    job_title: string;
    department: string;
    salary: number;
    start_date: string;
    end_date: string;
    photo?: File;
    CV?: File;
    ID?: File;
}

interface errors {
    email: string;
    phone: string;
    birth_date: string;
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
        birth_date: '',
        salary: ''
    });

    const [empData, setEmpData] = useState<Employee>({
        full_name: employee?.full_name || '',
        email: employee?.email || '',
        phone: employee?.phone || '',
        birth_date: employee?.birth_date || '',
        job_title: employee?.job_title || '',
        department: employee?.department || '',
        salary: employee?.salary || 800,
        start_date: employee?.start_date || '',
        end_date: employee?.end_date || '',
        photo: undefined,
        CV: undefined,
        ID: undefined
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        if (files && files.length > 0) {
            setEmpData({
                ...empData,
                [name]: files[0]
            });
        } else {
            switch (name) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        setErrors({ ...errors, [name]: 'Invalid email format' });
                        empData.email = '';
                    } else {
                        setErrors({ ...errors, [name]: '' } as errors);
                    }
                    break;
                case 'phone':
                    const phoneRegex = /^\+\d{5,}$/;
                    if (!phoneRegex.test(value)) {
                        setErrors({ ...errors, [name]: 'Invalid phone number' });
                        empData.phone = '';
                    } else {
                        setErrors({ ...errors, [name]: '' } as errors);
                    }
                    break;
                case 'salary':
                    if (Number(value) < 800) {
                        setErrors({ ...errors, [name]: 'Salary cannot be under 800 (minimum wage)' });
                        empData.salary = 0;
                    } else {
                        setErrors({ ...errors, [name]: '' });
                    }
                    break;
                case 'birth_date':
                    const today = new Date();
                    const birthDate = new Date(value);
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDifference = today.getMonth() - birthDate.getMonth();
                    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                    if (age < 18) {
                        setErrors({ ...errors, [name]: 'Employee must be at least 18 years old' });
                        empData.birth_date = '';
                    } else {
                        setErrors({ ...errors, [name]: '' });
                    }
                    break;
            }

            setEmpData({
                ...empData,
                [name]: value
            });
        }
    }


    return (
        <>
            <div
                className="rounded-xl m-5 flex-col w-screen text-center justify-center bg-gray-200 p-5"
            >
                <div className="text-red-500 flex-col">
                    <div className="text-red-500">{errors.birth_date}</div>
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
                        <label htmlFor="birth_date" className="justify-start text-start ml-2">Date of Birth</label>
                        <input type="date" name="birth_date" id="birth_date"
                            className="bg-gray-100 p-2 rounded-md"
                            value={empData.birth_date}
                            onChange={handleChange}
                            required />
                    </div>
                    <hr className="col-span-2 border-gray-300 my-3 " />
                    <div
                        className="flex flex-col col-span-2"
                    >
                        <label htmlFor="job_title" className="justify-start text-start ml-2">Job Title</label>
                        <input type="text" name="job_title" id="job_title"
                            className="bg-gray-100 p-2 rounded-md"
                            value={empData.job_title}
                            onChange={handleChange}
                            required />
                    </div>
                    <div
                        className="flex flex-col col-span-2"
                    >
                        <label htmlFor="department" className="justify-start text-start ml-2">Department</label>
                        <select
                            name="department"
                            id="department"
                            value={empData.department}
                            className="bg-gray-100 p-2 py-3 rounded-md"
                            onChange={(e) => {
                                setEmpData({ ...empData, department: e.target.value });
                            }}
                            required
                        >
                            <option value="">Select a Department</option>
                            <option value="IT">IT (Information Technology)</option>
                            <option value="HR">Human Resources (HR)</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                            <option value="Sales">Sales</option>
                        </select>

                        {/* <input type="text" name="department" id="department"
                            className="bg-gray-100 p-2 rounded-md"
                            value={empData.department}
                            onChange={handleChange}
                            required /> */}
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
                        <label htmlFor="start_date" className="justify-start text-start ml-2">Start Date</label>
                        <input type="date" name="start_date" id="start_date"
                            className="bg-gray-100 p-2 rounded-md"
                            value={empData.start_date}
                            onChange={handleChange}
                            required />
                    </div>
                    <div
                        className="flex flex-col"
                    >
                        <label htmlFor="end_date" className="justify-start text-start ml-2">End Date</label>
                        <input type="date" name="end_date" id="end_date"
                            className="bg-gray-100 p-2 rounded-md"
                            value={empData.end_date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-2 mt-5">
                        <h4 className="text-center mb-4">Documents</h4>
                        <div className="grid grid-cols-3 gap-4 md:grid-cols-3 justify-center flex-col place-items-center">
                            <div className="">
                                <label htmlFor="photo" className="justify-start text-start ml-2">
                                    Upload Photo
                                </label>
                                <div className="mt-2 flex items-center space-x-3">
                                    <label className="btn-primary cursor-pointer flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14.1901M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8482 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5865L15.7901 12.4679C16.4651 11.9279 17.4053 11.8856 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5302L20 14.1901M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <span className="text-sm text-gray-700 dark:text-gray-600">Select Photo</span>
                                        <input
                                            type="file"
                                            name="photo"
                                            id="photo"
                                            accept="image/*"
                                            className="hidden w-[100%] rounded-md"
                                            onChange={(e) => {
                                                const fileName = e.target.files?.[0]?.name;
                                                if (fileName) {
                                                    const span = e.target.parentElement?.nextElementSibling;
                                                    if (span) {
                                                        span.textContent = fileName;
                                                        span.classList.add('text-green-500');
                                                    }
                                                }
                                            }}
                                        />
                                    </label>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 file-name"></span>
                                </div>
                            </div>
                            <div className="">
                                <label htmlFor="ID" className="justify-start text-start ml-2">
                                    Upload ID
                                </label>
                                <div className="mt-2 flex items-center space-x-3">
                                    <label className="btn-primary cursor-pointer flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <svg fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 482.14 482.14">
                                            <g>
                                                <path d="M142.024,310.194c0-8.007-5.556-12.782-15.359-12.782c-4.003,0-6.714,0.395-8.132,0.773v25.69
                                    		c1.679,0.378,3.743,0.504,6.588,0.504C135.57,324.379,142.024,319.1,142.024,310.194z"/>
                                                <path d="M202.709,297.681c-4.39,0-7.227,0.379-8.905,0.772v56.896c1.679,0.394,4.39,0.394,6.841,0.394
                                    		c17.809,0.126,29.424-9.677,29.424-30.449C230.195,307.231,219.611,297.681,202.709,297.681z"/>
                                                <path d="M315.458,0H121.811c-28.29,0-51.315,23.041-51.315,51.315v189.754h-5.012c-11.418,0-20.678,9.251-20.678,20.679v125.404
                                    		c0,11.427,9.259,20.677,20.678,20.677h5.012v22.995c0,28.305,23.025,51.315,51.315,51.315h264.223
                                    		c28.272,0,51.3-23.011,51.3-51.315V121.449L315.458,0z M99.053,284.379c6.06-1.024,14.578-1.796,26.579-1.796
                                    		c12.128,0,20.772,2.315,26.58,6.965c5.548,4.382,9.292,11.615,9.292,20.127c0,8.51-2.837,15.745-7.999,20.646
                                    		c-6.714,6.32-16.643,9.157-28.258,9.157c-2.585,0-4.902-0.128-6.714-0.379v31.096H99.053V284.379z M386.034,450.713H121.811
                                    		c-10.954,0-19.874-8.92-19.874-19.889v-22.995h246.31c11.42,0,20.679-9.25,20.679-20.677V261.748
                                    		c0-11.428-9.259-20.679-20.679-20.679h-246.31V51.315c0-10.938,8.921-19.858,19.874-19.858l181.89-0.19v67.233
                                    		c0,19.638,15.934,35.587,35.587,35.587l65.862-0.189l0.741,296.925C405.891,441.793,396.987,450.713,386.034,450.713z
                                    		 M174.065,369.801v-85.422c7.225-1.15,16.642-1.796,26.58-1.796c16.516,0,27.226,2.963,35.618,9.282
                                    		c9.031,6.714,14.704,17.416,14.704,32.781c0,16.643-6.06,28.133-14.453,35.224c-9.157,7.612-23.096,11.222-40.125,11.222
                                    		C186.191,371.092,178.966,370.446,174.065,369.801z M314.892,319.226v15.996h-31.23v34.973h-19.74v-86.966h53.16v16.122h-33.42
                                    		v19.875H314.892z"/>
                                            </g>
                                        </svg>
                                        <span className="text-sm text-gray-700 dark:text-gray-600">Select ID</span>
                                        <input
                                            type="file"
                                            name="ID"
                                            id="ID"
                                            accept=".pdf*"
                                            className="hidden w-[100%] rounded-md"
                                            onChange={(e) => {
                                                const fileName = e.target.files?.[0]?.name;
                                                if (fileName) {
                                                    const span = e.target.parentElement?.nextElementSibling;
                                                    if (span) {
                                                        span.textContent = fileName;
                                                        span.classList.add('text-green-500');
                                                    }
                                                }
                                            }}
                                        />
                                    </label>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 file-name"></span>
                                </div>
                            </div>
                            <div className="">
                                <label htmlFor="CV" className="justify-start text-start ml-2">
                                    Upload CV
                                </label>
                                <div className="mt-2 flex items-center space-x-3">
                                    <label className="btn-primary cursor-pointer flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <svg fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 482.14 482.14">
                                            <g>
                                                <path d="M142.024,310.194c0-8.007-5.556-12.782-15.359-12.782c-4.003,0-6.714,0.395-8.132,0.773v25.69
                                    		c1.679,0.378,3.743,0.504,6.588,0.504C135.57,324.379,142.024,319.1,142.024,310.194z"/>
                                                <path d="M202.709,297.681c-4.39,0-7.227,0.379-8.905,0.772v56.896c1.679,0.394,4.39,0.394,6.841,0.394
                                    		c17.809,0.126,29.424-9.677,29.424-30.449C230.195,307.231,219.611,297.681,202.709,297.681z"/>
                                                <path d="M315.458,0H121.811c-28.29,0-51.315,23.041-51.315,51.315v189.754h-5.012c-11.418,0-20.678,9.251-20.678,20.679v125.404
                                    		c0,11.427,9.259,20.677,20.678,20.677h5.012v22.995c0,28.305,23.025,51.315,51.315,51.315h264.223
                                    		c28.272,0,51.3-23.011,51.3-51.315V121.449L315.458,0z M99.053,284.379c6.06-1.024,14.578-1.796,26.579-1.796
                                    		c12.128,0,20.772,2.315,26.58,6.965c5.548,4.382,9.292,11.615,9.292,20.127c0,8.51-2.837,15.745-7.999,20.646
                                    		c-6.714,6.32-16.643,9.157-28.258,9.157c-2.585,0-4.902-0.128-6.714-0.379v31.096H99.053V284.379z M386.034,450.713H121.811
                                    		c-10.954,0-19.874-8.92-19.874-19.889v-22.995h246.31c11.42,0,20.679-9.25,20.679-20.677V261.748
                                    		c0-11.428-9.259-20.679-20.679-20.679h-246.31V51.315c0-10.938,8.921-19.858,19.874-19.858l181.89-0.19v67.233
                                    		c0,19.638,15.934,35.587,35.587,35.587l65.862-0.189l0.741,296.925C405.891,441.793,396.987,450.713,386.034,450.713z
                                    		 M174.065,369.801v-85.422c7.225-1.15,16.642-1.796,26.58-1.796c16.516,0,27.226,2.963,35.618,9.282
                                    		c9.031,6.714,14.704,17.416,14.704,32.781c0,16.643-6.06,28.133-14.453,35.224c-9.157,7.612-23.096,11.222-40.125,11.222
                                    		C186.191,371.092,178.966,370.446,174.065,369.801z M314.892,319.226v15.996h-31.23v34.973h-19.74v-86.966h53.16v16.122h-33.42
                                    		v19.875H314.892z"/>
                                            </g>
                                        </svg>
                                        <span className="text-sm text-gray-700 dark:text-gray-600">Select File</span>
                                        <input
                                            type="file"
                                            name="CV"
                                            id="CV"
                                            accept=".pdf"
                                            className="hidden w-[100%] rounded-md"
                                            onChange={(e) => {
                                                const fileName = e.target.files?.[0]?.name;
                                                if (fileName) {
                                                    const span = e.target.parentElement?.nextElementSibling;
                                                    if (span) {
                                                        span.textContent = fileName;
                                                        span.classList.add('text-green-500');
                                                    }
                                                }
                                            }}
                                        />
                                    </label>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 file-name"></span>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <button type="submit" className="">Create Employee</button> */}
                    <div
                        className="col-span-2 mt-5"
                    >
                        {errors.email || errors.phone || errors.birth_date || errors.salary ?
                            <>
                                <DisabledButton text="Fix Errors" />
                                <CancelButton text="Cancel" />
                            </>
                            :
                            <>
                                <SubmitButton text={header} />
                                <CancelButton text="Cancel" />
                            </>
                        }
                    </div>
                </Form>
            </div>
        </>
    )
}

export default EmployeesForm;