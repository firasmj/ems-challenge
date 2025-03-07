import { useState } from "react";
import { Form } from "react-router";
import SubmitButton from "./Buttons";


interface TimeSheet {
    employee_id: number;
    // id: number;
    start_time: string;
    end_time: string;
    summary: string;
}

interface errors {
    end_time: string;
    start_time: string;
}

interface Employee {
    id: number;
    full_name: string;
}

type formProps = {
    method: 'post' | 'put';
    employees: Employee[];
    timesheet?: TimeSheet;
    // empId: number;
}

const TimesheetForm: React.FC<formProps> = ({ method, employees, timesheet }) => {

    const header = method === 'post' ? 'Create Timesheet' : 'Update Timesheet';

    const [errors, setErrors] = useState<errors>({
        end_time: '',
        start_time: ''
    });

    const [timesheetData, setTimesheetData] = useState<TimeSheet>({
        employee_id: timesheet?.employee_id || 0,
        // id: 0,
        start_time: timesheet?.start_time || '',
        end_time: timesheet?.end_time || '',
        summary: timesheet?.summary || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let error = false;

        switch (name) {
            case 'start_time':
                if (timesheetData.end_time !== '') {
                    if (value > timesheetData.end_time) {
                        setErrors({ ...errors, [name]: 'Start time cannot be after end time' } as errors);
                        setTimesheetData({ ...timesheetData, [name]: '' });
                        error = true;
                    } else {
                        setErrors({ ...errors, [name]: '' } as errors);
                        error = false;
                        setTimesheetData({ ...timesheetData, [name]: value });
                    }
                } else {
                    setTimesheetData({ ...timesheetData, [name]: value });
                }
                break;
            case 'end_time':
                if (timesheetData.start_time !== '') {
                    if (value < timesheetData.start_time) {
                        setErrors({ ...errors, [name]: 'End time cannot be before start time' } as errors);
                        setTimesheetData({ ...timesheetData, [name]: '' });
                        error = true;
                    } else {
                        setErrors({ ...errors, [name]: '' } as errors);
                        error = false;
                        setTimesheetData({ ...timesheetData, [name]: value });
                    }
                } else {
                    setTimesheetData({ ...timesheetData, [name]: value });
                }
                break;
        }
    }

    return (
        <div
            className="rounded-xl m-5 flex-col w-screen text-center justify-center bg-gray-200 p-5"
        >
            <div className="text-red-500 flex-col">
                <div className="text-red-500">{errors.end_time}</div>
                <div className="text-red-500">{errors.start_time}</div>
            </div>
            <h1 className="text-2xl font-[600]">{header}</h1>
            <br />
            <Form
                method={method}
                className="grid grid-cols-2 gap-2 gap-x-5"
            >
                <div
                    className="flex flex-col col-span-2"
                >
                    <label htmlFor="employee_id" className="justify-start text-start ml-2">Employee Name</label>
                    <select
                        name="employee_id"
                        id="employee_id"
                        className="bg-gray-100 p-2 rounded-md"
                        value={timesheetData.employee_id}
                        onChange={(e) => {
                            setTimesheetData({ ...timesheetData, employee_id: parseInt(e.target.value) });
                        }}
                        required
                    >
                        {employees.map((employee) => {
                            return <option value={employee.id}>{employee.full_name}</option>
                        })}

                    </select>
                </div>
                <div
                    className="flex flex-col"
                >
                    <label htmlFor="start_time" className="justify-start text-start ml-2">Start Time</label>
                    <input type="datetime-local" name="start_time" id="start_time"
                        className="bg-gray-100 p-2 rounded-md"
                        value={timesheetData.start_time}
                        onChange={handleChange}
                        required />
                </div>
                <div
                    className="flex flex-col"
                >
                    <label htmlFor="end_time" className="justify-start text-start ml-2">End Time</label>
                    <input type="datetime-local" name="end_time" id="end_time"
                        className="bg-gray-100 p-2 rounded-md"
                        value={timesheetData.end_time}
                        onChange={handleChange}
                    />
                </div>

                <div
                    className="col-span-2 flex flex-col mt-5"
                >
                    <label htmlFor="summary" className="justify-start text-start ml-2">Summary</label>
                    <textarea
                        name="summary"
                        id="summary"
                        className="bg-gray-100 p-2 rounded-md"
                        placeholder="Summary"
                        value={timesheetData.summary}
                        onChange={(e) => {
                            setTimesheetData({ ...timesheetData, summary: e.target.value });
                        }}
                        rows={5}
                    />
                </div>
                {/* <button type="submit" className="">Create Employee</button> */}
                <div
                    className="col-span-2 mt-5"
                >
                    <SubmitButton text={header} />
                </div>
            </Form>
        </div>
    )
}

export default TimesheetForm;