import { useLoaderData, Form, redirect } from "react-router";
import { getDB } from "~/db/getDB";
import type { ActionFunction } from "react-router";
import TimesheetForm from "~/components/TimesheetForms";

export async function loader() {
  const db = await getDB();
  const employees = await db.all('SELECT id, full_name FROM employees');
  return { employees };
}


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");
  const summary = formData.get("summary");

  const db = await getDB();
  await db.run(
    'INSERT INTO timesheets (employee_id, start_time, end_time, summary) VALUES (?, ?, ?, ?)',
    [employee_id, start_time, end_time, summary]
  );

  return redirect("/timesheets");
}

export default function NewTimesheetPage() {
  const { employees } = useLoaderData();
  return (
    <div
      className="container mt-4 mx-auto relative justify-items-center m-0 flex w-screen"
    >
      <TimesheetForm method="post" employees={employees} />
    </div>
  );
}
