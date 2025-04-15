import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { SERVICES } from "../../data/services";
import { fadeInUp } from "../../utils/animations";
import { 
  ArrowRight, 
  Play, 
  ChevronRight, 
  Zap, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Calendar,
  Building,
  Hammer,
  Wrench,
  Phone
} from "lucide-react";

const getIconByName = (name) => {
  const icons = {
    wrench: <Wrench className="w-5 h-5" />,
    hammer: <Hammer className="w-5 h-5" />,
    dollar: <DollarSign className="w-5 h-5" />,
    time: <Clock className="w-5 h-5" />,
    calendar: <Calendar className="w-5 h-5" />,
    building: <Building className="w-5 h-5" />,
    zap: <Zap className="w-5 h-5" />,
    default: <CheckCircle className="w-5 h-5" />,
  };
  
  return icons[name] || icons.default;
};

const Services = () => {
  // Get top 6 services for homepage display
  const featuredServices = SERVICES.slice(0, 6);
  const [activeService, setActiveService] = useState(null);

  // Helper function to generate a random color from a predetermined palette
  const getServiceColor = (id) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600', 
      'from-green-500 to-green-600',
      'from-yellow-500 to-yellow-600',
      'from-rose-500 to-rose-600',
      'from-teal-500 to-teal-600',
    ];
    
    return colors[(id - 1) % colors.length];
  };

  return (
    <section
      id="services"
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background design elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-50 rounded-full translate-y-1/2 -translate-x-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp(0.3)}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Expert Solutions</span>
          </div>
          
          <h2 className="font-montserrat font-bold text-3xl md:text-5xl mb-6">
            Comprehensive Building{" "}
            <span className="text-primary relative">
              Solutions
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full"></span>
            </span>
          </h2>
          
          <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            From waterproofing to structural repairs, we offer specialized
            services to address all your building maintenance and repair needs.
          </p>
        </motion.div>

        {/* Services Grid - Modern Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredServices.map((service, index) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp((index % 3) * 0.1 + 0.3)}
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg group relative h-[460px]"
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              {/* Top image section */}
              <div className="relative h-56 overflow-hidden">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-tr ${getServiceColor(service.id)}`}></div>
                )}
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Play button for video if available */}
                {service.videoUrl && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 cursor-pointer hover:bg-white/50 transition-all">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                )}
                
                {/* Service badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <span className="text-xs font-medium text-white">{service.category || 'Repair'}</span>
                </div>
                
                {/* Service title */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-montserrat font-bold text-2xl leading-tight">
                    {service.title}
                  </h3>
                </div>
              </div>
              
              {/* Content section */}
              <div className="p-6 pt-5 pb-7 relative">
                {/* Description with gradient fade effect */}
                <div className="mb-4 relative">
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {service.description.split(".")[0]}.
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent"></div>
                </div>

                {/* Features list */}
                <div className="space-y-2 mb-6">
                  {(service.features || []).slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <div className="text-primary mt-0.5 flex-shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700 line-clamp-1">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Action button with animated arrow */}
                <Link href={`/services#${service.slug}`}>
                  <span className="inline-flex items-center text-primary font-medium cursor-pointer text-sm group/link">
                    Learn more 
                    <span className="relative overflow-hidden ml-2 flex items-center">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 transform group-hover/link:translate-x-6" />
                      <ArrowRight className="w-4 h-4 absolute transition-transform duration-300 transform -translate-x-6 group-hover/link:translate-x-0" />
                    </span>
                  </span>
                </Link>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent transform rotate-45 translate-y-[-50%] translate-x-[50%]"></div>
                </div>
              </div>
              
              {/* Service panel overlay on hover - Slides from bottom */}
              <div 
                className={`absolute inset-0 bg-gradient-to-tr ${getServiceColor(service.id)} text-white transform transition-all duration-500 ease-out 
                  ${activeService === service.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
              >
                <div className="p-8 h-full flex flex-col">
                  <h3 className="font-montserrat font-bold text-2xl mb-4">{service.title}</h3>
                  <p className="text-white/90 mb-6">{service.description.split(".")[0]}.</p>
                  
                  {/* Service highlights */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Clock className="w-4 h-4" />
                      </div>
                      <span className="text-sm">Fast Service</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-sm">Quality Work</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <span className="text-sm">Fair Pricing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className="text-sm">Warranty</span>
                    </div>
                  </div>
                  
                  <Link href={`/services#${service.slug}`} className="mt-auto">
                    <span className="inline-flex items-center px-6 py-3 bg-white text-primary font-medium rounded-full group/btn">
                      View Service Details
                      <ChevronRight className="ml-1 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-24 h-24 border-4 border-white/10 rounded-full"></div>
                  <div className="absolute bottom-12 left-4 w-16 h-16 border-4 border-white/10 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Services Button - Modern Design */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp(0.5)}
          className="text-center mt-16"
        >
          <Link href="/services">
            <span className="relative inline-flex group/btn">
              <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-primary/20 rounded-lg transform transition-transform group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"></span>
              <span className="relative inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-medium transition shadow-lg">
                View All Services
                <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </span>
          </Link>
        </motion.div>

        {/* CTA Banner - Enhanced Design */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp(0.6)}
          className="mt-24 rounded-3xl overflow-hidden shadow-2xl relative bg-white border border-gray-100 group/cta"
        >
          {/* Background gradient effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/70 opacity-0 group-hover/cta:opacity-5 transition-opacity duration-700"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-7 p-8 md:p-12 lg:p-16 relative">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
              
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Phone className="w-4 h-4 mr-2" />
                <span>Expert Consultation</span>
              </div>
              
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
                Not sure which service <br className="hidden md:block" /> your building needs?
              </h2>
              
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Our experts will assess your building's condition and recommend
                the most effective solutions tailored to your specific requirements.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-2">
                  <div className="text-primary mt-1">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Detailed Inspection</h4>
                    <p className="text-sm text-gray-600">Thorough examination of your building structure</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-primary mt-1">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Expert Recommendations</h4>
                    <p className="text-sm text-gray-600">Clear solutions from experienced professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-primary mt-1">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">No Obligation</h4>
                    <p className="text-sm text-gray-600">Free consultation with transparent pricing</p>
                  </div>
                </div>
              </div>
              
              <Link href="/contact">
                <span className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition shadow-md hover:shadow-xl group/link">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
            
            <div className="md:col-span-5 relative min-h-[300px] md:min-h-[400px]">
              {/* Image section with modern overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 md:bg-none z-10"></div>
              
              {/* Using static image for consultation background */}
              <img
                src="https://buildingdoctor.org/assets/images/consultation-bg.jpg"
                alt="Building Doctor Consultation"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Fallback gradient if image fails to load */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-gray-900 opacity-0">
                {/* This will only show if image fails to load */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-end">
                    <div className="w-10 h-60 bg-white/20 mx-0.5"></div>
                    <div className="w-16 h-80 bg-white/20 mx-0.5"></div>
                    <div className="w-14 h-96 bg-white/20 mx-0.5"></div>
                    <div className="w-12 h-72 bg-white/20 mx-0.5"></div>
                    <div className="w-10 h-48 bg-white/20 mx-0.5"></div>
                  </div>
                </div>
              </div>
              
              {/* Card overlay */}
              <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-[260px] z-20 md:transform md:transition-transform md:group-hover/cta:translate-y-[-10px]">
                <span className="text-sm text-primary font-medium mb-2 block">Response Time</span>
                <h3 className="text-2xl font-bold mb-3">24-48 Hours</h3>
                <p className="text-sm text-gray-600">Quick response to your consultation requests</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
