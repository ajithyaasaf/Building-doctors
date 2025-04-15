import { Link } from "wouter";
import { motion } from "framer-motion";
import { SERVICES } from "../../data/services";
import { fadeInUp } from "../../utils/animations";
import { FaYoutube, FaArrowRight } from "react-icons/fa";

const Services = () => {
  // Get top 6 services for homepage display
  const featuredServices = SERVICES.slice(0, 6);

  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp(0.3)}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider">
              Our Expertise
            </p>
          </div>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
            Comprehensive Building{" "}
            <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From waterproofing to structural repairs, we offer specialized
            services to address all your building maintenance and repair needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp((index % 3) * 0.1 + 0.3)}
              key={service.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all transform hover:-translate-y-2 hover:shadow-xl duration-300 group"
            >
              <div className="relative h-56">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
               {/*  {service.videoUrl && (
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <FaYoutube className="text-red-600" />
                  </div>
                )} */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-montserrat font-bold text-xl">
                    {service.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                  {service.description.split(".")[0]}.
                </p>

                {service.applications && service.applications.length > 0 && (
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    {service.applications.slice(0, 4).map((app, idx) => (
                      <div key={idx} className="flex items-center">
                        <img
                          src={app.icon}
                          alt={app.title}
                          className="w-6 h-6 mr-2"
                        />
                        <span className="text-xs text-gray-700 truncate">
                          {app.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {!service.applications &&
                  service.features &&
                  service.features.length > 0 && (
                    <ul className="space-y-1 mb-4">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <i className="fas fa-check text-primary mt-1 mr-2 text-xs"></i>
                          <span className="text-xs text-gray-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                <Link href={`/services#${service.slug}`}>
                  <span className="inline-flex items-center text-primary font-medium hover:text-primary/90 transition cursor-pointer text-sm">
                    Learn more <FaArrowRight className="ml-1 text-xs" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Services Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp(0.5)}
          className="text-center mt-10"
        >
          <Link href="/services">
            <span className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md font-medium transition cursor-pointer">
              View All Services <i className="fas fa-arrow-right ml-2"></i>
            </span>
          </Link>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp(0.6)}
          className="mt-16 bg-[#2b4c7e] rounded-xl overflow-hidden shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-3 p-8 md:p-12">
              <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-4">
                Not sure which service you need?
              </h2>
              <p className="text-gray-300 mb-6">
                Our experts will assess your building's condition and recommend
                the most effective solutions for your specific requirements.
              </p>
              <Link href="/contact">
                <span className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition cursor-pointer">
                  Request Free Consultation
                </span>
              </Link>
            </div>
            <div className="md:col-span-2 relative h-60 md:h-auto overflow-hidden">
              <img
                src="https://buildingdoctor.org/assets/images/consultation-bg.jpg"
                alt="Building Doctor Consultation"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
