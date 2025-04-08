import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "./pages_jsx/HomePage.jsx";
import NotFound from "./pages/not-found.jsx";
import ServicesPage from "./pages_jsx/ServicesPage.jsx";
import ProductsPage from "./pages_jsx/ProductsPage.jsx";
import ProductDetailPage from "./pages_jsx/ProductDetailPage.jsx";
import AboutPage from "./pages_jsx/AboutPage.jsx";
import ContactPage from "./pages_jsx/ContactPage.jsx";
import AdminPage from "./pages_jsx/AdminPage.jsx";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsappButton from "./components/WhatsappButton";
import HomePageForm from "./components/HomePageForm";
import ExitIntentPopup from "./components/ExitIntentPopup";
import { pageTransition } from "./utils/animations";

function App() {
  const [location] = useLocation();

  // Create a PageWrapper component for animations
  const PageWrapper = ({ children }) => (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );

  // Show the popup form only on the homepage
  const showPopupForm = location === "/";

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <Header />
      <main className="flex-grow w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <Switch key={location} location={location}>
            <Route path="/">
              <PageWrapper>
                <HomePage />
              </PageWrapper>
            </Route>
            <Route path="/services">
              <PageWrapper>
                <ServicesPage />
              </PageWrapper>
            </Route>
            <Route path="/products">
              <PageWrapper>
                <ProductsPage />
              </PageWrapper>
            </Route>
            <Route path="/products/:id">
              {(params) => (
                <PageWrapper>
                  <ProductDetailPage params={params} />
                </PageWrapper>
              )}
            </Route>
            <Route path="/about">
              <PageWrapper>
                <AboutPage />
              </PageWrapper>
            </Route>
            <Route path="/contact">
              <PageWrapper>
                <ContactPage />
              </PageWrapper>
            </Route>
            <Route path="/admin">
              <PageWrapper>
                <AdminPage />
              </PageWrapper>
            </Route>
            <Route>
              <PageWrapper>
                <NotFound />
              </PageWrapper>
            </Route>
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsappButton />
      {showPopupForm && <HomePageForm />}
      <ExitIntentPopup />
      <Toaster />
    </div>
  );
}

export default App;