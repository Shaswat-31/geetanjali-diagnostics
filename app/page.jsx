// page.jsx
import Hero from "./_components/hero";
import Highlights from "./_components/highlights";
import Services from "./_components/services";
import Contact from "./_components/contact";
import Navbar from "./_components/navbar";
import DownloadBrochure from "./_components/downloadBrochure";
const Homepage = () => {

  return (
    <div>
      <Navbar/>
     <Hero />
      <Highlights />
      <Services />
      <DownloadBrochure/>
      <Contact />
      </div>
  );
};

export default Homepage;
