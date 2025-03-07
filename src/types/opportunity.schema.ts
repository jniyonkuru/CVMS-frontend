
import {z} from "zod"
import dayjs from "dayjs";
const OpportunityStatusTypeSchema = z.enum(['open', 'closed', 'ongoing'], {
    errorMap: () => ({ message: 'Status must be one of: open, closed, ongoing' }),
});

 export const locationSchema = z.object({
    city: z.string().min(1,{message:"City is required"}),
    country: z.string().min(1,{message:"message is required"}),
  });
  
 export const OpportunityValidationSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    skillsRequired: z.array(z.string().min(1, { message: 'Skill cannot be empty' })).nonempty({
        message: 'At least one skill is required',
    }),
    location: locationSchema,
    startDate: z.date().refine(date=>dayjs(date).isValid()),
    endDate: z.date().refine(date=>dayjs(date).isValid()),
    duration: z.string().optional(),
    numberOfVolunteerNeeded: z.number().int().positive({
        message: 'Number of volunteers needed must be a positive integer',
    }),
    status: OpportunityStatusTypeSchema.optional(),
}).strict().refine(data => dayjs(data.endDate).isAfter(dayjs(data.startDate)), {
    message: "End date must be greater than start date",
    path: ["endDate"]
  });

 export type Opportunity= z.infer<typeof OpportunityValidationSchema>