import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument, QuizAttempt, QuizAttemptDocument } from './schemas/quiz.schema';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    @InjectModel(QuizAttempt.name) private attemptModel: Model<QuizAttemptDocument>,
  ) {}

  create(data: Partial<Quiz>) {
    return this.quizModel.create(data);
  }

  async findById(id: string) {
    const quiz = await this.quizModel.findById(id).exec();
    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  findByCourse(courseId: string) {
    return this.quizModel.find({ courseId }).exec();
  }

  update(id: string, data: Partial<Quiz>) {
    return this.quizModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async attemptCount(quizId: string, studentId: string) {
    return this.attemptModel.countDocuments({ quizId, studentId });
  }

  /** Auto-grades a submission against `correctAnswers`, server-side only (never trust client scores). */
  async submitAttempt(
    quizId: string,
    studentId: string,
    answers: { questionId: string; submittedAnswers: string[] }[],
  ) {
    const quiz = await this.findById(quizId);

    let earned = 0;
    let total = 0;
    for (const q of quiz.questions) {
      total += q.marks;
      const submitted = answers.find((a) => a.questionId === q.id)?.submittedAnswers || [];
      const isCorrect =
        submitted.length === q.correctAnswers.length &&
        submitted.every((a) => q.correctAnswers.includes(a));
      if (isCorrect) earned += q.marks;
    }

    const scorePercent = total > 0 ? Math.round((earned / total) * 100) : 0;
    const passed = scorePercent >= quiz.passingScorePercent;

    const attempt = await this.attemptModel.create({
      quizId,
      studentId,
      answers,
      scorePercent,
      passed,
    });

    return attempt;
  }

  attemptsForStudent(quizId: string, studentId: string) {
    return this.attemptModel.find({ quizId, studentId }).sort({ submittedAt: -1 }).exec();
  }
}
