// server/index.ts
import express2 from "express";

// server/routes_firebase.ts
import { createServer } from "http";

// server/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  remove
} from "firebase/database";
import MemStoreSession from "memorystore";
import session from "express-session";
var firebaseConfig = {
  apiKey: "AIzaSyCMOdvQW248_4ul-ciFEEmuOghb4xdS3gs",
  authDomain: "jpfinserv-892e1.firebaseapp.com",
  databaseURL: "https://jpfinserv-892e1-default-rtdb.firebaseio.com",
  projectId: "jpfinserv-892e1",
  storageBucket: "jpfinserv-892e1.firebasestorage.app",
  messagingSenderId: "166323272116",
  appId: "1:166323272116:web:f440b4c76307ea463c5ae1",
  measurementId: "G-GBS93JTW1R"
};
var firebaseApp = initializeApp(firebaseConfig);
var database = getDatabase(firebaseApp);
var MemoryStore = MemStoreSession(session);
var sessionStore = new MemoryStore({
  checkPeriod: 864e5
  // Prune expired entries every 24h
});
var FirebaseStorage = class {
  checkDatabaseAvailability() {
    if (!firebaseConfig.databaseURL) {
      console.warn("Firebase Database URL is not set. Using in-memory fallback data.");
      return false;
    }
    return true;
  }
  // ===============================
  // User Methods
  // ===============================
  async getUser(id) {
    try {
      const snapshot = await get(ref(database, `users/${id}`));
      return snapshot.exists() ? snapshot.val() : void 0;
    } catch (error) {
      console.error("Firebase getUser error:", error);
      return void 0;
    }
  }
  async getUserByUsername(username) {
    try {
      const snapshot = await get(ref(database, "users"));
      if (!snapshot.exists()) return void 0;
      const users2 = snapshot.val();
      const userIds = Object.keys(users2);
      for (const id of userIds) {
        if (users2[id].username === username) {
          return { ...users2[id], id: parseInt(id) };
        }
      }
      return void 0;
    } catch (error) {
      console.error("Firebase getUserByUsername error:", error);
      return void 0;
    }
  }
  async createUser(user) {
    try {
      let id = 1;
      const snapshot = await get(ref(database, "users"));
      if (snapshot.exists()) {
        const users2 = snapshot.val();
        const userIds = Object.keys(users2).map((id2) => parseInt(id2));
        if (userIds.length > 0) {
          id = Math.max(...userIds) + 1;
        }
      }
      const newUser = { ...user, id };
      await set(ref(database, `users/${id}`), newUser);
      return newUser;
    } catch (error) {
      console.error("Firebase createUser error:", error);
      throw new Error("Failed to create user in Firebase");
    }
  }
  // ===============================
  // Product Methods
  // ===============================
  async getProducts() {
    try {
      const snapshot = await get(ref(database, "products"));
      if (!snapshot.exists()) return [];
      const products2 = snapshot.val();
      return Object.keys(products2).map((key) => ({
        ...products2[key],
        id: parseInt(key)
      }));
    } catch (error) {
      console.error("Firebase getProducts error:", error);
      return [];
    }
  }
  async getProduct(id) {
    try {
      const snapshot = await get(ref(database, `products/${id}`));
      return snapshot.exists() ? { ...snapshot.val(), id } : void 0;
    } catch (error) {
      console.error("Firebase getProduct error:", error);
      return void 0;
    }
  }
  async createProduct(product) {
    try {
      let id = 1;
      const snapshot = await get(ref(database, "products"));
      if (snapshot.exists()) {
        const products2 = snapshot.val();
        const productIds = Object.keys(products2).map((id2) => parseInt(id2));
        if (productIds.length > 0) {
          id = Math.max(...productIds) + 1;
        }
      }
      const newProduct = { ...product, id };
      await set(ref(database, `products/${id}`), newProduct);
      return newProduct;
    } catch (error) {
      console.error("Firebase createProduct error:", error);
      throw new Error("Failed to create product in Firebase");
    }
  }
  async updateProduct(id, product) {
    try {
      const snapshot = await get(ref(database, `products/${id}`));
      if (!snapshot.exists()) return void 0;
      const existingProduct = snapshot.val();
      const updatedProduct = { ...existingProduct, ...product, id };
      await set(ref(database, `products/${id}`), updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.error("Firebase updateProduct error:", error);
      return void 0;
    }
  }
  async deleteProduct(id) {
    try {
      const snapshot = await get(ref(database, `products/${id}`));
      if (!snapshot.exists()) return false;
      await remove(ref(database, `products/${id}`));
      return true;
    } catch (error) {
      console.error("Firebase deleteProduct error:", error);
      return false;
    }
  }
  // ===============================
  // Service Methods
  // ===============================
  async getServices() {
    try {
      const snapshot = await get(ref(database, "services"));
      if (!snapshot.exists()) return [];
      const services2 = snapshot.val();
      return Object.keys(services2).map((key) => ({
        ...services2[key],
        id: parseInt(key)
      }));
    } catch (error) {
      console.error("Firebase getServices error:", error);
      return [];
    }
  }
  async getService(id) {
    try {
      const snapshot = await get(ref(database, `services/${id}`));
      return snapshot.exists() ? { ...snapshot.val(), id } : void 0;
    } catch (error) {
      console.error("Firebase getService error:", error);
      return void 0;
    }
  }
  async createService(service) {
    try {
      let id = 1;
      const snapshot = await get(ref(database, "services"));
      if (snapshot.exists()) {
        const services2 = snapshot.val();
        const serviceIds = Object.keys(services2).map((id2) => parseInt(id2));
        if (serviceIds.length > 0) {
          id = Math.max(...serviceIds) + 1;
        }
      }
      const newService = { ...service, id };
      await set(ref(database, `services/${id}`), newService);
      return newService;
    } catch (error) {
      console.error("Firebase createService error:", error);
      throw new Error("Failed to create service in Firebase");
    }
  }
  async updateService(id, service) {
    try {
      const snapshot = await get(ref(database, `services/${id}`));
      if (!snapshot.exists()) return void 0;
      const existingService = snapshot.val();
      const updatedService = { ...existingService, ...service, id };
      await set(ref(database, `services/${id}`), updatedService);
      return updatedService;
    } catch (error) {
      console.error("Firebase updateService error:", error);
      return void 0;
    }
  }
  async deleteService(id) {
    try {
      const snapshot = await get(ref(database, `services/${id}`));
      if (!snapshot.exists()) return false;
      await remove(ref(database, `services/${id}`));
      return true;
    } catch (error) {
      console.error("Firebase deleteService error:", error);
      return false;
    }
  }
  // ===============================
  // Testimonial Methods
  // ===============================
  async getTestimonials() {
    try {
      const snapshot = await get(ref(database, "testimonials"));
      if (!snapshot.exists()) return [];
      const testimonials2 = snapshot.val();
      return Object.keys(testimonials2).map((key) => ({
        ...testimonials2[key],
        id: parseInt(key)
      }));
    } catch (error) {
      console.error("Firebase getTestimonials error:", error);
      return [];
    }
  }
  async getTestimonial(id) {
    try {
      const snapshot = await get(ref(database, `testimonials/${id}`));
      return snapshot.exists() ? { ...snapshot.val(), id } : void 0;
    } catch (error) {
      console.error("Firebase getTestimonial error:", error);
      return void 0;
    }
  }
  async createTestimonial(testimonial) {
    try {
      let id = 1;
      const snapshot = await get(ref(database, "testimonials"));
      if (snapshot.exists()) {
        const testimonials2 = snapshot.val();
        const testimonialIds = Object.keys(testimonials2).map((id2) => parseInt(id2));
        if (testimonialIds.length > 0) {
          id = Math.max(...testimonialIds) + 1;
        }
      }
      const newTestimonial = { ...testimonial, id };
      await set(ref(database, `testimonials/${id}`), newTestimonial);
      return newTestimonial;
    } catch (error) {
      console.error("Firebase createTestimonial error:", error);
      throw new Error("Failed to create testimonial in Firebase");
    }
  }
  async updateTestimonial(id, testimonial) {
    try {
      const snapshot = await get(ref(database, `testimonials/${id}`));
      if (!snapshot.exists()) return void 0;
      const existingTestimonial = snapshot.val();
      const updatedTestimonial = { ...existingTestimonial, ...testimonial, id };
      await set(ref(database, `testimonials/${id}`), updatedTestimonial);
      return updatedTestimonial;
    } catch (error) {
      console.error("Firebase updateTestimonial error:", error);
      return void 0;
    }
  }
  async deleteTestimonial(id) {
    try {
      const snapshot = await get(ref(database, `testimonials/${id}`));
      if (!snapshot.exists()) return false;
      await remove(ref(database, `testimonials/${id}`));
      return true;
    } catch (error) {
      console.error("Firebase deleteTestimonial error:", error);
      return false;
    }
  }
  // ===============================
  // FAQ Methods
  // ===============================
  async getFaqs() {
    try {
      const snapshot = await get(ref(database, "faqs"));
      if (!snapshot.exists()) return [];
      const faqs2 = snapshot.val();
      return Object.keys(faqs2).map((key) => ({
        ...faqs2[key],
        id: parseInt(key)
      }));
    } catch (error) {
      console.error("Firebase getFaqs error:", error);
      return [];
    }
  }
  async getFaq(id) {
    try {
      const snapshot = await get(ref(database, `faqs/${id}`));
      return snapshot.exists() ? { ...snapshot.val(), id } : void 0;
    } catch (error) {
      console.error("Firebase getFaq error:", error);
      return void 0;
    }
  }
  async createFaq(faq) {
    try {
      let id = 1;
      const snapshot = await get(ref(database, "faqs"));
      if (snapshot.exists()) {
        const faqs2 = snapshot.val();
        const faqIds = Object.keys(faqs2).map((id2) => parseInt(id2));
        if (faqIds.length > 0) {
          id = Math.max(...faqIds) + 1;
        }
      }
      const newFaq = { ...faq, id };
      await set(ref(database, `faqs/${id}`), newFaq);
      return newFaq;
    } catch (error) {
      console.error("Firebase createFaq error:", error);
      throw new Error("Failed to create FAQ in Firebase");
    }
  }
  async updateFaq(id, faq) {
    try {
      const snapshot = await get(ref(database, `faqs/${id}`));
      if (!snapshot.exists()) return void 0;
      const existingFaq = snapshot.val();
      const updatedFaq = { ...existingFaq, ...faq, id };
      await set(ref(database, `faqs/${id}`), updatedFaq);
      return updatedFaq;
    } catch (error) {
      console.error("Firebase updateFaq error:", error);
      return void 0;
    }
  }
  async deleteFaq(id) {
    try {
      const snapshot = await get(ref(database, `faqs/${id}`));
      if (!snapshot.exists()) return false;
      await remove(ref(database, `faqs/${id}`));
      return true;
    } catch (error) {
      console.error("Firebase deleteFaq error:", error);
      return false;
    }
  }
  // ===============================
  // Contact Methods
  // ===============================
  async getContacts() {
    try {
      const snapshot = await get(ref(database, "contacts"));
      if (!snapshot.exists()) return [];
      const contacts2 = snapshot.val();
      return Object.keys(contacts2).map((key) => ({
        ...contacts2[key],
        id: parseInt(key),
        createdAt: new Date(contacts2[key].createdAt)
      }));
    } catch (error) {
      console.error("Firebase getContacts error:", error);
      return [];
    }
  }
  async createContact(contact) {
    try {
      let id = 1;
      const snapshot = await get(ref(database, "contacts"));
      if (snapshot.exists() && snapshot.val() !== null) {
        const contacts2 = snapshot.val();
        if (contacts2 && Object.keys(contacts2).length > 0) {
          const contactIds = Object.keys(contacts2).filter((key) => !isNaN(parseInt(key))).map((key) => parseInt(key));
          if (contactIds.length > 0) {
            id = Math.max(...contactIds) + 1;
          }
        }
      }
      if (isNaN(id)) {
        id = 1;
        console.warn("ID calculation resulted in NaN, defaulting to 1");
      }
      const createdAt = /* @__PURE__ */ new Date();
      const newContact = {
        ...contact,
        id,
        createdAt
      };
      if (isNaN(newContact.id)) {
        throw new Error("Cannot create contact with invalid ID (NaN)");
      }
      await set(ref(database, `contacts/${id}`), {
        ...newContact,
        createdAt: createdAt.toISOString()
        // Store as string in Firebase
      });
      return newContact;
    } catch (error) {
      console.error("Firebase createContact error:", error);
      throw new Error("Failed to create contact in Firebase");
    }
  }
  async deleteContact(id) {
    try {
      const snapshot = await get(ref(database, `contacts/${id}`));
      if (!snapshot.exists()) return false;
      await remove(ref(database, `contacts/${id}`));
      return true;
    } catch (error) {
      console.error("Firebase deleteContact error:", error);
      return false;
    }
  }
  // ===============================
  // Inquiry Methods
  // ===============================
  async getInquiries() {
    try {
      const snapshot = await get(ref(database, "inquiries"));
      if (!snapshot.exists()) return [];
      const inquiries2 = snapshot.val();
      return Object.keys(inquiries2).map((key) => ({
        ...inquiries2[key],
        id: parseInt(key),
        createdAt: inquiries2[key].createdAt ? new Date(inquiries2[key].createdAt) : null
      }));
    } catch (error) {
      console.error("Firebase getInquiries error:", error);
      return [];
    }
  }
  async createInquiry(inquiry) {
    try {
      let id = 1;
      const snapshot = await get(ref(database, "inquiries"));
      if (snapshot.exists() && snapshot.val() !== null) {
        const inquiries2 = snapshot.val();
        if (inquiries2 && Object.keys(inquiries2).length > 0) {
          const inquiryIds = Object.keys(inquiries2).filter((key) => !isNaN(parseInt(key))).map((key) => parseInt(key));
          if (inquiryIds.length > 0) {
            id = Math.max(...inquiryIds) + 1;
          }
        }
      }
      if (isNaN(id)) {
        id = 1;
        console.warn("ID calculation resulted in NaN, defaulting to 1");
      }
      const createdAt = /* @__PURE__ */ new Date();
      const newInquiry = {
        ...inquiry,
        id,
        createdAt
      };
      if (isNaN(newInquiry.id)) {
        throw new Error("Cannot create inquiry with invalid ID (NaN)");
      }
      await set(ref(database, `inquiries/${id}`), {
        ...newInquiry,
        createdAt: createdAt.toISOString()
        // Store as string in Firebase
      });
      return newInquiry;
    } catch (error) {
      console.error("Firebase createInquiry error:", error);
      throw new Error("Failed to create inquiry in Firebase");
    }
  }
  async deleteInquiry(id) {
    try {
      const snapshot = await get(ref(database, `inquiries/${id}`));
      if (!snapshot.exists()) return false;
      await remove(ref(database, `inquiries/${id}`));
      return true;
    } catch (error) {
      console.error("Firebase deleteInquiry error:", error);
      return false;
    }
  }
  // ===============================
  // Intent Form Methods (Exit Intent Popup)
  // ===============================
  async getIntents() {
    try {
      const snapshot = await get(ref(database, "intents"));
      if (!snapshot.exists()) return [];
      const intents2 = snapshot.val();
      return Object.keys(intents2).map((key) => ({
        ...intents2[key],
        id: parseInt(key),
        createdAt: intents2[key].createdAt ? new Date(intents2[key].createdAt) : null
      }));
    } catch (error) {
      console.error("Firebase getIntents error:", error);
      return [];
    }
  }
  async createIntent(intent) {
    try {
      let id = 1;
      const snapshot = await get(ref(database, "intents"));
      if (snapshot.exists() && snapshot.val() !== null) {
        const intents2 = snapshot.val();
        if (intents2 && Object.keys(intents2).length > 0) {
          const intentIds = Object.keys(intents2).filter((key) => !isNaN(parseInt(key))).map((key) => parseInt(key));
          if (intentIds.length > 0) {
            id = Math.max(...intentIds) + 1;
          }
        }
      }
      if (isNaN(id)) {
        id = 1;
        console.warn("ID calculation resulted in NaN, defaulting to 1");
      }
      const createdAt = /* @__PURE__ */ new Date();
      const newIntent = {
        ...intent,
        id,
        createdAt
      };
      if (isNaN(newIntent.id)) {
        throw new Error("Cannot create intent with invalid ID (NaN)");
      }
      await set(ref(database, `intents/${id}`), {
        ...newIntent,
        createdAt: createdAt.toISOString()
        // Store as string in Firebase
      });
      return newIntent;
    } catch (error) {
      console.error("Intent creation error:", error);
      throw new Error("Failed to create intent form submission in Firebase");
    }
  }
  async deleteIntent(id) {
    try {
      const snapshot = await get(ref(database, `intents/${id}`));
      if (!snapshot.exists()) return false;
      await remove(ref(database, `intents/${id}`));
      return true;
    } catch (error) {
      console.error("Firebase deleteIntent error:", error);
      return false;
    }
  }
};
var firebaseStorage = new FirebaseStorage();

// server/storage.ts
var storage = {
  // User methods
  getUser: (id) => firebaseStorage.getUser(id),
  getUserByUsername: (username) => firebaseStorage.getUserByUsername(username),
  createUser: (user) => firebaseStorage.createUser(user),
  // Product methods
  getProducts: () => firebaseStorage.getProducts(),
  getProduct: (id) => firebaseStorage.getProduct(id),
  createProduct: (product) => firebaseStorage.createProduct(product),
  updateProduct: (id, product) => firebaseStorage.updateProduct(id, product),
  deleteProduct: (id) => firebaseStorage.deleteProduct(id),
  // Service methods
  getServices: () => firebaseStorage.getServices(),
  getService: (id) => firebaseStorage.getService(id),
  createService: (service) => firebaseStorage.createService(service),
  updateService: (id, service) => firebaseStorage.updateService(id, service),
  deleteService: (id) => firebaseStorage.deleteService(id),
  // Testimonial methods
  getTestimonials: () => firebaseStorage.getTestimonials(),
  getTestimonial: (id) => firebaseStorage.getTestimonial(id),
  createTestimonial: (testimonial) => firebaseStorage.createTestimonial(testimonial),
  updateTestimonial: (id, testimonial) => firebaseStorage.updateTestimonial(id, testimonial),
  deleteTestimonial: (id) => firebaseStorage.deleteTestimonial(id),
  // FAQ methods
  getFaqs: () => firebaseStorage.getFaqs(),
  getFaq: (id) => firebaseStorage.getFaq(id),
  createFaq: (faq) => firebaseStorage.createFaq(faq),
  updateFaq: (id, faq) => firebaseStorage.updateFaq(id, faq),
  deleteFaq: (id) => firebaseStorage.deleteFaq(id),
  // Contact methods
  getContacts: () => firebaseStorage.getContacts(),
  createContact: (contact) => firebaseStorage.createContact(contact),
  deleteContact: (id) => firebaseStorage.deleteContact(id),
  // Inquiry methods
  getInquiries: () => firebaseStorage.getInquiries(),
  createInquiry: (inquiry) => firebaseStorage.createInquiry(inquiry),
  deleteInquiry: (id) => firebaseStorage.deleteInquiry(id),
  // Intent form methods
  getIntents: () => firebaseStorage.getIntents(),
  createIntent: (intent) => firebaseStorage.createIntent(intent),
  deleteIntent: (id) => firebaseStorage.deleteIntent(id),
  // Session store
  sessionStore
};

// server/routes_firebase.ts
import { z as z2 } from "zod";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, real, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  consent: boolean("consent").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be valid"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(5, "Message must be at least 5 characters"),
  consent: z.boolean().refine((val) => val === true, "You must agree to the terms")
});
var inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  issueType: text("issue_type").notNull(),
  message: text("message"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow()
});
var inquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.string().length(0)),
  phone: z.string().min(5, "Phone number is required"),
  issueType: z.string().optional().or(z.string()),
  message: z.string().optional().or(z.string().length(0)),
  address: z.string().optional().or(z.string().length(0))
});
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  image: text("image").notNull(),
  rating: real("rating").notNull().default(4),
  isBestseller: boolean("is_bestseller").default(false),
  isNew: boolean("is_new").default(false),
  category: varchar("category", { length: 50 }).notNull()
});
var productSchema = createInsertSchema(products).omit({
  id: true
});
var services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  features: text("features").array().notNull(),
  slug: varchar("slug", { length: 50 }).notNull()
});
var serviceSchema = createInsertSchema(services).omit({
  id: true
});
var testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  rating: real("rating").notNull(),
  content: text("content").notNull(),
  hasVideo: boolean("has_video").default(false)
});
var testimonialSchema = createInsertSchema(testimonials).omit({
  id: true
});
var faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 255 }).notNull(),
  answer: text("answer").notNull()
});
var faqSchema = createInsertSchema(faqs).omit({
  id: true
});
var intents = pgTable("intents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  consent: boolean("consent").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var intentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(5, "Phone number is required"),
  service: z.string().default("Urgent Consultation"),
  message: z.string().default("Building repair inquiry"),
  consent: z.boolean().refine((val) => val === true, "You must agree to the terms")
});

// server/routes_firebase.ts
async function registerRoutes(app2) {
  app2.get("/api/contacts", async (req, res) => {
    try {
      const contacts2 = await storage.getContacts();
      res.status(200).json(contacts2);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch contacts"
      });
    }
  });
  app2.post("/api/contacts", async (req, res) => {
    try {
      const parsedData = contactSchema.parse(req.body);
      const newContact = await storage.createContact(parsedData);
      res.status(200).json({
        success: true,
        message: "Contact form submitted successfully",
        contact: newContact
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        console.log("Contact form validation error:", JSON.stringify(error.errors, null, 2));
        console.log("Contact form data received:", JSON.stringify(req.body, null, 2));
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        console.error("Contact creation error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to process contact form"
        });
      }
    }
  });
  app2.delete("/api/contacts/:id", async (req, res) => {
    try {
      const contactId = parseInt(req.params.id);
      const success = await storage.deleteContact(contactId);
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Contact submission not found"
        });
      }
      res.status(200).json({
        success: true,
        message: "Contact submission deleted successfully"
      });
    } catch (error) {
      console.error("Contact deletion error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete contact submission"
      });
    }
  });
  app2.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries2 = await storage.getInquiries();
      res.status(200).json(inquiries2);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch inquiries"
      });
    }
  });
  app2.post("/api/inquiries", async (req, res) => {
    try {
      const parsedData = inquirySchema.parse(req.body);
      const newInquiry = await storage.createInquiry({
        name: parsedData.name,
        email: parsedData.email || null,
        phone: parsedData.phone,
        issueType: parsedData.issueType || "",
        message: parsedData.message || null,
        address: parsedData.address || null
      });
      res.status(200).json({
        success: true,
        message: "Inquiry submitted successfully",
        inquiry: newInquiry
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid inquiry data",
          errors: error.errors
        });
      } else {
        console.error("Inquiry creation error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to process inquiry"
        });
      }
    }
  });
  app2.delete("/api/inquiries/:id", async (req, res) => {
    try {
      const inquiryId = parseInt(req.params.id);
      const success = await storage.deleteInquiry(inquiryId);
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Inquiry not found"
        });
      }
      res.status(200).json({
        success: true,
        message: "Inquiry deleted successfully"
      });
    } catch (error) {
      console.error("Inquiry deletion error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete inquiry"
      });
    }
  });
  app2.get("/api/products", async (req, res) => {
    try {
      const { category, search } = req.query;
      let products2 = await storage.getProducts();
      if (category && category !== "all") {
        products2 = products2.filter(
          (product) => product.category === category
        );
      }
      if (search && typeof search === "string") {
        const searchTerm = search.toLowerCase();
        products2 = products2.filter(
          (product) => product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)
        );
      }
      res.status(200).json({
        success: true,
        products: products2
      });
    } catch (error) {
      console.error("Product fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch products"
      });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      res.status(200).json({
        success: true,
        product
      });
    } catch (error) {
      console.error("Product fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch product"
      });
    }
  });
  app2.post("/api/products", async (req, res) => {
    try {
      const parsedData = productSchema.parse(req.body);
      const newProduct = await storage.createProduct({
        ...parsedData,
        rating: parsedData.rating || 4,
        isBestseller: parsedData.isBestseller || false,
        isNew: parsedData.isNew || false
      });
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: newProduct
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid product data",
          errors: error.errors
        });
      } else {
        console.error("Product creation error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to add product"
        });
      }
    }
  });
  app2.put("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const parsedData = productSchema.parse(req.body);
      const existingProduct = await storage.getProduct(productId);
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      const updatedProduct = await storage.updateProduct(productId, {
        ...parsedData,
        rating: parsedData.rating || existingProduct.rating,
        isBestseller: parsedData.isBestseller !== void 0 ? parsedData.isBestseller : existingProduct.isBestseller,
        isNew: parsedData.isNew !== void 0 ? parsedData.isNew : existingProduct.isNew
      });
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid product data",
          errors: error.errors
        });
      } else {
        console.error("Product update error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to update product"
        });
      }
    }
  });
  app2.delete("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const success = await storage.deleteProduct(productId);
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      res.status(200).json({
        success: true,
        message: "Product deleted successfully"
      });
    } catch (error) {
      console.error("Product deletion error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete product"
      });
    }
  });
  app2.get("/api/services", async (req, res) => {
    try {
      const services2 = await storage.getServices();
      res.status(200).json(services2);
    } catch (error) {
      console.error("Services fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch services"
      });
    }
  });
  app2.get("/api/services/:id", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      const service = await storage.getService(serviceId);
      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }
      res.status(200).json(service);
    } catch (error) {
      console.error("Service fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch service"
      });
    }
  });
  app2.post("/api/services", async (req, res) => {
    try {
      const parsedData = serviceSchema.parse(req.body);
      const newService = await storage.createService(parsedData);
      res.status(201).json({
        success: true,
        message: "Service added successfully",
        service: newService
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid service data",
          errors: error.errors
        });
      } else {
        console.error("Service creation error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to add service"
        });
      }
    }
  });
  app2.put("/api/services/:id", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      const parsedData = serviceSchema.parse(req.body);
      const updatedService = await storage.updateService(serviceId, parsedData);
      if (!updatedService) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }
      res.status(200).json({
        success: true,
        message: "Service updated successfully",
        service: updatedService
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid service data",
          errors: error.errors
        });
      } else {
        console.error("Service update error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to update service"
        });
      }
    }
  });
  app2.delete("/api/services/:id", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      const success = await storage.deleteService(serviceId);
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }
      res.status(200).json({
        success: true,
        message: "Service deleted successfully"
      });
    } catch (error) {
      console.error("Service deletion error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete service"
      });
    }
  });
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials2 = await storage.getTestimonials();
      res.status(200).json(testimonials2);
    } catch (error) {
      console.error("Testimonials fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch testimonials"
      });
    }
  });
  app2.get("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonialId = parseInt(req.params.id);
      const testimonial = await storage.getTestimonial(testimonialId);
      if (!testimonial) {
        return res.status(404).json({
          success: false,
          message: "Testimonial not found"
        });
      }
      res.status(200).json(testimonial);
    } catch (error) {
      console.error("Testimonial fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch testimonial"
      });
    }
  });
  app2.post("/api/testimonials", async (req, res) => {
    try {
      const parsedData = testimonialSchema.parse(req.body);
      const newTestimonial = await storage.createTestimonial({
        ...parsedData,
        hasVideo: parsedData.hasVideo || false
      });
      res.status(201).json({
        success: true,
        message: "Testimonial added successfully",
        testimonial: newTestimonial
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid testimonial data",
          errors: error.errors
        });
      } else {
        console.error("Testimonial creation error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to add testimonial"
        });
      }
    }
  });
  app2.put("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonialId = parseInt(req.params.id);
      const parsedData = testimonialSchema.parse(req.body);
      const existingTestimonial = await storage.getTestimonial(testimonialId);
      if (!existingTestimonial) {
        return res.status(404).json({
          success: false,
          message: "Testimonial not found"
        });
      }
      const updatedTestimonial = await storage.updateTestimonial(testimonialId, {
        ...parsedData,
        hasVideo: parsedData.hasVideo !== void 0 ? parsedData.hasVideo : existingTestimonial.hasVideo
      });
      res.status(200).json({
        success: true,
        message: "Testimonial updated successfully",
        testimonial: updatedTestimonial
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid testimonial data",
          errors: error.errors
        });
      } else {
        console.error("Testimonial update error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to update testimonial"
        });
      }
    }
  });
  app2.delete("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonialId = parseInt(req.params.id);
      const success = await storage.deleteTestimonial(testimonialId);
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Testimonial not found"
        });
      }
      res.status(200).json({
        success: true,
        message: "Testimonial deleted successfully"
      });
    } catch (error) {
      console.error("Testimonial deletion error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete testimonial"
      });
    }
  });
  app2.get("/api/faqs", async (req, res) => {
    try {
      const faqs2 = await storage.getFaqs();
      res.status(200).json(faqs2);
    } catch (error) {
      console.error("FAQs fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch FAQs"
      });
    }
  });
  app2.get("/api/faqs/:id", async (req, res) => {
    try {
      const faqId = parseInt(req.params.id);
      const faq = await storage.getFaq(faqId);
      if (!faq) {
        return res.status(404).json({
          success: false,
          message: "FAQ not found"
        });
      }
      res.status(200).json(faq);
    } catch (error) {
      console.error("FAQ fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch FAQ"
      });
    }
  });
  app2.post("/api/faqs", async (req, res) => {
    try {
      const parsedData = faqSchema.parse(req.body);
      const newFaq = await storage.createFaq(parsedData);
      res.status(201).json({
        success: true,
        message: "FAQ added successfully",
        faq: newFaq
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid FAQ data",
          errors: error.errors
        });
      } else {
        console.error("FAQ creation error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to add FAQ"
        });
      }
    }
  });
  app2.put("/api/faqs/:id", async (req, res) => {
    try {
      const faqId = parseInt(req.params.id);
      const parsedData = faqSchema.parse(req.body);
      const updatedFaq = await storage.updateFaq(faqId, parsedData);
      if (!updatedFaq) {
        return res.status(404).json({
          success: false,
          message: "FAQ not found"
        });
      }
      res.status(200).json({
        success: true,
        message: "FAQ updated successfully",
        faq: updatedFaq
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid FAQ data",
          errors: error.errors
        });
      } else {
        console.error("FAQ update error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to update FAQ"
        });
      }
    }
  });
  app2.delete("/api/faqs/:id", async (req, res) => {
    try {
      const faqId = parseInt(req.params.id);
      const success = await storage.deleteFaq(faqId);
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "FAQ not found"
        });
      }
      res.status(200).json({
        success: true,
        message: "FAQ deleted successfully"
      });
    } catch (error) {
      console.error("FAQ deletion error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete FAQ"
      });
    }
  });
  app2.get("/api/intents", async (req, res) => {
    try {
      const intents2 = await storage.getIntents();
      res.status(200).json(intents2);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch intent form submissions"
      });
    }
  });
  app2.post("/api/intent", async (req, res) => {
    try {
      const parsedData = intentSchema.parse(req.body);
      const intentData = {
        name: parsedData.name,
        phone: parsedData.phone,
        service: parsedData.service || "Urgent Consultation",
        message: parsedData.message || "Building repair inquiry",
        consent: parsedData.consent
      };
      const newIntent = await storage.createIntent(intentData);
      res.status(200).json({
        success: true,
        message: "Intent form submitted successfully",
        intent: newIntent
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        console.error("Intent form creation error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to process intent form"
        });
      }
    }
  });
  app2.delete("/api/intents/:id", async (req, res) => {
    try {
      const intentId = parseInt(req.params.id);
      const success = await storage.deleteIntent(intentId);
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Intent form submission not found"
        });
      }
      res.status(200).json({
        success: true,
        message: "Intent form submission deleted successfully"
      });
    } catch (error) {
      console.error("Intent deletion error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete intent form submission"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
