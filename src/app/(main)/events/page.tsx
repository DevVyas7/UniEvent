import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { events } from "@/lib/placeholder-data";
import { Search, MapPin, Calendar as CalendarIcon } from "lucide-react";

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Browse Events</h1>
        <p className="text-muted-foreground">Find your next experience. Search for events by name, category, or location.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for events..." className="pl-10 w-full md:w-1/2 lg:w-1/3" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col h-full">
            <CardHeader>
              <Badge variant="secondary" className="mb-2 w-fit">{event.category}</Badge>
              <CardTitle className="text-lg line-clamp-1">{event.name}</CardTitle>
              <CardDescription className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                <CalendarIcon className="h-3 w-3" />
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <p className="line-clamp-2">{event.location}</p>
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between items-center">
              <p className="font-semibold text-primary">{event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}</p>
              <Button asChild size="sm">
                <Link href={`/events/${event.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

// A simple badge component to avoid creating a new file for a small use case
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
)
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
