import { FaDownload } from 'react-icons/fa';

export default function DownloadBrochure() {
  return (
    <div id="download" className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Download Our Brochure</h2>
        <p className="text-gray-700 mb-6">
          Get to know more about our services and offerings. Download our brochure to explore all the details.
        </p>
        <a
          href="/geetanjali-pdf.pdf" 
          download
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          <FaDownload className="mr-2" />
          Download Now
        </a>
      </div>
    </div>
  );
}
