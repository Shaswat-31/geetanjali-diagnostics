export default function Highlights() {
    const highlights = [
      "Quality Assurance and Transparency",
      "Affordable Testing",
      "Fast Results",
      "Comprehensive Services",
      "Vocal for Local",
      "Continuous Improvement and Excellence",
    ];
  
    return (
      <section id="highlights" className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Core Highlights of Geetanjali diagnostics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">{highlight}</h3>
                <p className="text-gray-700">
                  {highlight === "Quality Assurance and Transparency" && "Maintains high standards through rigorous quarterly inspections. Quality certificates are provided free of cost upon inquiry."}
                  {highlight === "Affordable Testing" && "Offers a vast variety of tests at the lowest prices in the region."}
                  {highlight === "Fast Results" && "Delivers test results within 12 hours for the entire district and within 3 hours for the local area."}
                  {highlight === "Comprehensive Services" && "Provides round-the-clock diagnostic services, 24/7."}
                  {highlight === "Vocal for Local" && "All tests are conducted in-house with optional outsourcing to reputed labs."}
                  {highlight === "Continuous Improvement and Excellence" && "We are upgrading every day to maintain global standards and provide up-to-date medical facilities."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  