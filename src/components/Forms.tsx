import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

// Common courses list
export const COURSES = [
  'Diploma in Medical Lab Technology (DMLT)',
  'General Nursing & Midwifery Helper',
  'Certified Dental assistant',
  'Basic Pharmacy Assistant',
  'Diploma in Computer Applications & Web Dev',
  'Professional Tailoring & Fashion Design',
  'Advanced Digital Marketing Bootcamp'
];

export const WORKSHOPS = [
  'Emergency Clinical Care & CPR Training',
  'Modern Frontend Web Development',
  'Digital Skills & Office Administration',
  'B2B Entrepreneurship & Financial Literacy'
];

export const CAREER_POSITIONS = [
  'Clinical Skills Lab Instructor (Nursing)',
  'Computer & Web Development Instructor',
  'Professional Fashion Design Trainer',
  'Academic Counselor & Admissions Officer'
];

// 1. Admission / Apply Now Form
interface AdmissionFormProps {
  onSubmit: (data: any) => Promise<void>;
  onClose?: () => void;
}

export function AdmissionForm({ onSubmit, onClose }: AdmissionFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: COURSES[0],
    qualification: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSubmit(formData);
      setSuccess(true);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8 px-4 flex flex-col items-center">
        <CheckCircle className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Received!</h3>
        <p className="text-slate-600 mb-6 max-w-sm text-center">
          Thank you for applying to ADVANCED Group. Our admissions counselor will contact you at <span className="font-semibold text-slate-900">{formData.phone}</span> shortly.
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
          >
            Close Window
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="Enter your full name"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@example.com"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            pattern="[0-9\s+-]{10,15}"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. 70061 XXXXX"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
          Select Course <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.course}
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm bg-white"
        >
          {COURSES.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
          Last Qualification <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.qualification}
          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
          placeholder="e.g. Class 10th, 12th, Graduate"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
          Permanent Address <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={2}
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter village, town, or city name"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg shadow-slate-900/15"
      >
        {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
        <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
      </button>
    </form>
  );
}

// 2. Workshop Registration Form
interface WorkshopFormProps {
  onSubmit: (data: any) => Promise<void>;
}

export function WorkshopForm({ onSubmit }: WorkshopFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    workshop: WORKSHOPS[0],
    profession: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      setError('Please fill in required fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSubmit(formData);
      setSuccess(true);
    } catch (err) {
      setError('Could not complete registration. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-6 bg-emerald-50/50 rounded-2xl border border-emerald-500/20 px-4 flex flex-col items-center">
        <CheckCircle className="w-12 h-12 text-emerald-500 mb-2 animate-bounce" />
        <h4 className="text-lg font-bold text-slate-900 mb-1">Registration Confirmed!</h4>
        <p className="text-slate-600 text-xs max-w-xs">
          Your seat has been reserved. A coordination assistant will SMS details to <span className="font-semibold">{formData.phone}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200">
      <h3 className="font-bold text-slate-900 text-lg">Workshop Entry Ticket</h3>
      <p className="text-slate-500 text-xs">Reserve your seat instantly inside our masterclass events.</p>

      {error && (
        <div className="p-2 bg-red-50 text-red-600 rounded-lg text-xs flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Your Name *</label>
        <input
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="Full Name"
          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-amber-500 text-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Phone *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="70061 XXXX"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-amber-500 text-xs"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Occupation</label>
          <input
            type="text"
            value={formData.profession}
            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
            placeholder="e.g. Student, Nurse"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-amber-500 text-xs"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Select Event *</label>
        <select
          value={formData.workshop}
          onChange={(e) => setFormData({ ...formData, workshop: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:ring-1 focus:ring-amber-500 text-xs"
        >
          {WORKSHOPS.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider mt-2"
      >
        {loading ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
        <span>{loading ? 'Processing...' : 'Reserve Spot'}</span>
      </button>
    </form>
  );
}

// 3. Career Vacancies Application Form
interface CareerFormProps {
  onSubmit: (data: any) => Promise<void>;
  onClose?: () => void;
}

export function CareerForm({ onSubmit, onClose }: CareerFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: CAREER_POSITIONS[0],
    experience: '',
    coverLetter: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.coverLetter) {
      setError('Please fill in required inputs.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSubmit(formData);
      setSuccess(true);
    } catch (err) {
      setError('Submission error. Please check and retry.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-6 px-4 flex flex-col items-center">
        <CheckCircle className="w-12 h-12 text-emerald-500 mb-2" />
        <h4 className="text-lg font-bold text-slate-900">Application Lodged!</h4>
        <p className="text-slate-600 text-xs mt-1 max-w-sm">
          Thank you for applying. Our recruiting panel will analyze your experience and contact you at <span className="font-semibold">{formData.phone}</span>.
        </p>
        {onClose && (
          <button onClick={onClose} className="mt-4 px-4 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg">
            Done
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="p-2 bg-red-50 text-red-600 rounded-lg text-xs flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Your Name *</label>
        <input
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
          placeholder="Full Name"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Phone *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
            placeholder="70061 XXXXX"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Target Vacancy *</label>
          <select
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
          >
            {CAREER_POSITIONS.map((pos) => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Total Experience *</label>
          <input
            type="text"
            required
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
            placeholder="e.g. 2 Years, Fresh Graduate"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Experience & Skills Cover Letter *</label>
        <textarea
          required
          rows={3}
          value={formData.coverLetter}
          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
          placeholder="Briefly state your academic qualifications, clinics/labs worked at, and why you wish to teach at ADVANCED group."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
      >
        {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
        <span>{loading ? 'Submitting Application...' : 'Apply for Faculty Position'}</span>
      </button>
    </form>
  );
}

// 4. Contact Form
interface ContactFormProps {
  onSubmit: (data: any) => Promise<void>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.message) {
      setError('Required fields are missing.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSubmit(formData);
      setSuccess(true);
    } catch (err) {
      setError('Message dispatch failure. Retry.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center flex flex-col items-center">
        <CheckCircle className="w-12 h-12 text-amber-500 mb-2 animate-bounce" />
        <h4 className="text-white font-bold text-lg">Inquiry Sent Successfully!</h4>
        <p className="text-slate-400 text-xs mt-1">Our customer experience advisor will call you within 24 hours.</p>
        <button
          type="button"
          onClick={() => { setSuccess(false); setFormData({ fullName: '', email: '', phone: '', message: '' }); }}
          className="mt-3 px-4 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="p-2 bg-red-50 text-red-600 rounded-lg text-xs flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Your Name *</label>
        <input
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="e.g. Suhail Ahmed"
          className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="email@domain.com"
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Contact Number *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="70061 XXXX"
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Message / Inquiry Details *</label>
        <textarea
          required
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Ask us anything about timings, courses, certifications, hostel, or fees..."
          className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-500 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs rounded-lg uppercase tracking-widest hover:from-amber-400 hover:to-amber-500 transition-colors flex items-center justify-center gap-2 mt-2"
      >
        {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
        <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
      </button>
    </form>
  );
}

// 5. Testimonial / Share Experience Form
interface TestimonialFormProps {
  onSubmit: (data: any) => Promise<void>;
}

export function TestimonialForm({ onSubmit }: TestimonialFormProps) {
  const [formData, setFormData] = useState({ name: '', role: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.text) {
      setError('Please provide your name and statement.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSubmit(formData);
      setSuccess(true);
    } catch (err) {
      setError('Failed to log review. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-500/20 text-slate-900 rounded-xl text-center flex flex-col items-center">
        <CheckCircle className="w-10 h-10 text-amber-500 mb-1" />
        <h4 className="font-bold text-sm">Feedback Registered!</h4>
        <p className="text-slate-600 text-[11px] mt-0.5">Your review has been sent to the board for review. Once approved, it will go live on our testimonials block!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 bg-slate-100 p-4 rounded-xl border border-slate-200">
      <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">Write a Student Review</h4>
      
      {error && (
        <div className="p-1 text-red-600 text-[10px]">
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your Name *"
          className="px-2 py-1.5 rounded bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <input
          type="text"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          placeholder="Role (e.g. Nursing Student)"
          className="px-2 py-1.5 rounded bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      <textarea
        required
        rows={2}
        value={formData.text}
        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
        placeholder="Share your learning experience at BY ADVANCED Group..."
        className="w-full px-2 py-1.5 rounded bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded uppercase tracking-wider transition-colors"
      >
        {loading ? 'Saving...' : 'Submit Review'}
      </button>
    </form>
  );
}
