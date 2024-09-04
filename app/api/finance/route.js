import { getPatientsByDate } from '@/app/lib/data';
import { getStartOfMonth, getEndOfMonth } from '@/app/lib/dateUtils';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get('startDate') || getStartOfMonth();
  const endDate = searchParams.get('endDate') || getEndOfMonth();
  const q = searchParams.get('q') || '';

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  try {
    const patients = await getPatientsByDate(q, start, end);
    const summaryData = patients.map((patient) => ({
      name: patient.name,
      tests: patient.tests,
      doctorReferred: patient.doctorReferred,
      costTotal: patient.costTotal,
    }));

    return new Response(JSON.stringify(summaryData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}
