import { z } from "zod";
import { locationSchema } from "./opportunity.schema";

 export const volunteerAvailabilityType = z.enum(["weekdays", "weekends", "flexible"]);
const statusType = z.enum(["active", "inactive"]);

const volunteerValidationSchema = z.object({
  _id: z.string().optional(), 
  firstName: z.string().max(255).min(1,{message:"first name is required"}),
  lastName: z.string().max(255).min(1,{message:"last name is required"}),
  email: z.string().email(), 
  phoneNumber: z.string().regex(/^07[1289][0-9]{7}$/, {
    message: "Invalid Rwandan phone number. It should start with 07[1,2,8,9] and have 10 digits.",
  }),
  password: z.string().min(8,{message:"password should be at least 8 characters"}),
  skills: z.array(z.string()),
  interests: z.array(z.string()), 
  availability: volunteerAvailabilityType, 
  location: locationSchema, 
  profilePicture: z.string().optional(), 
  dateJoined: z.date().optional(), 
  status: statusType.optional(),
}).strict();

 export type volunteer=z.infer<typeof volunteerValidationSchema>
 export type availabilityType=z.infer<typeof volunteerAvailabilityType>
export default volunteerValidationSchema;