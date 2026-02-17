import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { events } from "@/lib/placeholder-data";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ManagerDashboardPage() {
  // In a real app, this would be filtered by the logged-in manager's ID
  const managerEvents = events.filter(e => e.managerId === '2' || e.managerId === '5');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Events</h1>
          <p className="text-muted-foreground">Manage, edit, and create your events.</p>
        </div>
        <Button asChild>
          <Link href="/manager/events/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

       <div className="bg-card rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {managerEvents.map((event) => {
                const eventDate = new Date(event.date);
                const isUpcoming = eventDate > new Date();
                return(
                    <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{eventDate.toLocaleDateString()}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>{event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}</TableCell>
                        <TableCell>
                            <Badge variant={isUpcoming ? "default" : "secondary"} className={isUpcoming ? "bg-green-600 hover:bg-green-700" : ""}>
                                {isUpcoming ? "Upcoming" : "Past"}
                            </Badge>
                        </TableCell>
                        <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
       </div>
    </div>
  );
}
