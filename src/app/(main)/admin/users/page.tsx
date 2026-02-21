import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { users } from "@/lib/placeholder-data";
import { User as UserIcon, ArrowLeft, ExternalLink } from "lucide-react";
import Link from 'next/link';

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild className="pl-0 text-muted-foreground hover:bg-transparent hover:text-primary">
        <Link href="/admin/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Dashboard
        </Link>
      </Button>

       <div>
        <h1 className="text-3xl font-bold tracking-tight">User Directory</h1>
        <p className="text-muted-foreground">View and audit all registered campus accounts.</p>
      </div>
      
      <div className="bg-card rounded-2xl shadow-lg border-none overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-bold py-5">User Identity</TableHead>
              <TableHead className="font-bold">System Role</TableHead>
              <TableHead className="text-right pr-6 font-bold">Audit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/10 transition-colors border-b last:border-none">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <UserIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="grid gap-0.5">
                      <p className="font-bold text-sm">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={user.role === 'admin' ? 'destructive' : user.role === 'organizer' ? 'default' : 'secondary'}
                    className="capitalize px-3 border-none font-semibold text-[10px]"
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Button variant="outline" size="sm" className="h-8 gap-2 rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary font-bold text-xs px-4">
                    View Details
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
