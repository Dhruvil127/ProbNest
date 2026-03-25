import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IProblem extends Document {
  title: string;
  slug: string;
  category: Types.ObjectId;
  problemDescription: string;
  whyItHappens: string[];
  solutions: string[];
  opportunity: string;
  tags: string[];
  moderationStatus: 'pending' | 'approved' | 'spam';
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProblemSchema: Schema<IProblem> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    problemDescription: {
      type: String,
      required: true,
    },
    whyItHappens: [
      {
        type: String,
        required: true,
      },
    ],
    solutions: [
      {
        type: String,
        required: true,
      },
    ],
    opportunity: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    moderationStatus: {
      type: String,
      enum: ['pending', 'approved', 'spam'],
      default: 'pending',
      index: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Problem: Model<IProblem> =
  mongoose.models.Problem || mongoose.model<IProblem>('Problem', ProblemSchema);
