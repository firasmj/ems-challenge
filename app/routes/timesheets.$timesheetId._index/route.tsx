import { useLoaderData, Form, redirect } from "react-router";
import { getDB } from "~/db/getDB";
import type { ActionFunction, LoaderFunction } from "react-router";
import TimesheetForm from "~/components/TimesheetForms";

export const loader: LoaderFunction = async ({ params }) => {
  const { timesheetId } = params;
  const db = await getDB();
  const employees = await db.all('SELECT id, full_name FROM employees');
  const timesheet = await db.get('SELECT * FROM timesheets WHERE id = ?', [timesheetId]);
  return { employees, timesheet };
}

export const action: ActionFunction = async ({ request, params }) => {
  const { timesheetId } = params;

  const formData = await request.formData();
  const employee_id = formData.get("employee_id"); 
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");
  const summary = formData.get("summary");

  const db = await getDB();
  await db.run(
    'UPDATE timesheets SET employee_id = ?, start_time = ?, end_time = ?, summary = ? WHERE id = ?',
    [employee_id, start_time, end_time, summary, timesheetId]
  );

  return redirect("/timesheets");
}

export default function NewTimesheetPage() {
  const { employees, timesheet } = useLoaderData(); 
  console.log(JSON.stringify(timesheet));

  return (
    <div
      className="container mt-4 mx-auto relative justify-items-center m-0 flex w-screen"
    >
      <TimesheetForm method="put" employees={employees} timesheet={timesheet}/>
    </div>
  );
}
