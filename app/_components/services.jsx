export default function Services() {
    const services = [
      {
        title: "ECG and X-Ray at Your Doorstep",
        description:
          "Experience the convenience of having ECG and X-ray diagnostics performed right at your home and hospital, available 24/7.",
      },
      {
        title: "Quality with Affordability",
        description:
          "We provide a wide range of tests at the lowest prices in the region, ensuring affordability without compromising quality.",
      },
      {
        title: "Services at Your Doorstep",
        description:
          "Get reliable diagnostics services delivered to your doorstep, available 24 hours a day, 7 days a week.",
      },
    ];
  
    return (
      <section id="services" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  