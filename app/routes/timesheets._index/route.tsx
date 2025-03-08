import { Link, useLoaderData, type LoaderFunction } from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";
import CalendarApp from "~/components/Calendar";
import {SubmitButton} from "~/components/Buttons";

export const loader: LoaderFunction = async ({ request }) => {

  const url = new URL(request.url);

  const db = await getDB();

  const query = url.searchParams.get("query") || "";

  const selection = url.searchParams.get('employee_id') || '';
  let timesheetsAndEmployees: any[] = [];
  if(query){
    timesheetsAndEmployees = await db.all(
      "SELECT timesheets.*, employees.full_name, employees.id AS employee_id, summary FROM timesheets JOIN employees ON timesheets.employee_id = employees.id WHERE employees.full_name LIKE ? OR timesheets.summary LIKE ?",
      [`%${query}%`, `%${query}%`]
    );
  }else
  if (selection && selection !== '-1') {
    timesheetsAndEmployees = await db.all(
      "SELECT timesheets.*, employees.full_name, employees.id AS employee_id, summary FROM timesheets JOIN employees ON timesheets.employee_id = employees.id WHERE employees.id = ?",
      [selection]
    );
  } else {
    timesheetsAndEmployees = await db.all(
      "SELECT timesheets.*, employees.full_name, employees.id AS employee_id, summary FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
    );
  }


  const employees = await db.all(
    "SELECT * FROM employees"
  );
  return { timesheetsAndEmployees, employees, selection };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployees, employees, selection } = useLoaderData();

  const [tableView, setTableView] = useState<boolean>(true);
  const [employee, setEmployee] = useState<string>(selection != '' ? selection : -1);

  return (
    <div>
      <div>
        <div
          className="container mt-4 mx-auto flex-col relative justify-items-center m-0 flex w-screen p-3"
        >
          <div className="flex justify-between flex-row mb-10">
            <h1 className="text-2xl font-bold">Timesheets</h1>
            <div
              className="flex flex-col col-span-2"
            >
              <label htmlFor="employee_id" className="justify-start text-start ml-2">Choose Employee</label>
              <div
                className="flex lg:flex-row sm:flex-col"
              >
              <form method="get" action={'/timesheets'} onChange={(e) => (e.target as HTMLFormElement).form.submit()}>
                <select
                  name="employee_id"
                  id="employee_id"
                  className="bg-gray-100 p-2 rounded-md mr-8"
                  value={employee}
                  defaultValue={-1}
                  onChange={(e) => {
                    setEmployee(e.target.value);
                  }}
                  required
                >
                  <option value="-1">All Employees</option>
                  {employees.map((employee: any) => {
                    return <option value={employee.id}>{employee.full_name}</option>
                  })}
                </select>
              </form>
              <form method="get" action={'/timesheets'}>
                <input type="text"
                  name="query"
                  placeholder="Search timesheet..."
                  className="bg-gray-100 p-2 rounded-md mr-2"
                />
                <SubmitButton text="Search" />
              </form>
              </div>
            </div>
            <button onClick={() => {
              setTableView(!tableView);
            }}>
              {tableView ? (
                <div className="flex flex-row items-center bg-gray-200 p-2 rounded-xl drop-shadow-md hover:brightness-110 scale-90">
                  <svg fill="#000000" version="1.1" opacity={0.3} id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    width="40px" height="40px" viewBox="0 0 610.398 610.398"
                    className="mr-5 -mt-1">
                    <g>
                      <g>
                        <path d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052
			c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553
			V35.544V24.992C180.791,11.188,171.291,0,159.567,0z"/>
                        <path d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992
			h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z"/>
                        <path d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117
			V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818
			c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764
			V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z"/>
                        <path d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
			c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z"/>
                        <path d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017
			c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z"/>
                        <path d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
			c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z"/>
                        <path d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017
			c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z"/>
                        <path d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
			c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z"/>
                        <path d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032
			c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z"/>
                        <path d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
			c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z"/>
                        <path d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032
			c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z"/>
                      </g>
                    </g>
                  </svg>
                  <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9.5H21M3 14.5H21M8 4.5V19.5M6.2 19.5H17.8C18.9201 19.5 19.4802 19.5 19.908 19.282C20.2843 19.0903 20.5903 18.7843 20.782 18.408C21 17.9802 21 17.4201 21 16.3V7.7C21 6.5799 21 6.01984 20.782 5.59202C20.5903 5.21569 20.2843 4.90973 19.908 4.71799C19.4802 4.5 18.9201 4.5 17.8 4.5H6.2C5.0799 4.5 4.51984 4.5 4.09202 4.71799C3.71569 4.90973 3.40973 5.21569 3.21799 5.59202C3 6.01984 3 6.57989 3 7.7V16.3C3 17.4201 3 17.9802 3.21799 18.408C3.40973 18.7843 3.71569 19.0903 4.09202 19.282C4.51984 19.5 5.07989 19.5 6.2 19.5Z" stroke="#000000" stroke-width="2" />
                  </svg>
                </div>
              ) : (
                <div className="flex flex-row items-center bg-gray-200 p-2 rounded-xl drop-shadow-md hover:brightness-110 scale-90">
                  <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    width="40px" height="40px" viewBox="0 0 610.398 610.398"
                    className="mr-5 -mt-1">
                    <g>
                      <g>
                        <path d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052
			c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553
			V35.544V24.992C180.791,11.188,171.291,0,159.567,0z"/>
                        <path d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992
			h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z"/>
                        <path d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117
			V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818
			c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764
			V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z"/>
                        <path d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
			c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z"/>
                        <path d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017
			c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z"/>
                        <path d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
			c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z"/>
                        <path d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017
			c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z"/>
                        <path d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
			c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z"/>
                        <path d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032
			c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z"/>
                        <path d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
			c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z"/>
                        <path d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032
			c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z"/>
                      </g>
                    </g>
                  </svg>
                  <svg width="50px" height="50px" opacity={0.3} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9.5H21M3 14.5H21M8 4.5V19.5M6.2 19.5H17.8C18.9201 19.5 19.4802 19.5 19.908 19.282C20.2843 19.0903 20.5903 18.7843 20.782 18.408C21 17.9802 21 17.4201 21 16.3V7.7C21 6.5799 21 6.01984 20.782 5.59202C20.5903 5.21569 20.2843 4.90973 19.908 4.71799C19.4802 4.5 18.9201 4.5 17.8 4.5H6.2C5.0799 4.5 4.51984 4.5 4.09202 4.71799C3.71569 4.90973 3.40973 5.21569 3.21799 5.59202C3 6.01984 3 6.57989 3 7.7V16.3C3 17.4201 3 17.9802 3.21799 18.408C3.40973 18.7843 3.71569 19.0903 4.09202 19.282C4.51984 19.5 5.07989 19.5 6.2 19.5Z" stroke="#000000" stroke-width="2" />
                  </svg>
                </div>
              )}
            </button>
          </div>

        </div>
      </div>
      {tableView ? (
        <table
          className="container table-auto w-[80vw] mx-auto bg-gray-100 p-5"
        >
          <thead>
            <tr className="">
              <th className="text-start px-4 py-2">Full Name</th>
              <th className="text-start px-4 py-2">Start Time</th>
              <th className="text-start px-4 py-2">End Time</th>
              <th className="text-start px-4 py-2">Summary</th>
            </tr>
          </thead>
          <tbody>
            {timesheetsAndEmployees.map((timesheet: any) => (
              <tr className="hover:bg-gray-200 hover:drop-shadow-sm">
                <td className="px-4 py-2">
                  <Link to={`/timesheets/${timesheet.id}`}>
                    {timesheet.full_name}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <Link to={`/timesheets/${timesheet.id}`}>
                    {timesheet.start_time}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <Link to={`/timesheets/${timesheet.id}`}>
                    {timesheet.end_time}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <Link to={`/timesheets/${timesheet.id}`}>
                    {timesheet.summary}
                  </Link>
                </td>
                <td>
                  <Link to={`/timesheets/${timesheet.id}`}
                    className="bg-gray-300 hover:bg-gray-700 hover:text-white text-black font-bold py-2 px-4 rounded"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div
          className="justify-center flex w-screen"
        >
          <CalendarApp timesheets={timesheetsAndEmployees} />
        </div>
      )}
    </div>
  );
}
