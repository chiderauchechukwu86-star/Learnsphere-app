'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Award, Download, Share2, ShieldCheck, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockCertificates } from '@/lib/mock-data';

export default function CertificatesPage() {
  const [toast, setToast] = useState('');

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 2500);
  };

  const handleShare = async (certificateId: string) => {
    const url = `${window.location.origin}/certificates/verify/${certificateId}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast('Verification link copied to clipboard');
    } catch {
      showToast(url);
    }
  };

  const handleDownload = () => {
    // Real implementation: GET /certificates/:id/pdf (backend/src/modules/certificates
    // has the pdfkit dependency in place — this is the wiring point).
    showToast('Connect the backend to generate a downloadable PDF');
  };

  return (
    <div>
      <Navbar />
      <section className="border-b border-line bg-white py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight">Your certificates</h1>
          <p className="mt-2 text-muted">Every certificate is verifiable by anyone with its ID or QR code.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          {mockCertificates.length === 0 ? (
            <div className="rounded-xl2 border border-dashed border-line p-12 text-center">
              <Award className="mx-auto text-muted" size={28} />
              <p className="mt-3 text-sm text-muted">Finish a course to earn your first certificate.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {mockCertificates.map((cert) => (
                <div key={cert._id} className="overflow-hidden rounded-xl2 border border-line bg-card shadow-card">
                  <div className="border-b-2 border-brand bg-brand-light p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
                        <Award size={18} />
                      </span>
                      <span className="font-mono text-xs text-brand-dark">{cert.certificateId}</span>
                    </div>
                    <h2 className="mt-4 font-display text-lg font-semibold text-brand-dark">{cert.courseName}</h2>
                    <p className="mt-1 text-sm text-ink/70">
                      Awarded to <span className="font-semibold">{cert.studentName}</span>
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      Instructor {cert.instructorName} · {new Date(cert.completionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <Link
                      href={`/certificates/verify/${cert.certificateId}`}
                      className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-dark"
                    >
                      <ShieldCheck size={14} /> Verify
                    </Link>
                    <div className="flex gap-2">
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:bg-paper"
                      >
                        <Download size={13} /> PDF
                      </button>
                      <button
                        onClick={() => handleShare(cert.certificateId)}
                        className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:bg-paper"
                      >
                        <Share2 size={13} /> Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm text-white shadow-lift">
          <Check size={14} className="text-sage" />
          {toast}
        </div>
      )}
    </div>
  );
}
