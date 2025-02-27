import {z}from 'zod';
import { locationSchema } from './opportunity.schema';

const OrganizationValidationSchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phoneNumber:z.string().regex(/^07[1289][0-9]{7}$/, {
        message: "Invalid Rwandan phone number. It should start with 07[1,2,8,9] and have 10 digits.",
      }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    focusArea: z.array(z.string()).nonempty({ message: 'At least one focus area is required' }),
    location: locationSchema,
    profilePicture: z.string().optional(),
    websiteUrl: z.string().url({ message: 'Invalid website URL' }),
    logo: z.string().optional(),
    dateRegistered: z.date().optional(),
    missionStatement: z.string().min(1, { message: 'Mission statement is required' }),
}).strict();

export type organization= z.infer<typeof OrganizationValidationSchema>;
export default OrganizationValidationSchema;