import { FormGenerator } from './components/form-generator';

export default function FormGeneratorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Form Generator</h1>
        <p className="text-muted-foreground">
          Instantly create context-aware forms for any purpose. Just specify your needs, and let our AI handle the rest.
        </p>
      </div>
      <FormGenerator />
    </div>
  );
}
