'use server';
/**
 * @fileOverview An AI agent that generates event-related forms based on event type, user role, and form purpose.
 *
 * - generateEventForm - A function that handles the form generation process.
 * - GenerateEventFormInput - The input type for the generateEventForm function.
 * - GenerateEventFormOutput - The return type for the generateEventForm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FieldOptionSchema = z.object({
  label: z.string().describe('The display label for the option.'),
  value: z.string().describe('The internal value for the option.'),
});
export type FieldOption = z.infer<typeof FieldOptionSchema>;

const FieldSchema = z.object({
  name: z.string().describe('The programmatic name of the form field (e.g., "fullName", "email").'),
  label: z.string().describe('The human-readable label for the form field (e.g., "Full Name", "Email Address").'),
  type: z.enum(['text', 'email', 'number', 'select', 'date', 'textarea', 'checkbox', 'radio', 'password', 'tel'])
    .describe('The HTML input type for the field or custom type like "select", "textarea".'),
  placeholder: z.string().optional().describe('Placeholder text for the input field.'),
  required: z.boolean().describe('Whether the field is required for submission.'),
  validationRules: z.array(z.string())
    .describe('An array of validation rule strings (e.g., "min:3", "max:255", "email_format", "numeric", "past_date", "url_format", "regex:^[0-9]{10}$").'),
  options: z.array(FieldOptionSchema).optional().describe('An array of options for "select" or "radio" type fields.'),
  defaultValue: z.any().optional().describe('Default value for the field.')
});
export type Field = z.infer<typeof FieldSchema>;

const GenerateEventFormInputSchema = z.object({
  eventType: z.string().describe('The type of event (e.g., "conference", "workshop", "concert", "webinar", "sporting event").'),
  userRole: z.string().describe('The role of the user for whom the form is being generated (e.g., "attendee", "speaker", "organizer", "vendor").'),
  formPurpose: z.string().describe('The purpose of the form (e.g., "event registration", "feedback collection", "speaker application", "ticket purchase", "booth booking").'),
  additionalInstructions: z.string().optional().describe('Any specific instructions or requirements for the form (e.g., "collect dietary restrictions", "include a field for company name", "make sure to ask for t-shirt size").'),
});
export type GenerateEventFormInput = z.infer<typeof GenerateEventFormInputSchema>;

const GenerateEventFormOutputSchema = z.object({
  formTitle: z.string().describe('A suitable, concise title for the generated form.'),
  formDescription: z.string().optional().describe('A brief and helpful description of the form and its purpose.'),
  fields: z.array(FieldSchema).describe('An array of form field definitions, structured according to the FieldSchema.'),
});
export type GenerateEventFormOutput = z.infer<typeof GenerateEventFormOutputSchema>;

export async function generateEventForm(input: GenerateEventFormInput): Promise<GenerateEventFormOutput> {
  return generateEventFormFlow(input);
}

const generateEventFormPrompt = ai.definePrompt({
  name: 'generateEventFormPrompt',
  input: {schema: GenerateEventFormInputSchema},
  output: {schema: GenerateEventFormOutputSchema},
  prompt: `You are an expert form designer AI. Your task is to generate a JSON object representing a web form, including its title, description, and a list of fields with their properties and validation rules.

Based on the following information, design a suitable form:

Event Type: {{{eventType}}}
User Role: {{{userRole}}}
Form Purpose: {{{formPurpose}}}
{{#if additionalInstructions}}
Additional Instructions: {{{additionalInstructions}}}
{{/if}}

Please generate a JSON object that adheres to the following schema for the form. Ensure that all aspects of the schema are respected, including the exact field names, types, and the structure of nested objects and arrays.
{{json-schema GenerateEventFormOutputSchema}}

Ensure that the generated fields are contextually appropriate for the event type, user role, and form purpose. Include common and necessary fields, as well as relevant validation rules. For 'select' or 'radio' type fields, provide a reasonable set of options (at least 3-5 options if applicable). Make sure 'name' fields are camelCase and unique.
`
});

const generateEventFormFlow = ai.defineFlow(
  {
    name: 'generateEventFormFlow',
    inputSchema: GenerateEventFormInputSchema,
    outputSchema: GenerateEventFormOutputSchema,
  },
  async (input) => {
    const {output} = await generateEventFormPrompt(input);
    if (!output) {
      throw new Error('Failed to generate form output.');
    }
    return output;
  }
);
