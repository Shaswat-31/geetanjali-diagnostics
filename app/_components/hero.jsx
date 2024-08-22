import Image from 'next/image';

export default function Hero() {
  return (
    <section  id="home" className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 mt-6">Welcome to Geetanjali diagnostics</h1>
        <p className="text-lg md:text-2xl mb-8">
          Partnered with Thyrocare to provide world-class healthcare services in Umerkote and Nabarangpur district.
        </p>
        <div className="w-full max-w-lg">
          <Image
            src="/geetanjali-diagnostics.png" // Ensure the image is in the public folder
            alt="geetanjali-diagnostics"
            width={500}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
