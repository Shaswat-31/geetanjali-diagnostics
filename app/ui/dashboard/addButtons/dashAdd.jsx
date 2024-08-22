import Link from 'next/link';

const dashAdd = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-center">
        <Link href="/patients/add" passHref>
          <button className="block px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600 transition">
            Add Patient
          </button>
        </Link>
      </div>
      <div className="flex justify-center">
        <Link href="/tests/add" passHref>
          <button className="block px-6 py-3 text-white bg-green-500 rounded hover:bg-green-600 transition">
            Add Test
          </button>
        </Link>
      </div>
    </div>
  );
};

export default dashAdd;
