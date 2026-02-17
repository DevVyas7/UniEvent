'use server';
/**
 * @fileOverview A Genkit flow for managers to generate compelling event descriptions.
 *
 * - generateEventDescription - A function that handles the event description generation process.
 * - GenerateEventDescriptionInput - The input type for the generateEventDescription function.
 * - GenerateEventDescriptionOutput - The return type for the generateEventDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventDescriptionInputSchema = z.object({
  eventName: z.string().describe('The name of the event.'),
  eventDate: z.string().describe('The date of the event (e.g., "October 26, 2024").'),
  eventTime: z.string().describe('The time of the event (e.g., "6:00 PM - 9:00 PM PST").'),
  eventLocation: z.string().describe('The location of the event.'),
  eventType: z.string().describe('The type of event (e.g., "Music Concert", "Tech Conference", "Art Workshop").'),
  targetAudience: z.string().describe('The primary audience for this event (e.g., "Young professionals", "Families with children", "Students interested in AI").'),
  keyFeatures: z.string().describe('Comma-separated list of key features or highlights of the event (e.g., "Live band, Food trucks, Interactive exhibits").'),
  additionalNotes: z.string().optional().describe('Any additional information or special instructions for the event description.'),
});
export type GenerateEventDescriptionInput = z.infer<typeof GenerateEventDescriptionInputSchema>;

const GenerateEventDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling and detailed event description.'),
});
export type GenerateEventDescriptionOutput = z.infer<typeof GenerateEventDescriptionOutputSchema>;

export async function generateEventDescription(input: GenerateEventDescriptionInput): Promise<GenerateEventDescriptionOutput> {
  return generateEventDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEventDescriptionPrompt',
  input: {schema: GenerateEventDescriptionInputSchema},
  output: {schema: GenerateEventDescriptionOutputSchema},
  prompt: `You are an expert event marketer. Your task is to craft a compelling and detailed event description based on the provided information.

Make sure the description is engaging, highlights the key benefits, and clearly communicates essential details to attract the target audience.

Event Name: {{{eventName}}}
Event Date: {{{eventDate}}}
Event Time: {{{eventTime}}}
Event Location: {{{eventLocation}}}
Event Type: {{{eventType}}}
Target Audience: {{{targetAudience}}}
Key Features: {{{keyFeatures}}}
{{#if additionalNotes}}Additional Notes: {{{additionalNotes}}}{{/if}}

Generate a detailed and compelling event description:`,
});

const generateEventDescriptionFlow = ai.defineFlow(
  {
    name: 'generateEventDescriptionFlow',
    inputSchema: GenerateEventDescriptionInputSchema,
    outputSchema: GenerateEventDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
