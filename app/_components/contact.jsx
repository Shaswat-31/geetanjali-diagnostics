export default function Contact() {
    return (
      <section id="contact" className="bg-gradient-to-r from-green-400 to-green-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <p className="text-lg mb-4">
            Geetanjali diagnostics, partnered with thyrocare, is dedicated to meeting the diagnostic needs of the people of Umerkote and Nabarangpur district with precision and care.
          </p>
          <p className="text-lg mb-4">Phone: 70777 09676 (Raj Gouda)</p>
          <p className="text-lg mb-4">Address: Hospital Road, Next to 1st gate- SDH Umerkote, 764073</p>
          <form className="max-w-md mx-auto mt-8">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 mb-4 rounded-lg border border-gray-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 mb-4 rounded-lg border border-gray-300"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-4 mb-4 rounded-lg border border-gray-300 h-32"
            ></textarea>
            <button className="w-full bg-blue-600 p-4 rounded-lg text-white font-semibold hover:bg-blue-700 transition duration-300">
              Send Message
            </button>
          </form>
        </div>
      </section>
    );
  }
  