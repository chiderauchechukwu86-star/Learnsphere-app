# LearnSphere

A full-stack scaffold for the LMS described in **`LearnSphere_SSD.docx`** (Software
Specification Document, v2.0). It implements the SSD's core modules end-to-end —
auth, the three role dashboards, course curriculum, video learning, quizzes,
certificates, reviews, search, and notifications — on the stack the SSD specifies:
**Next.js + NestJS + MongoDB**.

This is a working scaffold, not a finished commercial product: the UI is fully
built and interactive, the API has real auth/business logic and MongoDB schemas,
but a few integration points (Cloudinary uploads, email delivery, payments) are
stubbed with clear comments showing where to plug in a provider.

```
learnsphere-app/
├── backend/   NestJS API (MongoDB via Mongoose)
└── frontend/  Next.js 14 app (App Router, TypeScript, Tailwind)
```

## How this maps to the SSD

| SSD section | Where it lives |
|---|---|
| §5.1 Authentication | `backend/src/modules/auth`, `frontend/app/(auth)` |
| §5.2–5.4 Dashboards | `frontend/app/{student,instructor,admin}/dashboard` |
| §6 Course Module | `backend/src/modules/courses` (embedded curriculum) |
| §7 Video Learning | `frontend/components/VideoPlayer.tsx` |
| §8 Quiz System | `backend/src/modules/quizzes`, `frontend/components/QuizEngine.tsx` |
| §9 Certificates | `backend/src/modules/certificates` (QR + signature) |
| §10 Search & Discovery | `backend/src/modules/courses` (`GET /courses` query params) |
| §11 Reviews & Ratings | `backend/src/modules/reviews` |
| §12 Notifications | `backend/src/modules/notifications` |
| §13 Database Design | `backend/src/modules/*/schemas` — see modeling notes below |

## Quick start

**Prerequisites:** Node.js 20+, a MongoDB instance (local `mongod` or a free
[MongoDB Atlas](https://www.mongodb.com/atlas) cluster).

### 1. Backend

```bash
cd backend
cp .env.example .env      # fill in MONGODB_URI at minimum
npm install
npm run seed               # optional: creates demo student/instructor/admin + 1 course
npm run start:dev          # http://localhost:4000/api/v1
```

Seeded logins (all use password `password123`):
`student@learnsphere.dev`, `instructor@learnsphere.dev`, `admin@learnsphere.dev`.

### 2. Frontend

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev                # http://localhost:3000
```

The frontend currently reads from `lib/mock-data.ts` so the UI is fully explorable
without the backend running. Each dashboard/course page has a comment marking
where to swap the mock import for a live `api.get(...)` call once you're ready
to connect it — the `lib/api.ts` client and every matching NestJS endpoint are
already in place.

## Database design notes (MongoDB)

Per SSD §13, this uses embedding for data that's always read with its parent and
referencing for data queried independently:

- **Embedded:** a course's `curriculum` (sections → lessons) lives inside the
  `Course` document; an enrollment's `lessonProgress` lives inside the
  `Enrollment` document.
- **Referenced:** `enrollments`, `reviews`, `quizzes`, and `certificates` are
  separate collections keyed by `courseId` / `studentId`, since each is paginated
  or queried on its own.
- **Denormalized aggregates:** `Course.averageRating`, `reviewCount`, and
  `enrollmentCount` are updated by the reviews/enrollments services on write, so
  course listing pages never need a fan-out query.
- Certificates are issued automatically: `EnrollmentsService.markLessonComplete`
  detects 100% completion and calls `CertificatesService.issueForEnrollment`,
  which generates a unique certificate ID, a verification QR code, and a SHA-256
  signature hash.

## What's stubbed vs. real

**Real:** JWT auth (access + refresh), password hashing, role guards, Google
OAuth flow, all Mongoose schemas and indexes, quiz auto-grading, certificate
issuance + public verification, rating aggregation, the full Next.js UI.

**Stubbed (with a comment at the exact spot to fill in):**
- Video/PDF/image upload — wire `coverImageUrl` / `videoUrl` fields to Cloudinary.
- Email delivery for notifications — `NotificationsService.send` is where to
  enqueue a provider (SendGrid/SES).
- Payments — `Course.priceCents` exists; Stripe/Paystack checkout isn't implemented.

## Next steps

1. Point the frontend at the real API (swap `mock-data.ts` imports for `api.get`).
2. Add a file-upload provider for course media.
3. Add an instructor curriculum builder UI (create/edit `Section`/`Lesson`).
4. Add unit/e2e tests per SSD §14.7.
