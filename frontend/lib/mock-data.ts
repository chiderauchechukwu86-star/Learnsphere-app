// Placeholder data so the UI renders meaningfully before the API is wired up
// or the database is seeded. Swap for `api.get(...)` calls once the backend
// is running — every page that imports this is a straightforward find/replace.
import { Course, Enrollment, Certificate } from './types';
import { networkingCourses } from './course-content';

export const mockCourses: Course[] = networkingCourses;

export const mockEnrollments: Enrollment[] = [
  { _id: 'e1', courseId: mockCourses[0], percentComplete: 25, status: 'active' },
  { _id: 'e2', courseId: mockCourses[1], percentComplete: 100, status: 'completed' },
  { _id: 'e3', courseId: mockCourses[2], percentComplete: 0, status: 'active' },
];

export const mockCertificates: Certificate[] = [
  {
    _id: 'c1',
    certificateId: 'LS-2026-4F2A9C',
    studentName: 'Jordan Ade',
    courseName: 'OSI & TCP/IP Models',
    instructorName: 'Amara Chukwu',
    completionDate: '2026-06-14',
  },
];
