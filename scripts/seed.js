import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, '../database.yaml');
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, 'utf8'));

const {
  'sqlite_path': sqlitePath,
} = dbConfig;

const db = new sqlite3.Database(sqlitePath);

const employees = [
  {
    full_name: "John Doe",
    email: "john.doe@example.com",
    phone: "+123456789",
    birth_date: "1990-01-15",
    job_title: "Software Engineer",
    department: "IT",
    salary: 75000,
    start_date: "2020-06-01",
    end_date: "",
  },
  {
    full_name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+987654321",
    birth_date: "1985-03-22",
    job_title: "Product Manager",
    department: "Product",
    salary: 90000,
    start_date: "2018-09-15",
    end_date: "",
  },
  {
    full_name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "+123987456",
    birth_date: "1992-11-30",
    job_title: "HR Specialist",
    department: "Human Resources",
    salary: 60000,
    start_date: "2021-02-10",
    end_date: "",
  },
  {
    full_name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+456789123",
    birth_date: "1988-07-19",
    job_title: "Marketing Coordinator",
    department: "Marketing",
    salary: 55000,
    start_date: "2019-04-05",
    end_date: "",
  },
  {
    full_name: "Sophia Davis",
    email: "sophia.davis@example.com",
    phone: "+321654987",
    birth_date: "1995-06-25",
    job_title: "Data Analyst",
    department: "Analytics",
    salary: 70000,
    start_date: "2020-11-20",
    end_date: "",
  },
];

const timesheets = [
  {
    employee_id: 1,
    start_time: '2025-02-10 08:00:00',
    end_time: '2025-02-10 17:00:00',
  },
  {
    employee_id: 2,
    start_time: '2025-02-11 12:00:00',
    end_time: '2025-02-11 17:00:00',
  },
  {
    employee_id: 3,
    start_time: '2025-02-12 07:00:00',
    end_time: '2025-02-12 16:00:00',
  },
];


const insertData = (table, data) => {
  const columns = Object.keys(data[0]).join(', ');
  const placeholders = Object.keys(data[0]).map(() => '?').join(', ');

  const insertStmt = db.prepare(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`);

  data.forEach(row => {
    insertStmt.run(Object.values(row));
  });

  insertStmt.finalize();
};

db.serialize(() => {
  insertData('employees', employees);
  insertData('timesheets', timesheets);
});

db.close(err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database seeded successfully.');
  }
});

