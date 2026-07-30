/**
 * One-shot database seed for local development / demos.
 * Usage: MONGODB_URI=... npx ts-node src/database/seed.ts
 */
import 'reflect-metadata';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserSchema } from '../modules/users/schemas/user.schema';
import { CourseSchema } from '../modules/courses/schemas/course.schema';

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnsphere';
  await mongoose.connect(uri);

  const User = mongoose.model('User', UserSchema);
  const Course = mongoose.model('Course', CourseSchema);

  await Promise.all([User.deleteMany({}), Course.deleteMany({})]);

  const passwordHash = await bcrypt.hash('password123', 12);

  const instructor = await User.create({
    fullName: 'Amara Chukwu',
    email: 'instructor@learnsphere.dev',
    passwordHash,
    role: 'instructor',
    isInstructorApproved: true,
  });

  const student = await User.create({
    fullName: 'Jordan Ade',
    email: 'student@learnsphere.dev',
    passwordHash,
    role: 'student',
  });

  const admin = await User.create({
    fullName: 'Platform Admin',
    email: 'admin@learnsphere.dev',
    passwordHash,
    role: 'admin',
  });

  await Course.create({
    title: 'Networking Fundamentals',
    slug: 'networking-fundamentals',
    subtitle: 'The building blocks every network engineer starts with',
    description: 'Start from zero: what a network is, how it\'s shaped, and what hardware makes it work.',
    instructorId: instructor._id,
    category: 'Networking',
    difficulty: 'beginner',
    priceCents: 0,
    status: 'published',
    curriculum: [
      {
        id: 's1',
        title: 'Foundations of Networking',
        lessons: [
          {
            id: 'nf-l1',
            title: 'What Is a Network?',
            type: 'reading',
            estimatedMinutes: 15,
            isPreview: true,
            pages: [
              {
                id: 'p1',
                heading: 'Why We Network Computers',
                body: [
                  'A computer network is simply two or more devices connected so they can share resources and exchange information.',
                ],
                bullets: [],
              },
            ],
            quiz: {
              id: 'nf-l1-quiz',
              title: 'What Is a Network? — Knowledge Check',
              passingScore: 70,
              questions: [
                {
                  id: 'q1',
                  prompt: 'What is the primary purpose of connecting computers into a network?',
                  options: ['To make computers run faster', 'To share resources and communicate', 'To reduce the number of computers needed', 'To avoid using the internet'],
                  correctAnswer: 'To share resources and communicate',
                  explanation: 'Networking exists so devices can share resources like files and printers, and communicate with each other.',
                },
              ],
            },
          },
        ],
      },
    ],
    tags: ['networking', 'ccna', 'fundamentals'],
  });

  // Note: the full 5-course text-based networking curriculum (with every lesson,
  // page, diagram, and quiz) lives in frontend/lib/course-content.ts, which is
  // the source of truth the UI currently reads from. This seed only demonstrates
  // the equivalent shape in MongoDB for when the frontend is wired to the API.

  // eslint-disable-next-line no-console
  console.log('Seeded users:', { instructor: instructor.email, student: student.email, admin: admin.email });
  // eslint-disable-next-line no-console
  console.log('All seeded users share the password: password123');

  await mongoose.disconnect();
}

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
