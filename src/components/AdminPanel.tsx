import React, { useState } from 'react';
import { 
  Lock, Check, X, Trash, Eye, Calendar, User, 
  MapPin, MessageSquare, Briefcase, GraduationCap, Image, RefreshCw, LogOut
} from 'lucide-react';
import { 
  Admission, WorkshopRegistration, ContactMessage, 
  CareerApplication, Testimonial, GalleryItem 
} from '../types';

interface AdminPanelProps {
  admissions: Admission[];
  workshops: WorkshopRegistration[];
  contacts: ContactMessage[];
  careers: CareerApplication[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  onUpdateStatus: (collection: string, id: string, payload: any) => Promise<void>;
  onAddGalleryItem: (item: { title: string; category: string; image: string }) => Promise<void>;
  onDeleteGalleryItem: (id: string) => Promise<void>;
  onClose: () => void;
}

export default function AdminPanel({
  admissions,
  workshops,
  contacts,
  careers,
  testimonials,
  gallery,
  onUpdateStatus,
  onAddGalleryItem,
  onDeleteGalleryItem,
  onClose
}: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'admissions' | 'workshops' | 'contacts' | 'careers' | 'testimonials' | 'gallery'>('admissions');
  const [newGalItem, setNewGalItem] = useState({ title: '', category: 'Healthcare', image: '' });
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '70061' || password === 'admin' || password === '7006143637') {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Invalid Admin Password. Hint: Use 70061');
    }
  };

  const executeAction = async (actionKey: string, fn: () => Promise<void>) => {
    setActionLoading(actionKey);
    try {
      await fn();
    } catch (err) {
      alert('Operation failed. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto my-12 bg-slate-900 border border-slate-800 text-white rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Database Portal Login</h2>
          <p className="text-slate-400 text-xs mt-1">
            Access secure database storage logs of ADVANCED Group.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Admin Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Hint: 70061"
              className="w-full px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-white text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors uppercase tracking-wider"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-w-7xl mx-auto my-6">
      
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Database Storage Explorer (Admin Control Panel)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage live applications, workshop registrations, testimonial approvals, and gallery items.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAuthorized(false)}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors border border-slate-700"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="border-b border-slate-200 bg-slate-50 overflow-x-auto flex">
        {[
          { key: 'admissions', label: 'Admissions', icon: GraduationCap, count: admissions.length },
          { key: 'workshops', label: 'Workshops', icon: Calendar, count: workshops.length },
          { key: 'contacts', label: 'Contacts', icon: MessageSquare, count: contacts.length },
          { key: 'careers', label: 'Careers', icon: Briefcase, count: careers.length },
          { key: 'testimonials', label: 'Testimonials', icon: User, count: testimonials.length },
          { key: 'gallery', label: 'Gallery', icon: Image, count: gallery.length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? 'border-amber-500 text-amber-600 bg-white'
                : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <tab.icon className="w-4 h-4 shrink-0" />
            <span>{tab.label}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-200 text-[10px] text-slate-800 font-bold tabular-nums">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      <div className="p-6">
        
        {/* Tab 1: Admissions */}
        {activeTab === 'admissions' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Admission Applications</h3>
            {admissions.length === 0 ? (
              <p className="text-slate-500 text-xs">No admission application records saved in the database yet.</p>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase">
                    <tr>
                      <th className="p-3">Applicant / Phone</th>
                      <th className="p-3">Course Preferred</th>
                      <th className="p-3">Address & Qual</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                    {admissions.map((adm) => (
                      <tr key={adm.id} className="hover:bg-slate-50/50">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{adm.fullName}</div>
                          <div className="text-[10px] text-slate-400">{adm.phone} · {adm.email || 'No email'}</div>
                          <div className="text-[10px] text-slate-400">Applied: {new Date(adm.createdAt).toLocaleDateString()}</div>
                        </td>
                        <td className="p-3 text-slate-800 font-semibold">{adm.course}</td>
                        <td className="p-3">
                          <div>Qual: <span className="font-semibold text-slate-800">{adm.qualification}</span></div>
                          <div className="text-[10px] text-slate-500">{adm.address}</div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            adm.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                            adm.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {adm.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1 whitespace-nowrap">
                          {adm.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => executeAction(`adm-ap-${adm.id}`, () => onUpdateStatus('admissions', adm.id, { status: 'Approved' }))}
                                disabled={actionLoading !== null}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold uppercase"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => executeAction(`adm-rj-${adm.id}`, () => onUpdateStatus('admissions', adm.id, { status: 'Rejected' }))}
                                disabled={actionLoading !== null}
                                className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold uppercase"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {adm.status !== 'Pending' && (
                            <button
                              onClick={() => executeAction(`adm-pe-${adm.id}`, () => onUpdateStatus('admissions', adm.id, { status: 'Pending' }))}
                              disabled={actionLoading !== null}
                              className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-[10px] font-bold uppercase"
                            >
                              Reset
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Workshop Registrations */}
        {activeTab === 'workshops' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Workshop Registrations</h3>
            {workshops.length === 0 ? (
              <p className="text-slate-500 text-xs">No workshop registration records saved in the database yet.</p>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase">
                    <tr>
                      <th className="p-3">Attendee Details</th>
                      <th className="p-3">Workshop Registered</th>
                      <th className="p-3">Profession</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                    {workshops.map((wreg) => (
                      <tr key={wreg.id} className="hover:bg-slate-50/50">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{wreg.fullName}</div>
                          <div className="text-[10px] text-slate-400">{wreg.phone} · {wreg.email || 'No email'}</div>
                          <div className="text-[10px] text-slate-400">Date: {new Date(wreg.createdAt).toLocaleDateString()}</div>
                        </td>
                        <td className="p-3 text-slate-800 font-semibold">{wreg.workshop}</td>
                        <td className="p-3">{wreg.profession || 'Not Specified'}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            wreg.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {wreg.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1 whitespace-nowrap">
                          {wreg.status === 'Confirmed' ? (
                            <button
                              onClick={() => executeAction(`wreg-cl-${wreg.id}`, () => onUpdateStatus('workshops', wreg.id, { status: 'Cancelled' }))}
                              disabled={actionLoading !== null}
                              className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold uppercase"
                            >
                              Cancel Spot
                            </button>
                          ) : (
                            <button
                              onClick={() => executeAction(`wreg-cf-${wreg.id}`, () => onUpdateStatus('workshops', wreg.id, { status: 'Confirmed' }))}
                              disabled={actionLoading !== null}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold uppercase"
                            >
                              Confirm
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Contact Messages */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Contact Inquiries</h3>
            {contacts.length === 0 ? (
              <p className="text-slate-500 text-xs">No contact log entries saved in the database yet.</p>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase">
                    <tr>
                      <th className="p-3">Sender Details</th>
                      <th className="p-3">Message</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                    {contacts.map((msg) => (
                      <tr key={msg.id} className="hover:bg-slate-50/50">
                        <td className="p-3 whitespace-nowrap">
                          <div className="font-bold text-slate-900">{msg.fullName}</div>
                          <div className="text-[10px] text-slate-400">{msg.phone} · {msg.email || 'No email'}</div>
                          <div className="text-[10px] text-slate-400">Date: {new Date(msg.createdAt).toLocaleString()}</div>
                        </td>
                        <td className="p-3 max-w-sm">
                          <p className="text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
                            "{msg.message}"
                          </p>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            msg.status === 'Unread' ? 'bg-amber-100 text-amber-800' :
                            msg.status === 'Read' ? 'bg-cyan-100 text-cyan-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {msg.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1 whitespace-nowrap">
                          {msg.status === 'Unread' && (
                            <button
                              onClick={() => executeAction(`msg-rd-${msg.id}`, () => onUpdateStatus('contacts', msg.id, { status: 'Read' }))}
                              disabled={actionLoading !== null}
                              className="px-2 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-[10px] font-bold uppercase"
                            >
                              Mark Read
                            </button>
                          )}
                          {msg.status !== 'Replied' && (
                            <button
                              onClick={() => executeAction(`msg-rp-${msg.id}`, () => onUpdateStatus('contacts', msg.id, { status: 'Replied' }))}
                              disabled={actionLoading !== null}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold uppercase"
                            >
                              Mark Replied
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Careers Applicants */}
        {activeTab === 'careers' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Faculty Job Applicants</h3>
            {careers.length === 0 ? (
              <p className="text-slate-500 text-xs">No career application records saved in the database yet.</p>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase">
                    <tr>
                      <th className="p-3">Applicant / Contacts</th>
                      <th className="p-3">Position Target</th>
                      <th className="p-3">Exp & Cover Letter</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                    {careers.map((car) => (
                      <tr key={car.id} className="hover:bg-slate-50/50">
                        <td className="p-3 whitespace-nowrap">
                          <div className="font-bold text-slate-900">{car.fullName}</div>
                          <div className="text-[10px] text-slate-400">{car.phone} · {car.email || 'No email'}</div>
                          <div className="text-[10px] text-slate-400">Submitted: {new Date(car.createdAt).toLocaleDateString()}</div>
                        </td>
                        <td className="p-3 text-slate-800 font-semibold">{car.position}</td>
                        <td className="p-3">
                          <div className="font-bold text-slate-800 mb-0.5">Exp: {car.experience}</div>
                          <p className="text-[10px] text-slate-500 italic max-w-sm bg-slate-50 p-2 border border-slate-100 rounded">
                            "{car.coverLetter}"
                          </p>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            car.status === 'Hired' ? 'bg-emerald-100 text-emerald-800' :
                            car.status === 'Interviewing' ? 'bg-cyan-100 text-cyan-800' :
                            car.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {car.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1 whitespace-nowrap">
                          {car.status === 'Pending' && (
                            <button
                              onClick={() => executeAction(`car-int-${car.id}`, () => onUpdateStatus('careers', car.id, { status: 'Interviewing' }))}
                              disabled={actionLoading !== null}
                              className="px-2 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-[10px] font-bold uppercase"
                            >
                              Interview
                            </button>
                          )}
                          {car.status === 'Interviewing' && (
                            <button
                              onClick={() => executeAction(`car-hr-${car.id}`, () => onUpdateStatus('careers', car.id, { status: 'Hired' }))}
                              disabled={actionLoading !== null}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold uppercase"
                            >
                              Hire
                            </button>
                          )}
                          {car.status !== 'Rejected' && car.status !== 'Hired' && (
                            <button
                              onClick={() => executeAction(`car-rj-${car.id}`, () => onUpdateStatus('careers', car.id, { status: 'Rejected' }))}
                              disabled={actionLoading !== null}
                              className="px-2 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold uppercase"
                            >
                              Reject
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Testimonials Approval */}
        {activeTab === 'testimonials' && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Student Reviews Approval</h3>
            <p className="text-xs text-slate-500">Only approved testimonials will be listed on the main landing page.</p>
            {testimonials.length === 0 ? (
              <p className="text-slate-500 text-xs">No testimonials saved in the database yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((test) => (
                  <div key={test.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{test.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          test.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {test.approved ? 'Approved / Live' : 'Pending Review'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">{test.role}</span>
                      <p className="text-slate-600 text-xs italic mt-2">"{test.text}"</p>
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/60">
                      {test.approved ? (
                        <button
                          onClick={() => executeAction(`test-da-${test.id}`, () => onUpdateStatus('testimonials', test.id, { approved: false }))}
                          disabled={actionLoading !== null}
                          className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded text-xs font-semibold"
                        >
                          Revoke Approval
                        </button>
                      ) : (
                        <button
                          onClick={() => executeAction(`test-ap-${test.id}`, () => onUpdateStatus('testimonials', test.id, { approved: true }))}
                          disabled={actionLoading !== null}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold"
                        >
                          Approve Live
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 6: Gallery Manager */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            
            {/* Gallery Addition Form */}
            <div className="p-5 border border-slate-200 bg-slate-50 rounded-xl max-w-xl">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Add Custom Gallery Card</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Card Title</label>
                    <input
                      type="text"
                      placeholder="e.g. CPR Practice lab"
                      value={newGalItem.title}
                      onChange={(e) => setNewGalItem({ ...newGalItem, title: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded bg-white text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Category</label>
                    <select
                      value={newGalItem.category}
                      onChange={(e) => setNewGalItem({ ...newGalItem, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded bg-white text-xs text-slate-800"
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Skill Development">Skill Development</option>
                      <option value="Events">Events</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Image URL or Path</label>
                  <select
                    value={newGalItem.image}
                    onChange={(e) => setNewGalItem({ ...newGalItem, image: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white text-xs text-slate-800"
                  >
                    <option value="">-- Choose High-Fidelity Photo --</option>
                    <option value="/src/assets/images/gallery_healthcare_workshop_1791027384343.jpg">Healthcare CPR practice lab</option>
                    <option value="/src/assets/images/gallery_it_skill_workshop_1791027399765.jpg">IT skill development computer lab</option>
                    <option value="/src/assets/images/gallery_graduation_ceremony_1791027413172.jpg">Graduation Ceremony photo</option>
                    <option value="/src/assets/images/about_training_facility_1791027367951.jpg">Advanced institute classrooms exterior</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!newGalItem.title || !newGalItem.image) {
                      alert('Please specify a title and image asset.');
                      return;
                    }
                    executeAction('add-gallery', async () => {
                      await onAddGalleryItem(newGalItem);
                      setNewGalItem({ title: '', category: 'Healthcare', image: '' });
                    });
                  }}
                  disabled={actionLoading !== null}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold text-xs uppercase"
                >
                  Save Gallery Card
                </button>
              </div>
            </div>

            {/* Gallery Cards List */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Existing Cards</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="border border-slate-200 rounded-xl bg-slate-50 overflow-hidden flex flex-col justify-between">
                    <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 text-xs block truncate max-w-[150px]">{item.title}</span>
                        <span className="text-[10px] text-slate-500">{item.category}</span>
                      </div>
                      <button
                        onClick={() => executeAction(`gal-del-${item.id}`, () => onDeleteGalleryItem(item.id))}
                        disabled={actionLoading !== null}
                        className="p-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded transition-colors"
                        title="Delete Card"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
