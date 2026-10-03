import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  // Database setup
  const DATA_DIR = path.join(__dirname, 'data');
  const DB_FILE = path.join(DATA_DIR, 'db.json');

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Pre-seed mock database if not exists
  if (!fs.existsSync(DB_FILE)) {
    const initialDb = {
      admissions: [
        {
          id: 'adm-101',
          fullName: 'Muneeb Shafi',
          email: 'muneeb@example.com',
          phone: '70061 99882',
          course: 'Diploma in Medical Lab Technology (DMLT)',
          qualification: 'Class 12th',
          address: 'Main Town Bandipora',
          status: 'Pending',
          createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
        },
        {
          id: 'adm-102',
          fullName: 'Arshia Mushtaq',
          email: 'arshia@example.com',
          phone: '94191 12345',
          course: 'General Nursing & Midwifery Helper',
          qualification: 'Class 12th',
          address: 'Sopore, J&K',
          status: 'Approved',
          createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
        }
      ],
      workshops: [
        {
          id: 'wreg-201',
          fullName: 'Tariq Ahmad Rather',
          email: 'tariq@example.com',
          phone: '99060 11223',
          workshop: 'Emergency Clinical Care & CPR Training',
          profession: 'Nursing Aspirant',
          status: 'Confirmed',
          createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
        }
      ],
      contacts: [
        {
          id: 'msg-301',
          fullName: 'Showkat Ahmed',
          email: 'showkat@gmail.com',
          phone: '70061 55667',
          message: 'Can you please provide details about the timing and fees of your skill development batch in computer applications?',
          status: 'Unread',
          createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString()
        }
      ],
      careers: [
        {
          id: 'car-401',
          fullName: 'Dr. Yasir Iqbal',
          email: 'yasir@example.com',
          phone: '96220 88990',
          position: 'Clinical Skills Instructor',
          experience: '4 Years',
          coverLetter: 'I am passionate about teaching nursing students the correct clinical methodologies. I have an MD in Community Medicine.',
          status: 'Interviewing',
          createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString()
        }
      ],
      testimonials: [
        {
          id: 'test-1',
          name: 'Shahid Hamid',
          role: 'Registered Nursing Assistant',
          text: 'The advanced laboratory simulators at BY ADVANCED Group changed my understanding of emergency patient care. Highly recommended!',
          approved: true,
          createdAt: new Date(Date.now() - 100 * 3600 * 1000).toISOString()
        },
        {
          id: 'test-2',
          name: 'Saima Jan',
          role: 'Web Development Student',
          text: 'Excellent IT skill development center! The instructors are cooperative and the hands-on coding exercises are amazing.',
          approved: true,
          createdAt: new Date(Date.now() - 50 * 3600 * 1000).toISOString()
        }
      ],
      gallery: [
        {
          id: 'gal-1',
          title: 'Clinical Skills Lab Practice',
          category: 'Healthcare',
          image: '/src/assets/images/gallery_healthcare_workshop_1791027384343.jpg',
          createdAt: new Date().toISOString()
        },
        {
          id: 'gal-2',
          title: 'IT & Digital Coding Session',
          category: 'Skill Development',
          image: '/src/assets/images/gallery_it_skill_workshop_1791027399765.jpg',
          createdAt: new Date().toISOString()
        },
        {
          id: 'gal-3',
          title: 'Annual Graduation Convocation',
          category: 'Events',
          image: '/src/assets/images/gallery_graduation_ceremony_1791027413172.jpg',
          createdAt: new Date().toISOString()
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2));
  }

  // File Read/Write Helpers
  const readDb = () => {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading database:', e);
      return { admissions: [], workshops: [], contacts: [], careers: [], testimonials: [], gallery: [] };
    }
  };

  const writeDb = (data: any) => {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error('Error writing database:', e);
    }
  };

  // API Endpoints for Admissions
  app.get('/api/admissions', (req, res) => {
    const db = readDb();
    res.json(db.admissions);
  });

  app.post('/api/admissions', (req, res) => {
    const db = readDb();
    const newRecord = {
      id: 'adm-' + Math.floor(Math.random() * 90000 + 10000),
      createdAt: new Date().toISOString(),
      status: 'Pending',
      ...req.body
    };
    db.admissions.unshift(newRecord);
    writeDb(db);
    res.status(201).json(newRecord);
  });

  app.patch('/api/admissions/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const db = readDb();
    const index = db.admissions.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      db.admissions[index].status = status || db.admissions[index].status;
      writeDb(db);
      res.json(db.admissions[index]);
    } else {
      res.status(404).json({ error: 'Admission application not found' });
    }
  });

  // API Endpoints for Workshops
  app.get('/api/workshops', (req, res) => {
    const db = readDb();
    res.json(db.workshops);
  });

  app.post('/api/workshops', (req, res) => {
    const db = readDb();
    const newRecord = {
      id: 'wreg-' + Math.floor(Math.random() * 90000 + 10000),
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      ...req.body
    };
    db.workshops.unshift(newRecord);
    writeDb(db);
    res.status(201).json(newRecord);
  });

  app.patch('/api/workshops/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const db = readDb();
    const index = db.workshops.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      db.workshops[index].status = status || db.workshops[index].status;
      writeDb(db);
      res.json(db.workshops[index]);
    } else {
      res.status(404).json({ error: 'Workshop registration not found' });
    }
  });

  // API Endpoints for Contact Messages
  app.get('/api/contacts', (req, res) => {
    const db = readDb();
    res.json(db.contacts);
  });

  app.post('/api/contacts', (req, res) => {
    const db = readDb();
    const newRecord = {
      id: 'msg-' + Math.floor(Math.random() * 90000 + 10000),
      createdAt: new Date().toISOString(),
      status: 'Unread',
      ...req.body
    };
    db.contacts.unshift(newRecord);
    writeDb(db);
    res.status(201).json(newRecord);
  });

  app.patch('/api/contacts/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const db = readDb();
    const index = db.contacts.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      db.contacts[index].status = status || db.contacts[index].status;
      writeDb(db);
      res.json(db.contacts[index]);
    } else {
      res.status(404).json({ error: 'Contact message not found' });
    }
  });

  // API Endpoints for Careers
  app.get('/api/careers', (req, res) => {
    const db = readDb();
    res.json(db.careers);
  });

  app.post('/api/careers', (req, res) => {
    const db = readDb();
    const newRecord = {
      id: 'car-' + Math.floor(Math.random() * 90000 + 10000),
      createdAt: new Date().toISOString(),
      status: 'Pending',
      ...req.body
    };
    db.careers.unshift(newRecord);
    writeDb(db);
    res.status(201).json(newRecord);
  });

  app.patch('/api/careers/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const db = readDb();
    const index = db.careers.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      db.careers[index].status = status || db.careers[index].status;
      writeDb(db);
      res.json(db.careers[index]);
    } else {
      res.status(404).json({ error: 'Career application not found' });
    }
  });

  // API Endpoints for Testimonials
  app.get('/api/testimonials', (req, res) => {
    const db = readDb();
    res.json(db.testimonials);
  });

  app.post('/api/testimonials', (req, res) => {
    const db = readDb();
    const newRecord = {
      id: 'test-' + Math.floor(Math.random() * 90000 + 10000),
      createdAt: new Date().toISOString(),
      approved: false, // requires admin approval
      ...req.body
    };
    db.testimonials.unshift(newRecord);
    writeDb(db);
    res.status(201).json(newRecord);
  });

  app.patch('/api/testimonials/:id', (req, res) => {
    const { id } = req.params;
    const { approved } = req.body;
    const db = readDb();
    const index = db.testimonials.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      db.testimonials[index].approved = typeof approved === 'boolean' ? approved : db.testimonials[index].approved;
      writeDb(db);
      res.json(db.testimonials[index]);
    } else {
      res.status(404).json({ error: 'Testimonial not found' });
    }
  });

  // API Endpoints for Gallery Management
  app.get('/api/gallery', (req, res) => {
    const db = readDb();
    res.json(db.gallery);
  });

  app.post('/api/gallery', (req, res) => {
    const db = readDb();
    const newRecord = {
      id: 'gal-' + Math.floor(Math.random() * 90000 + 10000),
      createdAt: new Date().toISOString(),
      ...req.body
    };
    db.gallery.unshift(newRecord);
    writeDb(db);
    res.status(201).json(newRecord);
  });

  app.delete('/api/gallery/:id', (req, res) => {
    const { id } = req.params;
    const db = readDb();
    const initialLength = db.gallery.length;
    db.gallery = db.gallery.filter((item: any) => item.id !== id);
    if (db.gallery.length < initialLength) {
      writeDb(db);
      res.json({ success: true, message: 'Gallery item deleted' });
    } else {
      res.status(404).json({ error: 'Gallery item not found' });
    }
  });

  // Serve Frontend Applications
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production static file routing
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running in ${isProd ? 'production' : 'development'} mode on port ${PORT}`);
  });
}

startServer();
