'use server';

import { generateEventForm, type GenerateEventFormInput } from '@/ai/flows/generate-event-form';
import { z } from 'zod';

const FormGeneratorSchema = z.object({
  eventType: z.string().min(1, 'Event type is required.'),
  userRole: z.string().min(1, 'User role is required.'),
  formPurpose: z.string().min(1, 'Form purpose is required.'),
  additionalInstructions: z.string().optional(),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  data?: any;
};

export async function handleGenerateForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormGeneratorSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      issues: validatedFields.error.flatten().fieldErrors.root,
    };
  }
  
  try {
    const input: GenerateEventFormInput = validatedFields.data;
    const formOutput = await generateEventForm(input);
    return { message: 'Form generated successfully.', data: formOutput };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { message: `Form generation failed: ${errorMessage}` };
  }
}
