
// patientToday.jsx

import { fetchPatientsToday } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/patients/patients.module.css"; // Use the same styles

const PatientTodayPage = async () => {
  const patients = await fetchPatientsToday();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Patients Added Today</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Serial</td>
            <td>Name</td>
            <td>Age/Sex</td>
            <td>Date</td>
            <td>Tests</td>
            <td>Cost Total</td>
            <td>Transaction Mode</td>
            <td>Doctor Referred</td>
            <td>Place</td>
            <td>Added By</td>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="10" className={styles.noData}>No patients added today.</td>
            </tr>
          ) : (
            patients.map((patient, index) => (
              <tr key={patient.id}>
                <td>{index + 1}.</td>
                <td>{patient.name}</td>
                <td>{patient.ageSex}</td>
                <td>{new Date(patient.date).toDateString()}</td>
                <td>{patient.tests}</td>
                <td>{patient.costTotal}</td>
                <td>{patient.transactionMode}</td>
                <td>{patient.doctorReferred}</td>
                <td>{patient.place}</td>
                <td>{patient.addedBy}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTodayPage;



// "use client"

// import styles from './chart.module.css'
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: "Sun",
//     visit: 4000,
//     click: 2400,
//   },
//   {
//     name: "Mon",
//     visit: 3000,
//     click: 1398,
//   },
//   {
//     name: "Tue",
//     visit: 2000,
//     click: 3800,
//   },
//   {
//     name: "Wed",
//     visit: 2780,
//     click: 3908,
//   },
//   {
//     name: "Thu",
//     visit: 1890,
//     click: 4800,
//   },
//   {
//     name: "Fri",
//     visit: 2390,
//     click: 3800,
//   },
//   {
//     name: "Sat",
//     visit: 3490,
//     click: 4300,
//   },
// ];

// const Chart = () => {
//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Weekly Recap</h2>
//       <ResponsiveContainer width="100%" height="90%">
//         <LineChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip contentStyle={{background:"#151c2c", border:"none"}}/>
//           <Legend />
//           <Line type="monotone" dataKey="visit" stroke="#8884d8" strokeDasharray="5 5" />
//           <Line type="monotone" dataKey="click" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

// export default Chart