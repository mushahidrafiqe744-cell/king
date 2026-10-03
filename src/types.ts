export interface Admission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  qualification: string;
  address: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

export interface WorkshopRegistration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  workshop: string;
  profession: string;
  status: 'Confirmed' | 'Cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  createdAt: string;
}

export interface CareerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  coverLetter: string;
  status: 'Pending' | 'Interviewing' | 'Hired' | 'Rejected';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  approved: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  createdAt: string;
}
