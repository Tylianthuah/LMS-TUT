import { z } from "zod";

export const courseCateogry = [
  "Programming & Development",
  "Data Science & Analytics",
  "Design & Creative Arts",
  "Business & Management",
  "Marketing & Sales",
  "Finance & Accounting",
  "Language Learning",
  "Health & Fitness",
  "Personal Development",
  "Music & Audio",
  "Engineering & Architecture",
  "Science & Mathematics",
  "Test Preparation",
  "Education & Teaching",
  "Lifestyle & Hobbies",
] as const;

export const courseLevel = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title is too long" }),
  description: z
    .string()
    .min(3, { message: "Description is too short" })
    .max(500, { message: "Description is too long" }),
  fileKey: z.string().min(1, { message: "File is required" }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 hour" })
    .max(500, { message: "Duration is too long" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be a positive number" }),
  level: z.enum(courseLevel, {
    message: "Level is required",
  }),
  category: z.enum(courseCateogry, { message: "Category is required" }),
  smallDescription: z
    .string()
    .min(3, { message: "Small description is too short" })
    .max(200, { message: "Small description is too long" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  status: z.enum(courseStatus, {
    message: "Status is required",
  }),
});

export type CourseFormData = z.infer<typeof courseSchema>;
