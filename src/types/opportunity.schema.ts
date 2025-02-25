
import {z} from "zod"
const OpportunityStatusTypeSchema = z.enum(['open', 'closed', 'ongoing'], {
    errorMap: () => ({ message: 'Status must be one of: open, closed, ongoing' }),
});

const locationSchema = z.object({
    city: z.string().min(1,{message:"City is required"}),
    country: z.string().min(1,{message:"message is required"}),
  });
  
 export const OpportunityValidationSchema = z.object({
    _id: z.string(),
    organizationId: z.string(),
    title: z.string().min(1, { message: 'Title is required' }),
    skillsRequired: z.array(z.string().min(1, { message: 'Skill cannot be empty' })).nonempty({
        message: 'At least one skill is required',
    }),
    location: locationSchema,
    startDate: z.date(),
    endDate: z.date(),
    duration: z.string().min(1, { message: 'Duration is required' }),
    numberOfVolunteerNeeded: z.number().int().positive({
        message: 'Number of volunteers needed must be a positive integer',
    }),
    status: OpportunityStatusTypeSchema.optional(),
}).strict();

 export type Opportunity= z.infer<typeof OpportunityValidationSchema>