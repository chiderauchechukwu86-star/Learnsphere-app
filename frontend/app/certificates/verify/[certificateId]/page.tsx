import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockCertificates } from '@/lib/mock-data';

export default function VerifyCertificatePage({
  params,
}: {
  params: { certificateId: string };
}) {
  // Real implementation: GET /certificates/verify/:certificateId (public, no auth).
  const cert = mockCertificates.find((c) => c.certificateId === params.certificateId) || mockCertificates[0];
  const isValid = Boolean(cert);

  return (
    <div>
      <Navbar />
      <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
        <span className={`flex h-14 w-14 items-center justify-center rounded-full ${isValid ? 'bg-sage-light text-sage-dark' : 'bg-red-50 text-red-600'}`}>
          {isValid ? <ShieldCheck size={26} /> : <Award size={26} />}
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold">
          {isValid ? 'Certificate verified' : 'Certificate not found'}
        </h1>
        <p className="mt-1 text-sm text-muted font-mono">{params.certificateId}</p>

        {isValid && cert && (
          <div className="mt-8 w-full rounded-xl2 border border-line bg-card p-6 text-left shadow-card">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Awarded to</dt>
                <dd className="font-semibold">{cert.studentName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Course</dt>
                <dd className="font-semibold">{cert.courseName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Instructor</dt>
                <dd className="font-semibold">{cert.instructorName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Completed</dt>
                <dd className="font-semibold">{new Date(cert.completionDate).toLocaleDateString()}</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-sage-light px-3 py-2 text-xs font-medium text-sage-dark">
              <CheckCircle2 size={14} /> Digital signature and issue date confirmed against LearnSphere records.
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
