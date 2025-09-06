import { description } from '@/components/sidebar/chart-area-interactive';
import {z} from 'zod';

export const courseSchema = z.object({
    title: z.string().min(1, {message: 'Title is required'}).max(100, {message: 'Title is too long'}),
    description: z.string().min(3, {message: 'Description is too short'}).max(500, {message: 'Description is too long'}),
    fileKey: z.string().min(1, {message: 'File is required'}),
    duration: z.number().min(1, {message: 'Duration must be at least 1 hour'}).max(500, {message: 'Duration is too long'}),
    price: z.number().min(1, {message: 'Price must be a positive number'}),
    level : z.enum(['Beginner', 'Intermediate', 'Advanced'], {message: 'Level is required'}),
    category: z.string().min(1, {message: 'Category is required'}),
    smallDescription: z.string().min(3, {message: 'Small description is too short'}).max(200, {message: 'Small description is too long'}),
    slug: z.string().min(1, {message: 'Slug is required'}),
    status: z.enum(['Draft', 'Published', 'Archived'], {message: 'Status is required'}),
});

export type CourseFormData = z.infer<typeof courseSchema>;
