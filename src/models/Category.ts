import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  icon: string;
  createdAt: Date;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    icon: {
      type: String, // E.g., 'Wallet', 'GraduationCap' corresponding to lucide-react names
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation in development
export const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
