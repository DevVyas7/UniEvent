'use client';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { handleGenerateForm, type FormState } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2 } from 'lucide-react';
import { DynamicForm } from './dynamic-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Generate Form
        </>
      )}
    </Button>
  );
}

export function FormGenerator() {
  const [state, formAction] = useActionState(handleGenerateForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.data) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Form Details</CardTitle>
            <CardDescription>
              Describe the form you want to generate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type</Label>
              <Input id="eventType" name="eventType" placeholder="e.g., Conference, Workshop, Concert" required/>
            </div>
             <div className="space-y-2">
              <Label htmlFor="userRole">User Role</Label>
              <Input id="userRole" name="userRole" placeholder="e.g., Attendee, Speaker, Vendor" required/>
            </div>
             <div className="space-y-2">
              <Label htmlFor="formPurpose">Form Purpose</Label>
              <Input id="formPurpose" name="formPurpose" placeholder="e.g., Registration, Feedback, Application" required/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInstructions">Additional Instructions (Optional)</Label>
              <Textarea id="additionalInstructions" name="additionalInstructions" placeholder="e.g., 'Include a field for T-shirt size', 'Ask for dietary restrictions'"/>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <div className="bg-card rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-1">Generated Form Preview</h3>
        <p className="text-sm text-muted-foreground mb-4">The AI-generated form will appear here.</p>
        <div className="border-t pt-4">
           {state.data ? (
            <DynamicForm 
                formTitle={state.data.formTitle}
                formDescription={state.data.formDescription}
                fields={state.data.fields} />
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed rounded-lg">
                    <Bot className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">Your form preview awaits</p>
                </div>
            )}
             {state.issues && (
                 <Alert variant="destructive" className="mt-4">
                    <AlertTitle>Validation Error</AlertTitle>
                    <AlertDescription>
                        <ul>
                            {state.issues.map(issue => <li key={issue}>- {issue}</li>)}
                        </ul>
                    </AlertDescription>
                 </Alert>
             )}
        </div>
      </div>
    </div>
  );
}
