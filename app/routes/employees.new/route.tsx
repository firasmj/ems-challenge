import { Form, redirect, type ActionFunction } from "react-router";
import EmployeesForm from "~/components/EmployeeForms";
import { getDB } from "~/db/getDB";
import path from "path";
import fs from "fs/promises";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // const photo = formData.get('photo') as File;
  // const cv = formData.get('cv') as File;
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadsDir, { recursive: true });

  async function handleFileUpload(file: File, prefix: string) {
    if (!file || file.size === 0) return null;

    const fileName = `${Date.now()}-${file.name}`;
    // const filePath = path.join(uploadsDir, fileName);
    // const buffer = Buffer.from(await file.arrayBuffer());
    // await fs.writeFile(filePath, buffer);     // we would use these lines if we are in a backend environment
    return `/uploads/${fileName}`;
  }
  // we need a server to handle the file uploads, it is not possible to upload files without a server
  // for now we will just return the file path as a string

  const photoPath = await handleFileUpload(formData.get('photo') as File, 'photo');
  const cvPath = await handleFileUpload(formData.get('CV') as File, 'CV');
  const idPath = await handleFileUpload(formData.get('ID') as File, 'ID');

  const data = [
    formData.get("full_name"),
    formData.get("email"),
    formData.get("phone"),
    formData.get("birth_date"),
    formData.get("job_title"),
    formData.get("department"),
    formData.get("salary"),
    formData.get("start_date"),
    formData.get("end_date"),
    photoPath || null,
    cvPath || null,
    idPath || null,
  ];

  const db = await getDB();
  await db.run(
    'INSERT INTO employees (full_name, email, phone, birth_date, job_title, department, salary, start_date, end_date, photo, cv, id_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    data
  );

  return redirect("/employees");
}

export default function NewEmployeePage() {
  return (
    <div
      className="container mt-4 mx-auto relative justify-items-center m-0 flex w-screen"
    >
      <EmployeesForm method="post" />
    </div>
  );
}
