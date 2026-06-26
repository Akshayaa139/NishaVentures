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
  category: 'eggs' | 'larvae' | 'pupae' | 'moths' | 'facility' | 'packaging' | 'application';
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
    id: 'p1-white-larvae',
    name: 'Standardized White Galleria mellonella Larvae',
    description: 'Research-grade white Galleria mellonella larvae. Reared on a strictly controlled artificial nutrient diet. Size of the larva: minimum 0.200g each. Standardized and pathogen-free. Cultured for high reproducibility in toxicology studies, EPN production, plastic degradation, and other enzymatic research.',
    price: 0,
    stock: 5000,
    image_url: '/images/galleria_larva_well.jpg',
    category: 'Larvae',
    research_use_case: 'Drug toxicology studies, Entomopathogenic nematodes (EPN) production, plastic degradation research, and enzymatic studies.',
    available: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'p2-black-larvae',
    name: 'Standardized Black Galleria mellonella Larvae',
    description: 'Specialized dark-pigmented (black) Galleria mellonella larvae. Cultured under optimal conditions. Size of the larva: minimum 0.200g each. Pathogen-free and highly active. Ideal for comparative immunological assays and custom pathogen propagation.',
    price: 0,
    stock: 3000,
    image_url: '/images/larva_black.jpg',
    category: 'Larvae',
    research_use_case: 'Melanization assays, comparative immune response research, EPN production, and environmental toxicology studies.',
    available: true,
    created_at: new Date().toISOString()
  }
];

const defaultGallery = [
  {
    id: 'gal-video',
    image_url: '/images/WhatsApp Video 2026-06-21 at 02.02.46.mp4',
    caption: 'Active Galleria mellonella larvae during rearing quality control inspection (Original Video)',
    category: 'larvae',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-egg',
    image_url: '/images/galleria_egg_real.jpg',
    caption: 'Galleria mellonella eggs deposited on cardboard substrates (Eggs Stage)',
    category: 'eggs',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-1',
    image_url: '/images/galleria_larva_well.jpg',
    caption: 'Standardized White Galleria mellonella larvae on well plate (Original White Larvae)',
    category: 'larvae',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-larva-user',
    image_url: '/images/galleria_larva_user.jpg',
    caption: 'Harvested White Galleria mellonella larvae cohort in clean rearing bowl',
    category: 'larvae',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-3',
    image_url: '/images/larva_black.jpg',
    caption: 'Close-up of premium Black Galleria mellonella larvae cohort (Original Black Larvae)',
    category: 'larvae',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-2',
    image_url: '/images/galleria_pupa.jpg',
    caption: 'Premium Galleria mellonella Pupa (Original Black Pupa)',
    category: 'pupae',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-adult',
    image_url: '/images/galleria_adult_user.jpg',
    caption: 'Breeding colony of adult Galleria mellonella moths inside glass container',
    category: 'moths',
    created_at: new Date().toISOString()
  },
  {
    id: 'gal-4',
    image_url: '/images/rearing_facility.png',
    caption: 'Climate-controlled rearing racks maintained at 27°C and 60% humidity',
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
      stat2: 'Standardized Rearing (Min 0.200g)',
      stat3: '6th-Instar Development',
      stat4: 'Quality Assured Shipping'
    }
  },
  about: {
    whatIs: 'Galleria mellonella (the greater wax moth) has emerged as an incredibly valuable in vivo infection model. These larvae possess an innate immune system with cellular and humoral components that share high structural and functional similarities to the mammalian innate immune system. This allows researchers to perform pre-screening of drug toxicity, testing of bacterial virulence, and screening of novel antimicrobial compounds efficiently.',
    whyUse: 'Using Galleria mellonella larvae provides significant benefits over mammalian models like mice. They do not require complex ethical approvals (IACUC), are cost-effective, can be stored and incubated at human body temperature (37°C) to study mammalian-specific pathogens, and yield results within 24-48 hours. They represent a high-throughput, ethically sound option in modern research pipelines.',
    rearing: 'At Nisha Ventures, our larvae are produced under strict standardized protocols. We utilize an artificial diet consisting of oatflakes, dried yeast, honey, and glycerol to eliminate pathogens and ensure genetic consistency. The insects are kept in dark, temperature-controlled facilities at 27°C, and harvested at the 6th-instar phase (weight of minimum 0.200g each) when their immune system is fully developed and responsive.',
    qa: 'Every batch of larvae undergoes strict quality assurance. We monitor development cycles, inspect for black spots (melanization) or stress indicators, and discard any sub-standard specimens. Shipping is done in insulated cooling boxes at ~15°C to keep the larvae dormant, preventing pupation and safeguarding their immunological integrity.'
  },
  contact: {
    email: 'nishaventures007@gmail.com',
    phone1: '8248612679',
    phone2: '8489437274',
    instagram: 'https://www.instagram.com/nisha_ventures07',
    address: 'Nisha Ventures, Biological Models Division, Tamil Nadu, India'
  }
};

let isSeeding = false;
const ensureMongoDbSeeded = async (database: any) => {
  if (isSeeding) return;
  isSeeding = true;
  try {
    // 1. Setup Admin User 'Rajesh' and remove old 'admin'
    const rajeshExists = await database.collection('admin_users').findOne({ username: 'Rajesh' });
    if (!rajeshExists) {
      console.log('[Seed] Seeding admin user Rajesh...');
      await database.collection('admin_users').insertOne({
        username: 'Rajesh',
        password_hash: hashPassword('rajesh123!'),
        created_at: new Date().toISOString()
      });
      // Clean up the default 'admin' user
      await database.collection('admin_users').deleteOne({ username: 'admin' });
    }

    // 2. Setup Products (only white & black larvae, weight min 0.200g, price 0/hidden)
    const hasOldProducts = await database.collection('products').countDocuments({
      category: { $in: ['Breeding', 'Pupae'] }
    });
    const productCount = await database.collection('products').countDocuments();
    if (hasOldProducts > 0 || productCount === 0 || productCount > 2) {
      console.log('[Seed] Re-seeding products for larvae-only catalog...');
      await database.collection('products').deleteMany({});
      const productsSeed = defaultProducts.map(({ id, ...p }) => ({
        ...p,
        created_at: new Date().toISOString()
      }));
      await database.collection('products').insertMany(productsSeed);
    }

    // 3. Setup Gallery Items
    const galleryCount = await database.collection('gallery').countDocuments();
    
    // Check if the database has eggs stage properly classified (using the new category 'eggs')
    const hasEggsClassified = await database.collection('gallery').findOne({
      category: 'eggs'
    });
    
    if (!hasEggsClassified || galleryCount === 0 || galleryCount > 8) {
      console.log('[Seed] Re-seeding gallery items...');
      await database.collection('gallery').deleteMany({});
      const gallerySeed = defaultGallery.map(({ id, ...g }) => ({
        ...g,
        created_at: new Date().toISOString()
      }));
      await database.collection('gallery').insertMany(gallerySeed);
    }

    // 4. Setup Site Contents
    const siteContentCount = await database.collection('site_content').countDocuments();
    const hasOldEmail = await database.collection('site_content').findOne({
      key: 'contact',
      'content_json.email': 'info@nishaventures.com'
    });
    if (siteContentCount === 0 || hasOldEmail) {
      console.log('[Seed] Re-seeding site content...');
      await database.collection('site_content').deleteMany({});
      const siteContentSeed = Object.entries(defaultSiteContent).map(([key, content]) => ({
        _id: key as any,
        key,
        content_json: content,
        updated_at: new Date().toISOString()
      }));
      await database.collection('site_content').insertMany(siteContentSeed);
    }
  } catch (err) {
    console.error('[Seed] Failed to seed MongoDB:', err);
  } finally {
    isSeeding = false;
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
    const doc = await database.collection('admin_users').findOne({
      username: { $regex: new RegExp(`^${username}$`, 'i') }
    });
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
