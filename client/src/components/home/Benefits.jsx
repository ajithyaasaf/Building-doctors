import { Link } from "wouter";
import { BENEFITS, STATS } from "@/lib/constants";
import { 
  CheckCircle, 
  Award, 
  Clock, 
  Wrench, 
  Shield, 
  Star, 
  DollarSign,
  Headphones,
  Clipboard,
  ArrowRight
} from "lucide-react";

// Simpler icon mapping
const getIconComponent = (iconName) => {
  switch(iconName) {
    case "certificate": return Award;
    case "shield-alt": return Shield;
    case "tools": return Wrench;
    case "clipboard-list": return Clipboard;
    case "star": return Star;
    case "dollar-sign": return DollarSign;
    case "clock": return Clock;
    case "shield": return Shield;
    case "headphones": return Headphones;
    default: return CheckCircle;
  }
};

const Benefits = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-2xl md:text-4xl mb-4">
            Why Choose <span className="text-primary">OM Vinayaga Associates</span>?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            We offer comprehensive solutions for all your building repair and maintenance needs, 
            backed by the trusted Building Doctor brand.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BENEFITS.map((benefit) => {
            const IconComponent = getIconComponent(benefit.icon);
            
            return (
              <div 
                key={benefit.id}
                className="bg-white rounded-xl p-8 shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="mb-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <IconComponent size={24} />
                  </div>
                </div>
                <h3 className="font-montserrat font-bold text-xl mb-4">{benefit.title}</h3>
                <p className="text-gray-600 mb-6 text-base">{benefit.description}</p>
                <div className="flex items-center text-sm text-primary font-medium cursor-pointer group">
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-20 bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">
                Delivering Excellence Across Madurai
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Our commitment to quality and customer satisfaction has made us the preferred 
                choice for building repair services in Madurai and surrounding areas.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                {STATS.map((stat) => (
                  <div key={stat.id} className="bg-gray-50 p-6 rounded-xl text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <p className="text-gray-700 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
              
              <Link to="/about" className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-medium transition shadow-md hover:shadow-lg">
                About Our Company
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="relative min-h-[400px] md:h-auto bg-gradient-to-tr from-primary/80 to-primary">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;