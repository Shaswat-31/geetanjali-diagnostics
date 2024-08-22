import * as XLSX from 'xlsx';
import { getPatientsByDate } from '@/app/lib/data';
import { getStartOfMonth, getEndOfMonth } from '@/app/lib/dateUtils';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get('startDate') || getStartOfMonth();
  const endDate = searchParams.get('endDate') || getEndOfMonth();
  const q = searchParams.get('q') || '';

  const start = new Date(startDate);
  const end = new Date(endDate);

  try {
    const patients = await getPatientsByDate(q, start, end);
    const data = patients.map((patient, index) => ({
      Serial: index + 1,
      Name: patient.name,
      AgeSex: patient.ageSex,
      Date: new Date(patient.date).toDateString(),
      Tests:patient.tests,
      CostTotal: patient.costTotal,
      TransactionMode: patient.transactionMode,
      DoctorReferred: patient.doctorReferred,
      Place: patient.place,
      AddedBy: patient.addedBy,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Patients');
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename=patients_data.xlsx',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
