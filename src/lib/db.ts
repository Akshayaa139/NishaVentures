import client from './mongodb';
import { ObjectId } from 'mongodb';
import { hashPassword } from './auth';

// ----------------------------------------------------
// MongoDB Database Access Helper (with Resilient Catch)
// ----------------------------------------------------
const getMongoDb = async () => {
  try {
    await client.connect();
    return client.db('nisha_ventures');
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error);
    throw new Error('Database connection failed. Please check your MONGODB_URI.');
  }
};

function mapDoc<T>(doc: any): T {
  if (!doc) return null as any;
  const { _id, ...rest } = doc;
  return {
    id: _id.toString(),
    ...rest
  } as T;
}

// ----------------------------------------------------
// Interfaces
// ----------------------------------------------------
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
  research_use_case: string;
  available: boolean;
  created_at?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  quantity_required: number;
  message: string;
  product_id: string | null;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  created_at?: string;
  product_name?: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
  category: 'larvae' | 'facility' | 'packaging' | 'application';
  created_at?: string;
}

export interface SiteContent {
  key: string;
  content_json: any;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  created_at?: string;
}

// ----------------------------------------------------
// Seed Data Parameters
// ----------------------------------------------------
const defaultProducts = [
  {
    id: 'p1-larvae-6th-instar',
    name: 'Standardized Galleria mellonella Larvae (6th Instar)',
    description: 'Research-grade 6th-instar larvae reared on a strict artificial diet (oatflakes, yeast, glycerol, honey). Genetically uniform, disease-free, and pathogen-free. Harvested at the peak immunological phase for consistent data.',
    price: 150.00,
    stock: 5000,
    image_url: '/images/galleria_larva_well.jpg',
    category: 'Larvae',
    research_use_case: 'Drug toxicity testing, bacterial virulence studies, and antimicrobial testing.',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'p2-larvae-std-pack',
    name: 'Premium Research Larvae (Standard Pack)',
    description: 'Pack of 100 standardized Galleria mellonella larvae (weight 250–320 mg each). Shipped in insulated boxes with cooling packs to keep them dormant and prevent pupation during transit.',
    price: 45.00,
    stock: 2000,
    image_url: '/images/galleria_larva_red.jpg',
    category: 'Larvae',
    research_use_case: 'Ethical animal model alternative for university labs, hospitals, and pharmaceutical R&D.',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'p3-breeding-kit',
    name: 'Galleria mellonella Breeding Kit (Adults & Cocoons)',
    description: 'Standardized breeding and colony establishment kit containing healthy pupating cocoons and adult wax moths. Includes starting rearing substrate guidelines.',
    price: 120.00,
    stock: 150,
    image_url: '/images/galleria_adult.jpg',
    category: 'Breeding',
    research_use_case: 'Establish in-house testing cohorts and observe complete lifecycle developments.',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'p4-pupae-dormant',
    name: 'Galleria mellonella Pupae',
    description: 'Standardized dormant pupae. Reared under controlled conditions and packaged at early pupal phase. Free from chemical treatments.',
    price: 75.00,
    stock: 800,
    image_url: '/images/galleria_pupa.jpg',
    category: 'Pupae',
    research_use_case: 'Immunological development staging, insect physiology research, and gene expression studies.',
    available: true,
    created_at: new Date().toISOString()
  }
];

const defaultGallery = [
  {
    id: 'gal-1',
    image_url: '/images/galleria_larva_red.jpg',
    caption: 'Standardized 6th-instar Galleria mellonella larvae inside petri dish',
    category: 'larvae',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-2',
    image_url: '/images/galleria_larva_well.jpg',
    caption: 'Wax moth larvae placed in 12-well cell plates for antimicrobial toxicity trials',
    category: 'application',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-3',
    image_url: '/images/galleria_adult.jpg',
    caption: 'Adult Galleria mellonella moths inside rearing habitat',
    category: 'facility',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-4',
    image_url: '/images/galleria_pupa.jpg',
    caption: 'Healthy Galleria mellonella pupae during developmental dormancy',
    category: 'larvae',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-5',
    image_url: '/images/rearing_facility.png',
    caption: 'Standardized, climate-controlled rearing racks maintained at 27°C and 60% humidity',
    category: 'facility',
    created_at: new Date().toISOString()
  }
];

const defaultSiteContent = {
  home: {
    heroTitle: 'Premium Research-Grade Galleria mellonella Larvae',
    heroSubtitle: 'Trusted by researchers, universities, biotech companies, and pharmaceutical laboratories worldwide for reliable, ethical in vivo pathogen and toxicology studies.',
    stats: {
      stat1: '100% Disease-Free Stock',
      stat2: 'Standardized Rearing (250-320 mg)',
      stat3: '6th-Instar Development',
      stat4: 'Quality Assured Shipping'
    }
  },
  about: {
    whatIs: 'Galleria mellonella (the greater wax moth) has emerged as an incredibly valuable in vivo infection model. These larvae possess an innate immune system with cellular and humoral components that share high structural and functional similarities to the mammalian innate immune system. This allows researchers to perform pre-screening of drug toxicity, testing of bacterial virulence, and screening of novel antimicrobial compounds efficiently.',
    whyUse: 'Using Galleria mellonella larvae provides significant benefits over mammalian models like mice. They do not require complex ethical approvals (IACUC), are cost-effective, can be stored and incubated at human body temperature (37°C) to study mammalian-specific pathogens, and yield results within 24-48 hours. They represent a high-throughput, ethically sound option in modern research pipelines.',
    rearing: 'At Nisha Ventures, our larvae are produced under strict standardized protocols. We utilize an artificial diet consisting of oatflakes, dried yeast, honey, and glycerol to eliminate pathogens and ensure genetic consistency. The insects are kept in dark, temperature-controlled facilities at 27°C, and harvested at the 6th-instar phase (weight range 250–320 mg) when their immune system is fully developed and responsive.',
    qa: 'Every batch of larvae undergoes strict quality assurance. We monitor development cycles, inspect for black spots (melanization) or stress indicators, and discard any sub-standard specimens. Shipping is done in insulated cooling boxes at ~15°C to keep the larvae dormant, preventing pupation and safeguarding their immunological integrity.'
  },
  contact: {
    email: 'info@nishaventures.com',
    phone1: '8248612679',
    phone2: '8489437274',
    instagram: 'https://www.instagram.com/nisha_ventures07',
    address: 'Nisha Ventures, Biological Models Division, Tamil Nadu, India'
  }
};

const ensureMongoDbSeeded = async (database: any) => {
  try {
    const adminCount = await database.collection('admin_users').countDocuments();
    if (adminCount === 0) {
      console.log('[Seed] Seeding MongoDB Atlas collections with default data...');
      
      // Admin User
      await database.collection('admin_users').insertOne({
        username: 'admin',
        password_hash: hashPassword('Password123!'),
        created_at: new Date().toISOString()
      });

      // Products Catalog (strip custom string id for auto ObjectId generation)
      const productsSeed = defaultProducts.map(({ id, ...p }) => ({
        ...p,
        created_at: new Date().toISOString()
      }));
      await database.collection('products').insertMany(productsSeed);

      // Gallery Items
      const gallerySeed = defaultGallery.map(({ id, ...g }) => ({
        ...g,
        created_at: new Date().toISOString()
      }));
      await database.collection('gallery').insertMany(gallerySeed);

      // Page Contents
      const siteContentSeed = Object.entries(defaultSiteContent).map(([key, content]) => ({
        _id: key as any,
        key,
        content_json: content,
        updated_at: new Date().toISOString()
      }));
      await database.collection('site_content').insertMany(siteContentSeed);

      console.log('[Seed] Seeding complete! Database successfully populated.');
    }
  } catch (err) {
    console.error('[Seed] Failed to seed MongoDB:', err);
  }
};

// ----------------------------------------------------
// Database CRUD Operations (MongoDB Atlas)
// ----------------------------------------------------
export const db = {
  // PRODUCTS
  getProducts: async (): Promise<Product[]> => {
    const database = await getMongoDb();
    await ensureMongoDbSeeded(database);
    const docs = await database.collection('products').find({}).sort({ created_at: -1 }).toArray();
    return docs.map((doc) => mapDoc<Product>(doc));
  },

  getProductById: async (id: string): Promise<Product | null> => {
    const database = await getMongoDb();
    let query: any = {};
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      query = { _id: id };
    }
    const doc = await database.collection('products').findOne(query);
    return doc ? mapDoc<Product>(doc) : null;
  },

  createProduct: async (product: Omit<Product, 'id' | 'created_at'>): Promise<Product> => {
    const database = await getMongoDb();
    const newProductDoc = {
      ...product,
      created_at: new Date().toISOString()
    };
    const res = await database.collection('products').insertOne(newProductDoc);
    return {
      ...product,
      id: res.insertedId.toString(),
      created_at: newProductDoc.created_at
    };
  },

  updateProduct: async (id: string, product: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<Product> => {
    const database = await getMongoDb();
    let query: any = {};
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      query = { _id: id };
    }
    await database.collection('products').updateOne(query, { $set: product });
    const updated = await database.collection('products').findOne(query);
    if (!updated) {
      throw new Error('Product not found: ' + id);
    }
    return mapDoc<Product>(updated);
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    const database = await getMongoDb();
    let query: any = {};
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      query = { _id: id };
    }
    const res = await database.collection('products').deleteOne(query);
    return (res.deletedCount || 0) > 0;
  },

  // INQUIRIES
  getInquiries: async (): Promise<Inquiry[]> => {
    const database = await getMongoDb();
    const inquiriesDocs = await database.collection('inquiries').find({}).toArray();
    const productsDocs = await database.collection('products').find({}).toArray();
    const productsList = productsDocs.map((p) => mapDoc<Product>(p));

    return inquiriesDocs
      .map((doc) => {
        const inq = mapDoc<Inquiry>(doc);
        const prod = productsList.find((p) => p.id === inq.product_id);
        return {
          ...inq,
          product_name: prod ? prod.name : 'Unknown Product'
        };
      })
      .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
  },

  createInquiry: async (inquiry: Omit<Inquiry, 'id' | 'created_at' | 'status'>): Promise<Inquiry> => {
    const database = await getMongoDb();
    const newInquiryDoc = {
      ...inquiry,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    const res = await database.collection('inquiries').insertOne(newInquiryDoc);
    return {
      ...inquiry,
      id: res.insertedId.toString(),
      status: 'pending',
      created_at: newInquiryDoc.created_at
    };
  },

  updateInquiryStatus: async (id: string, status: Inquiry['status']): Promise<Inquiry> => {
    const database = await getMongoDb();
    let query: any = {};
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      query = { _id: id };
    }
    await database.collection('inquiries').updateOne(query, { $set: { status } });
    const updated = await database.collection('inquiries').findOne(query);
    if (!updated) {
      throw new Error('Inquiry not found: ' + id);
    }
    return mapDoc<Inquiry>(updated);
  },

  deleteInquiry: async (id: string): Promise<boolean> => {
    const database = await getMongoDb();
    let query: any = {};
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      query = { _id: id };
    }
    const res = await database.collection('inquiries').deleteOne(query);
    return (res.deletedCount || 0) > 0;
  },

  // GALLERY
  getGallery: async (): Promise<GalleryItem[]> => {
    const database = await getMongoDb();
    await ensureMongoDbSeeded(database);
    const docs = await database.collection('gallery').find({}).sort({ created_at: -1 }).toArray();
    return docs.map((doc) => mapDoc<GalleryItem>(doc));
  },

  createGalleryItem: async (item: Omit<GalleryItem, 'id' | 'created_at'>): Promise<GalleryItem> => {
    const database = await getMongoDb();
    const newDoc = {
      ...item,
      created_at: new Date().toISOString()
    };
    const res = await database.collection('gallery').insertOne(newDoc);
    return {
      ...item,
      id: res.insertedId.toString(),
      created_at: newDoc.created_at
    };
  },

  deleteGalleryItem: async (id: string): Promise<boolean> => {
    const database = await getMongoDb();
    let query: any = {};
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      query = { _id: id };
    }
    const res = await database.collection('gallery').deleteOne(query);
    return (res.deletedCount || 0) > 0;
  },

  // SITE CONTENT
  getSiteContent: async (key: string): Promise<any> => {
    const database = await getMongoDb();
    await ensureMongoDbSeeded(database);
    const doc = await database.collection('site_content').findOne({ key });
    return doc ? doc.content_json : null;
  },

  updateSiteContent: async (key: string, content: any): Promise<boolean> => {
    const database = await getMongoDb();
    await database.collection('site_content').updateOne(
      { key },
      {
        $set: {
          content_json: content,
          updated_at: new Date().toISOString()
        }
      },
      { upsert: true }
    );
    return true;
  },

  // ADMIN USERS
  getAdminUser: async (username: string): Promise<AdminUser | null> => {
    const database = await getMongoDb();
    await ensureMongoDbSeeded(database);
    const doc = await database.collection('admin_users').findOne({ username });
    return doc ? mapDoc<AdminUser>(doc) : null;
  },

  createAdminUser: async (admin: Omit<AdminUser, 'id' | 'created_at'>): Promise<AdminUser> => {
    const database = await getMongoDb();
    const newDoc = {
      ...admin,
      created_at: new Date().toISOString()
    };
    const res = await database.collection('admin_users').insertOne(newDoc);
    return {
      ...admin,
      id: res.insertedId.toString(),
      created_at: newDoc.created_at
    };
  }
};
