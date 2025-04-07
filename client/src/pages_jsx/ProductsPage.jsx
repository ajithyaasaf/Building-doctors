import { useState, useEffect } from "react";
import { Link } from "wouter";
import { PRODUCT_CATEGORIES, FEATURED_PRODUCTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Sample Products Array (24 products - 4 per each of the 6 categories)
const PRODUCTS = [
  // Waterproofing Category (6 products)
  {
    id: 1,
    name: "BD Terrace Shield",
    description: "Premium terrace waterproofing compound with UV resistance and thermal insulation properties.",
    price: 2450,
    image: "https://images.unsplash.com/photo-1620177123861-bbe8116e5de7?q=80&w=500&auto=format&fit=crop",
    rating: 4.8,
    isBestseller: true,
    category: "waterproofing"
  },
  {
    id: 2,
    name: "BD Basement Guard",
    description: "Specialized waterproofing solution for basements and underground structures.",
    price: 2750,
    image: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
    isBestseller: false,
    category: "waterproofing"
  },
  {
    id: 3,
    name: "BD Wet Area Protector",
    description: "Bathroom and wet area waterproofing system that prevents seepage and leakage.",
    price: 1950,
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
    isBestseller: false,
    category: "waterproofing"
  },
  {
    id: 4,
    name: "BD External Wall Shield",
    description: "External wall waterproofing coating with weather resistance and anti-fungal properties.",
    price: 2250,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
    isBestseller: false,
    category: "waterproofing"
  },
  
  // Repair Category (5 products)
  {
    id: 5,
    name: "BD Crack Seal Pro",
    description: "High-strength polymer-modified crack filling compound for structural cracks in concrete and masonry.",
    price: 1850,
    image: "https://images.unsplash.com/photo-1590644286459-69bb243399f9?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
    isBestseller: true,
    category: "repair"
  },
  {
    id: 6,
    name: "BD Concrete Repair Mortar",
    description: "Ready-to-use polymer-modified mortar for repairing damaged concrete surfaces.",
    price: 1650,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
    isBestseller: false,
    category: "repair"
  },
  {
    id: 7,
    name: "BD Steel Protector",
    description: "Anti-corrosive coating for reinforcement steel to prevent rusting and extend durability.",
    price: 1450,
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
    isBestseller: false,
    category: "repair"
  },
  {
    id: 8,
    name: "BD Surface Restorer",
    description: "Surface preparation and restoration compound for old concrete and masonry surfaces.",
    price: 1750,
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb38?q=80&w=500&auto=format&fit=crop",
    rating: 4.4,
    isBestseller: false,
    category: "repair"
  },
  
  // Admixtures Category (4 products)
  {
    id: 9,
    name: "BD Concrete Booster",
    description: "Advanced concrete admixture that enhances strength, reduces water content, and improves workability.",
    price: 1350,
    image: "https://images.unsplash.com/photo-1621113171451-de62152b9e27?q=80&w=500&auto=format&fit=crop",
    rating: 4.9,
    isBestseller: true,
    isNew: true,
    category: "admixtures"
  },
  {
    id: 10,
    name: "BD Quick Set",
    description: "Rapid setting accelerator admixture for concrete and mortars in cold weather conditions.",
    price: 1250,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
    isBestseller: false,
    category: "admixtures"
  },
  {
    id: 11,
    name: "BD Flow Enhancer",
    description: "Superplasticizer admixture for highly flowable concrete with reduced water content.",
    price: 1450,
    image: "https://images.unsplash.com/photo-1518107616985-bd48230d3b20?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
    isBestseller: false,
    category: "admixtures"
  },
  {
    id: 12,
    name: "BD Air Entrainer",
    description: "Air-entraining admixture for improved freeze-thaw resistance in concrete.",
    price: 1150,
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb38?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
    isBestseller: false,
    category: "admixtures"
  },
  
  // Sealants Category (3 products)
  {
    id: 13,
    name: "BD Flex Seal",
    description: "Flexible polyurethane sealant for expansion joints and areas subject to movement with excellent adhesion.",
    price: 950,
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
    isBestseller: true,
    category: "sealants"
  },
  {
    id: 14,
    name: "BD Silicone Pro",
    description: "Premium silicone sealant for sanitaryware, glass, and aluminum with anti-fungal properties.",
    price: 850,
    image: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
    isBestseller: false,
    category: "sealants"
  },
  {
    id: 15,
    name: "BD Construction Seal",
    description: "High-strength construction sealant for bonding various building materials with weather resistance.",
    price: 750,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=500&auto=format&fit=crop",
    rating: 4.4,
    isBestseller: false,
    category: "sealants"
  },
  {
    id: 16,
    name: "BD Floor Joint Seal",
    description: "Specialized sealant for floor joints with high abrasion resistance and flexibility.",
    price: 1050,
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb38?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
    isBestseller: false,
    category: "sealants"
  },
  
  // Coatings Category (4 products)
  {
    id: 17,
    name: "BD Weatherproof Exterior",
    description: "Premium exterior wall coating with UV resistance, water repellency, and long-lasting color.",
    price: 2150,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=500&auto=format&fit=crop",
    rating: 4.8,
    isBestseller: true,
    category: "coatings"
  },
  {
    id: 18,
    name: "BD Anti-Algae Paint",
    description: "Specialized exterior coating with anti-algae and anti-fungal properties for humid climates.",
    price: 2350,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
    isBestseller: false,
    category: "coatings"
  },
  {
    id: 19,
    name: "BD Floor Guard",
    description: "Epoxy floor coating for industrial and commercial floors with chemical resistance and durability.",
    price: 2550,
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb38?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
    isBestseller: false,
    category: "coatings"
  },
  {
    id: 20,
    name: "BD Roof Cool",
    description: "Heat reflective roof coating that reduces indoor temperature and energy consumption.",
    price: 2250,
    image: "https://images.unsplash.com/photo-1472342139520-1aa49517fed8?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
    isBestseller: false,
    isNew: true,
    category: "coatings"
  },
  
  // Additional products (4 more to make it 24 total)
  {
    id: 21,
    name: "BD Grout Master",
    description: "High-strength tile grout with water resistance and anti-stain properties.",
    price: 1150,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
    isBestseller: false,
    category: "repair"
  },
  {
    id: 22,
    name: "BD Elastomeric Membrane",
    description: "Flexible waterproofing membrane for terraces and wet areas with crack-bridging ability.",
    price: 2150,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
    isBestseller: false,
    category: "waterproofing"
  },
  {
    id: 23,
    name: "BD Industrial Hardener",
    description: "Concrete floor hardener and dustproofer for industrial floors with high abrasion resistance.",
    price: 1950,
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb38?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
    isBestseller: false,
    category: "admixtures"
  },
  {
    id: 24,
    name: "BD Acrylic Primer",
    description: "Water-based acrylic primer for concrete and masonry surfaces before painting or coating.",
    price: 1250,
    image: "https://images.unsplash.com/photo-1520516098521-83b3ee731303?q=80&w=500&auto=format&fit=crop",
    rating: 4.4,
    isBestseller: false,
    category: "coatings"
  }
];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  
  // Dummy variables for loading and error states since we're using hardcoded data
  const isLoading = false;
  const error = null;
  
  useEffect(() => {
    document.title = "Our Products | OM Vinayaga Associates";
    setCurrentPage(1); // Reset to first page when category changes
  }, [activeCategory, searchTerm]);
  
  // Filter products based on search term and category
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="pt-24">
      <section className="bg-[#2b4c7e] py-20 relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">Our Products</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-200">
              Premium quality construction chemicals and building solutions
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
                <h2 className="font-bold text-xl mb-4">Categories</h2>
                <div className="space-y-2">
                  {PRODUCT_CATEGORIES.map((category) => (
                    <button 
                      key={category.id}
                      className={cn(
                        "w-full text-left py-2 px-3 rounded-md transition text-sm font-medium",
                        activeCategory === category.id 
                          ? "bg-primary text-white" 
                          : "hover:bg-gray-100 text-gray-600"
                      )}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                      {activeCategory === category.id && (
                        <i className="fas fa-check ml-2"></i>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h2 className="font-bold text-xl mb-4">Search Products</h2>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-bold text-primary mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Our experts are available to help you choose the right products for your building needs.
                  </p>
                  <a 
                    href="tel:+919342968038" 
                    className="inline-flex items-center text-primary font-medium text-sm hover:underline"
                  >
                    <i className="fas fa-phone-alt mr-2"></i> Contact our team
                  </a>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="w-full md:w-3/4">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Products</h3>
                  <p className="text-red-600">There was an error loading the products. Please try again later.</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-xl">
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Sort by:</span>
                      <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Popularity</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Rating</option>
                      </select>
                    </div>
                  </div>
                  
                  {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                      <i className="fas fa-search text-gray-300 text-5xl mb-4"></i>
                      <h3 className="text-xl font-bold mb-2">No products found</h3>
                      <p className="text-gray-600 mb-4">Try changing your search criteria or browse all products</p>
                      <button 
                        onClick={() => {
                          setSearchTerm("");
                          setActiveCategory("all");
                        }}
                        className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition"
                      >
                        View All Products
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentProducts.map((product) => (
                          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
                            <div className="relative h-64 overflow-hidden">
                              {product.image ? (
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-300 group-hover:scale-105 transition-transform duration-300"></div>
                              )}
                              {product.isBestseller && (
                                <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">BESTSELLER</div>
                              )}
                              {product.isNew && (
                                <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">NEW</div>
                              )}
                            </div>
                            <div className="p-5">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-montserrat font-semibold text-lg">{product.name}</h3>
                                <div className="flex items-center">
                                  <i className="fas fa-star text-yellow-400 text-xs"></i>
                                  <span className="text-sm ml-1">{product.rating?.toFixed(1) || "N/A"}</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-primary">₹{product.price?.toLocaleString('en-IN') || 0}</span>
                                <Link href={`/products/${product.id}`}>
                                  <a className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded text-sm transition">
                                    View Details
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="mt-10 flex justify-center">
                          <div className="flex space-x-1">
                            <button 
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <i className="fas fa-chevron-left"></i>
                            </button>
                            
                            {[...Array(totalPages)].map((_, i) => {
                              const pageNum = i + 1;
                              
                              // Show first page, last page, current page and one page before and after current
                              if (
                                pageNum === 1 || 
                                pageNum === totalPages || 
                                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                              ) {
                                return (
                                  <button 
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={cn(
                                      "px-4 py-2 border rounded-md text-sm font-medium",
                                      currentPage === pageNum 
                                        ? "bg-primary text-white" 
                                        : "hover:bg-gray-50"
                                    )}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              } else if (
                                pageNum === 2 || 
                                pageNum === totalPages - 1
                              ) {
                                return <span key={pageNum} className="px-4 py-2">...</span>;
                              }
                              
                              return null;
                            })}
                            
                            <button 
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <i className="fas fa-chevron-right"></i>
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Download Catalog Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3 p-8 md:p-12">
                <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">Download Our Complete Product Catalog</h2>
                <p className="text-gray-600 mb-6">
                  Get detailed information about our full range of 100+ specialized building repair and maintenance products, including specifications, applications, and benefits.
                </p>
                <a 
                  href="#download-catalog" 
                  className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition"
                >
                  <i className="fas fa-download mr-2"></i> Download Catalog
                </a>
              </div>
              <div className="md:col-span-2 relative h-60 md:h-auto">
                <div className="absolute inset-0 w-full h-full bg-gray-400"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;