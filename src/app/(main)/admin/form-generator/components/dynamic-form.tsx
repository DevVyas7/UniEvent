'use client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import type { Field } from '@/ai/flows/generate-event-form';

interface DynamicFormProps {
  formTitle: string;
  formDescription?: string;
  fields: Field[];
}

export function DynamicForm({ formTitle, formDescription, fields }: DynamicFormProps) {
  const form = useForm();

  function onSubmit(data: any) {
    console.log(data);
    alert('Form submitted! Check the console for data.');
  }

  return (
    <div>
        <h2 className="text-2xl font-bold">{formTitle}</h2>
        {formDescription && <p className="text-muted-foreground mt-2 mb-6">{formDescription}</p>}
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field) => (
            <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                defaultValue={field.defaultValue || ''}
                render={({ field: formField }) => (
                <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                    {(() => {
                        switch (field.type) {
                        case 'select':
                            return (
                            <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                                <SelectTrigger>
                                <SelectValue placeholder={field.placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                {field.options?.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            );
                        case 'textarea':
                            return <Textarea placeholder={field.placeholder} {...formField} />;
                        case 'date':
                            return (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !formField.value && "text-muted-foreground"
                                        )}
                                        >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formField.value ? format(formField.value, "PPP") : <span>{field.placeholder || 'Pick a date'}</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                        mode="single"
                                        selected={formField.value}
                                        onSelect={formField.onChange}
                                        initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            );
                        case 'checkbox':
                             return <div className="flex items-center space-x-2">
                                <Checkbox id={field.name} onCheckedChange={formField.onChange} checked={formField.value} />
                                <label htmlFor={field.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {field.label}
                                </label>
                            </div>
                        case 'radio':
                            return (
                                <RadioGroup onValueChange={formField.onChange} defaultValue={formField.value}>
                                    {field.options?.map(option => (
                                        <div key={option.value} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
                                            <Label htmlFor={`${field.name}-${option.value}`}>{option.label}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )
                        default:
                            return <Input type={field.type} placeholder={field.placeholder} {...formField} />;
                        }
                    })()}
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            ))}
            <Button type="submit" className="bg-primary hover:bg-primary/90">Submit</Button>
        </form>
        </Form>
    </div>
  );
}
