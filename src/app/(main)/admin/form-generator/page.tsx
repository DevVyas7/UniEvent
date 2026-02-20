import { FormGenerator } from './components/form-generator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FormGeneratorPage() {
  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild className="pl-0 text-muted-foreground hover:bg-transparent hover:text-primary">
        <Link href="/admin/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Dashboard
        </Link>
      </Button>

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
