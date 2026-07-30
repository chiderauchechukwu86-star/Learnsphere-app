'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export interface QuizQuestion {
  id: string;
  prompt: string;
  type?: 'single' | 'boolean';
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export default function QuizEngine({
  title,
  questions,
  passingScore = 70,
  onComplete,
}: {
  title: string;
  questions: QuizQuestion[];
  passingScore?: number;
  onComplete?: (passed: boolean, score: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = submitted
    ? Math.round(
        (questions.filter((q) => answers[q.id] === q.correctAnswer).length / questions.length) * 100,
      )
    : 0;
  const passed = score >= passingScore;

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="rounded-xl2 border border-line bg-card p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <span className="font-mono text-xs text-muted">Passing score: {passingScore}%</span>
      </div>

      <div className="mt-6 space-y-6">
        {questions.map((q, i) => {
          const selected = answers[q.id];
          return (
            <div key={q.id}>
              <p className="text-sm font-semibold text-ink">
                {i + 1}. {q.prompt}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt) => {
                  const isCorrect = submitted && opt === q.correctAnswer;
                  const isWrongPick = submitted && selected === opt && opt !== q.correctAnswer;
                  return (
                    <button
                      key={opt}
                      disabled={submitted}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                      className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-left text-sm transition ${
                        isCorrect
                          ? 'border-sage bg-sage-light text-sage-dark'
                          : isWrongPick
                          ? 'border-red-300 bg-red-50 text-red-700'
                          : selected === opt
                          ? 'border-brand bg-brand-light text-brand-dark'
                          : 'border-line hover:border-brand/40'
                      }`}
                    >
                      {opt}
                      {isCorrect && <CheckCircle2 size={15} />}
                      {isWrongPick && <XCircle size={15} />}
                    </button>
                  );
                })}
              </div>
              {submitted && q.explanation && (
                <p className="mt-2 rounded-lg bg-paper px-3 py-2 text-xs text-muted">{q.explanation}</p>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={() => {
            setSubmitted(true);
            const finalScore = Math.round(
              (questions.filter((q) => answers[q.id] === q.correctAnswer).length / questions.length) * 100,
            );
            onComplete?.(finalScore >= passingScore, finalScore);
          }}
          disabled={Object.keys(answers).length < questions.length}
          className="mt-6 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit quiz
        </button>
      ) : (
        <div className={`mt-6 flex items-center justify-between rounded-xl border p-4 ${
          passed ? 'border-sage bg-sage-light' : 'border-amber bg-amber-light'
        }`}>
          <div>
            <p className={`font-mono text-2xl font-semibold ${passed ? 'text-sage-dark' : 'text-amber-dark'}`}>
              {score}%
            </p>
            <p className="text-sm text-ink/70">
              {passed ? 'Passed — nice work.' : 'Not quite there — review and try again.'}
            </p>
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold hover:bg-paper"
          >
            <RotateCcw size={13} /> Retry
          </button>
        </div>
      )}
    </div>
  );
}
