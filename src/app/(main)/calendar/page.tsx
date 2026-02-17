'use client';
import * as React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { events } from "@/lib/placeholder-data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const eventsByDate = React.useMemo(() => {
    return events.reduce((acc, event) => {
      const eventDate = new Date(event.date).toDateString();
      if (!acc[eventDate]) {
        acc[eventDate] = [];
      }
      acc[eventDate].push(event);
      return acc;
    }, {} as Record<string, typeof events>);
  }, []);

  const DayWithEvents = ({ date }: { date: Date }) => {
    if (!date) {
        return <></>;
    }
    const eventsForDay = eventsByDate[date.toDateString()];
    if (eventsForDay) {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              {date.getDate()}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-0.5">
                {eventsForDay.slice(0,3).map((event, i) => (
                   <div key={i} className="h-1.5 w-1.5 rounded-full bg-accent" />
                ))}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Events on {date.toLocaleDateString()}</h4>
                <div className="grid gap-2">
                  {eventsForDay.map(event => (
                    <div key={event.id} className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {event.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{event.time} at {event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    }
    return <div>{date.getDate()}</div>;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Event Calendar</h1>
        <p className="text-muted-foreground">
          View all upcoming events in a monthly calendar. Click on a day with a dot to see event details.
        </p>
      </div>
       <div className="p-4 sm:p-6 bg-card rounded-lg shadow-sm">
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-0"
            components={{
              Day: ({ date }) => <DayWithEvents date={date} />,
            }}
            classNames={{
                day_cell: 'h-16 w-full text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                day: 'h-16 w-full p-2 font-normal aria-selected:opacity-100',
                head_cell: 'text-muted-foreground rounded-md w-full font-normal text-sm pb-2',
                row: 'flex w-full mt-2 border-t',
                cell: 'flex-1',
                day_today: 'bg-accent/10 text-accent-foreground',
                day_selected: 'bg-accent/20 text-accent-foreground'
            }}
        />
       </div>
    </div>
  );
}
