'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CallbackHandler() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      router.push('/student/dashboard');
    } else {
      router.push('/login');
    }
  }, [params, router]);

  return <p className="text-sm text-muted">Signing you in…</p>;
}

export default function AuthCallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <Suspense fallback={<p className="text-sm text-muted">Signing you in…</p>}>
        <CallbackHandler />
      </Suspense>
    </div>
  );
}
