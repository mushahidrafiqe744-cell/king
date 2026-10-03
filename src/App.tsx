import React, { useState, useEffect } from 'react';
import { 
  Heart, BookOpen, ShieldAlert, CheckCircle, MapPin, Phone, 
  MessageSquare, UserCheck, Briefcase, ChevronRight, X, Clock, HelpCircle, Eye
} from 'lucide-react';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AdminPanel from './components/AdminPanel';
import { 
  Admission, WorkshopRegistration, ContactMessage, 
  CareerApplication, Testimonial, GalleryItem 
} from './types';
import { 
  AdmissionForm, WorkshopForm, CareerForm, 
  ContactForm, TestimonialForm 
} from './components/Forms';

export default function App() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [workshops, setWorkshops] = useState<WorkshopRegistration[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [careers, setCareers] = useState<CareerApplication[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isAdminActive, setIsAdminActive] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('All');

  // Load database entries
  const fetchAllData = async () => {
    try {
      const [resAdm, resWk, resCon, resCar, resTest, resGal] = await Promise.all([
        fetch('/api/admissions').then(r => r.json()),
        fetch('/api/workshops').then(r => r.json()),
        fetch('/api/contacts').then(r => r.json()),
        fetch('/api/careers').then(r => r.json()),
        fetch('/api/testimonials').then(r => r.json()),
        fetch('/api/gallery').then(r => r.json())
      ]);

      setAdmissions(resAdm || []);
      setWorkshops(resWk || []);
      setContacts(resCon || []);
      setCareers(resCar || []);
      setTestimonials(resTest || []);
      setGallery(resGal || []);
    } catch (e) {
      console.warn('Backend offline, running with fallback client-side storage state.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Post methods
  const handleAddAdmission = async (data: any) => {
    const res = await fetch('/api/admissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      await fetchAllData();
    } else {
      throw new Error();
    }
  };

  const handleAddWorkshop = async (data: any) => {
    const res = await fetch('/api/workshops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      await fetchAllData();
    } else {
      throw new Error();
    }
  };

  const handleAddContact = async (data: any) => {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      await fetchAllData();
    } else {
      throw new Error();
    }
  };

  const handleAddCareer = async (data: any) => {
    const res = await fetch('/api/careers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      await fetchAllData();
    } else {
      throw new Error();
    }
  };

  const handleAddTestimonial = async (data: any) => {
    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      await fetchAllData();
    } else {
      throw new Error();
    }
  };

  // Admin status update handlers
  const handleUpdateStatus = async (collection: string, id: string, payload: any) => {
    const res = await fetch(`/api/${collection}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      await fetchAllData();
    } else {
      throw new Error();
    }
  };

  // Admin gallery action handlers
  const handleAddGalleryItem = async (item: any) => {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    if (res.ok) {
      await fetchAllData();
    } else {
      throw new Error();
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    const res = await fetch(`/api/gallery/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      await fetchAllData();
    } else {
      throw new Error();
    }
  };

  const activeTestimonials = testimonials.filter((t) => t.approved);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-900">
      
      {/* 1. Header/Navbar */}
      <Navbar 
        onApplyClick={() => setShowApplyModal(true)} 
        onAdminToggle={() => setIsAdminActive(!isAdminActive)}
        isAdminActive={isAdminActive}
      />

      {/* 2. Admin Portal Dashboard (If Toggle is Active) */}
      {isAdminActive && (
        <div className="bg-slate-100 py-6 px-4 border-b border-slate-200 shadow-inner">
          <AdminPanel 
            admissions={admissions}
            workshops={workshops}
            contacts={contacts}
            careers={careers}
            testimonials={testimonials}
            gallery={gallery}
            onUpdateStatus={handleUpdateStatus}
            onAddGalleryItem={handleAddGalleryItem}
            onDeleteGalleryItem={handleDeleteGalleryItem}
            onClose={() => setIsAdminActive(false)}
          />
        </div>
      )}

      {/* 3. Hero Section matching user photo */}
      <HeroSection onApplyClick={() => setShowApplyModal(true)} />

      {/* 4. Live Database Statistics Counters */}
      <section className="bg-slate-900 text-white py-12 relative z-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div>
              <span className="block text-4xl font-extrabold text-amber-400 font-mono tabular-nums">
                {220 + admissions.filter(a => a.status === 'Approved').length}+
              </span>
              <span className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">
                Enrolled Students
              </span>
            </div>

            <div>
              <span className="block text-4xl font-extrabold text-amber-400 font-mono tabular-nums">
                {14 + workshops.length}+
              </span>
              <span className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">
                Workshops Completed
              </span>
            </div>

            <div>
              <span className="block text-4xl font-extrabold text-amber-400 font-mono tabular-nums">
                {admissions.length + workshops.length + contacts.length}
              </span>
              <span className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">
                Saved Database Logs
              </span>
            </div>

            <div>
              <span className="block text-4xl font-extrabold text-amber-400 font-mono tabular-nums">
                100%
              </span>
              <span className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1">
                Practical Job Skills
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 5. About Section with state-of-the-art classroom image */}
      <section id="about" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-transparent rounded-2xl opacity-10 blur-xl" />
              <img 
                src="/src/assets/images/about_training_facility_1791027367951.jpg" 
                alt="State of the art advanced lab training room" 
                className="rounded-2xl shadow-xl border border-slate-100 object-cover w-full h-[400px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-xl hidden md:block max-w-[220px]">
                <p className="text-amber-400 font-bold text-lg">Govt. Registered</p>
                <p className="text-slate-400 text-xs mt-1">Leading skill hub in Bandipora district, J&K.</p>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Empowering the youth of Jammu & Kashmir through premium healthcare and technical education
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                BY ADVANCED Group is Bandipora's most trusted vocational training institute. We bridge the gap between academic theory and clinical/IT workforce execution. By providing top-tier lab facilities, cooperative medical instructors, and tech industry experts, we build careers.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <p className="text-xs md:text-sm font-semibold text-slate-700">Experienced Clinical Instructors & Nurses</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <p className="text-xs md:text-sm font-semibold text-slate-700">Advanced Simulated Labs & Practical Kits</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                  <p className="text-xs md:text-sm font-semibold text-slate-700">Fully Job-Oriented and Verified Certifications</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Programs & Services Section */}
      <section id="services" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">Our Programs</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Curated Courses for Rapid Career Placement
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Explore professional training streams tailored for healthcare assistants, digital programmers, and fashion craftsmen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Box 1: Healthcare */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-500/20 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Healthcare & Medical Helpers</h3>
                <ul className="space-y-2.5 text-slate-600 text-xs">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Diploma in Medical Lab Technology (DMLT)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>General Nursing Assistance Course</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Certified Dental & Oral Hygiene Assistant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Basic Pharmacy Assistant Course</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setShowApplyModal(true)}
                className="mt-8 flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-wider"
              >
                <span>Register for Healthcare</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Box 2: IT */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-cyan-500/20 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Computer Science & IT</h3>
                <ul className="space-y-2.5 text-slate-600 text-xs">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span>Diploma in Web Development & Coding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span>Basic & Advanced Computer Applications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span>Graphic Designing & Digital Arts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span>Modern Digital Marketing Bootcamp</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setShowApplyModal(true)}
                className="mt-8 flex items-center gap-1.5 text-xs font-bold text-cyan-600 hover:text-cyan-700 transition-colors uppercase tracking-wider"
              >
                <span>Register for IT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Box 3: Skill Dev */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-500/20 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Vocational Crafts</h3>
                <ul className="space-y-2.5 text-slate-600 text-xs">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>Professional Tailoring & Pattern Making</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>Traditional Kashmiri Craft Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>Fashion Styling & Merchandising</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>Small Business Administration</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => setShowApplyModal(true)}
                className="mt-8 flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider"
              >
                <span>Register for Crafts</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Admissions Section */}
      <section id="admissions" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white grid grid-cols-1 lg:grid-cols-2 gap-12 items-center shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.08),transparent_40%)]" />
            
            <div className="space-y-6 relative z-10">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Admissions Open 2026</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-none text-white text-wrap-balance">
                Secure your seat in our upcoming batches
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Admissions are processed strictly on a first-come, first-served basis. Apply online below or visit our Bandipora office to clear your career counseling assessment. 
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>No Entrance Exam Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Installment Fee Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Hostel Guidance Assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>100% Practical Certificates</span>
                </div>
              </div>
            </div>

            <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl relative z-10 border border-slate-100">
              <h3 className="font-bold text-lg mb-1">Apply for Course Admission</h3>
              <p className="text-xs text-slate-500 mb-6">Submit this database-synchronized registration form.</p>
              <AdmissionForm onSubmit={handleAddAdmission} />
            </div>

          </div>
        </div>
      </section>

      {/* 8. Workshops Section */}
      <section id="workshops" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">Community Workshops</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Skill Masterclasses & Seminars
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Participate in clinical simulations, CPR training camps, and software engineering bootcamps hosted by guest experts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 flex gap-4">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-xl flex flex-col items-center justify-center shrink-0 font-bold">
                  <span className="text-lg font-mono">15</span>
                  <span className="text-[10px] uppercase">Oct</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Emergency Clinical Care & CPR Masterclass</h4>
                  <p className="text-slate-500 text-xs mt-1">
                    An intensive 4-hour hands-on clinical training using high-fidelity chest compression dummy models. Highly useful for nurses and general helper students.
                  </p>
                  <div className="flex gap-4 mt-3 text-[10px] font-bold text-slate-400 uppercase">
                    <span>📍 Bandipora Lab</span>
                    <span>🕒 11:00 AM</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 flex gap-4">
                <div className="w-14 h-14 bg-cyan-500/10 text-cyan-600 rounded-xl flex flex-col items-center justify-center shrink-0 font-bold">
                  <span className="text-lg font-mono">22</span>
                  <span className="text-[10px] uppercase">Oct</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Coding & Website Development Crash Course</h4>
                  <p className="text-slate-500 text-xs mt-1">
                    Introduction to HTML, CSS, JavaScript, and building databases. Learn how to launch modern, fast responsive landing pages from scratch.
                  </p>
                  <div className="flex gap-4 mt-3 text-[10px] font-bold text-slate-400 uppercase">
                    <span>📍 Computer Center</span>
                    <span>🕒 01:30 PM</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="lg:col-span-1">
              <WorkshopForm onSubmit={handleAddWorkshop} />
            </div>

          </div>

        </div>
      </section>

      {/* 9. Interactive Gallery */}
      <section id="gallery" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">Campus Life</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Facilities & Workshops In Action
              </h2>
            </div>
            
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 mt-4 md:mt-0 p-1 bg-slate-100 rounded-lg max-w-max border border-slate-200">
              {['All', 'Healthcare', 'Skill Development', 'Events'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    galleryFilter === cat
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {gallery.length === 0 ? (
            <p className="text-slate-500 text-xs text-center py-12 bg-slate-50 rounded-2xl">No gallery cards available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery
                .filter((item) => galleryFilter === 'All' || item.category === galleryFilter)
                .map((item) => (
                  <div 
                    key={item.id} 
                    className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative overflow-hidden h-52">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-800">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">Bandipora Campus</p>
                    </div>
                  </div>
                ))}
            </div>
          )}

        </div>
      </section>

      {/* 10. Testimonials / Reviews */}
      <section id="testimonials" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">Student Voices</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              What our successful trainees say
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeTestimonials.length === 0 ? (
                <p className="text-slate-500 text-xs text-center py-6 col-span-2">No approved student reviews logged yet.</p>
              ) : (
                activeTestimonials.map((t) => (
                  <div key={t.id} className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-slate-600 text-xs italic leading-relaxed">
                      "{t.text}"
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col">
                      <span className="font-bold text-slate-900 text-xs">{t.name}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 uppercase font-semibold">{t.role}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="lg:col-span-1">
              <TestimonialForm onSubmit={handleAddTestimonial} />
            </div>

          </div>

        </div>
      </section>

      {/* 11. Careers Section */}
      <section id="career" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest block mb-1">Work With Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Join Our Faculty & Training Board
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Share your professional healthcare or technology skills with the next generation. We are hiring expert instructors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            <div className="lg:col-span-2 space-y-4">
              
              <div className="p-6 border border-slate-200 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-base">Clinical Skills Lab Instructor (Nursing)</span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100/60 px-2 py-0.5 rounded uppercase">Full Time</span>
                </div>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Required MD Community Medicine, B.Sc Nursing, or equivalent clinical assistant experience. Must be experienced in nursing procedures and CPR.
                </p>
                <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400 font-bold uppercase">
                  <span>📍 Bandipora J&K</span>
                  <span>💰 Competitive Salary</span>
                </div>
              </div>

              <div className="p-6 border border-slate-200 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-base">Computer & Web Development Instructor</span>
                  <span className="text-[10px] text-amber-600 font-bold bg-amber-100/60 px-2 py-0.5 rounded uppercase">Contractual</span>
                </div>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Required MCA, B.Tech CSE, or professional software engineer background. Must teach HTML, Tailwind CSS, databases, and general computer skills.
                </p>
                <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400 font-bold uppercase">
                  <span>📍 Computer Lab</span>
                  <span>💰 Part-Time / Hourly</span>
                </div>
              </div>

            </div>

            <div className="lg:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-1">Recruitment Form</h3>
              <p className="text-xs text-slate-500 mb-4">Apply directly to join the ADVANCED Training Board.</p>
              <CareerForm onSubmit={handleAddCareer} />
            </div>

          </div>

        </div>
      </section>

      {/* 12. Contact Section */}
      <section id="contact" className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Have Questions?</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Get in touch with us today
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                We are open 6 days a week from 09:30 AM to 05:00 PM. Fill out our contact log, send a message, or dial our direct phone lines.
              </p>

              <div className="space-y-4 pt-4 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Main Campus: Bandipora Town, Jammu & Kashmir (J&K)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <a href="tel:7006143637" className="hover:underline">70061 43637</a>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>mushahidrafiqe744@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-700/60 shadow-xl relative z-10">
              <h3 className="text-white font-bold text-lg mb-1">Send a Message</h3>
              <p className="text-xs text-slate-400 mb-6">Your message will write directly into the admin inquiry database.</p>
              <ContactForm onSubmit={handleAddContact} />
            </div>

          </div>

        </div>
      </section>

      {/* 13. Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-900 pb-8">
            <div className="flex items-center gap-2">
              <img 
                src="/src/assets/images/advanced_logo_icon_1791029339624.jpg" 
                alt="BY ADVANCED Group Logo" 
                className="w-8 h-8 rounded-full object-cover border border-amber-500/50 shadow"
              />
              <span className="font-extrabold text-white text-sm">BY ADVANCED GROUP</span>
            </div>
            
            <nav className="flex flex-wrap gap-4 justify-center">
              <a href="#home" className="hover:text-white transition-colors">Home</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#admissions" className="hover:text-white transition-colors">Admissions</a>
              <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
              <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
              <a href="#career" className="hover:text-white transition-colors">Career</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-slate-500">
            <p>© 2026 BY ADVANCED Group. All Rights Reserved. Bandipora, J&K.</p>
            <p>Designed for Healthcare, Education & Skill Development.</p>
          </div>
        </div>
      </footer>

      {/* 14. Floating WhatsApp button matching bottom right in photo */}
      <a
        href="https://wa.me/917006143637"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-bounce"
        title="Chat on WhatsApp"
      >
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.113.953 12.007.953c-5.44 0-9.865 4.371-9.87 9.8a9.69 9.69 0 001.493 5.03l-.41 1.5 1.514-.393zm11.968-7.391c-.267-.134-1.58-.779-1.825-.869-.246-.089-.426-.134-.606.134-.18.267-.696.869-.853 1.048-.157.179-.314.201-.581.067-.267-.134-1.127-.415-2.146-1.325-.793-.706-1.328-1.578-1.484-1.846-.157-.267-.017-.411.117-.544.12-.12.267-.312.4-.468.134-.156.179-.267.268-.446.089-.179.045-.335-.022-.469-.067-.134-.606-1.459-.83-1.993-.218-.524-.46-.452-.632-.461-.163-.008-.35-.01-.537-.01-.187 0-.49.071-.747.35-.257.28-1.01 1.002-1.01 2.443 0 1.441 1.05 2.833 1.196 3.033.147.201 2.067 3.125 5.006 4.391.699.301 1.246.482 1.672.617.704.223 1.344.192 1.85.117.564-.083 1.58-.646 1.802-1.269.223-.623.223-1.157.157-1.269-.067-.112-.246-.179-.513-.313z" />
        </svg>
      </a>

      {/* 15. Apply Now slide-over Modal Window */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 relative border border-slate-100 shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-extrabold text-slate-900 text-xl mb-1">Course Admission Form</h3>
            <p className="text-xs text-slate-500 mb-6">Fill in details and lock your slot inside the server database.</p>
            <AdmissionForm onSubmit={handleAddAdmission} onClose={() => setShowApplyModal(false)} />
          </div>
        </div>
      )}

    </div>
  );
}
