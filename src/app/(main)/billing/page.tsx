'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Download } from 'lucide-react';

export default function BillingPage() {
  const invoices = [
    { id: 'INV-001', date: '2024-03-01', amount: '$0.00', status: 'Paid' },
    { id: 'INV-002', date: '2024-02-01', amount: '$0.00', status: 'Paid' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
        <p className="text-muted-foreground">Manage your subscription plan and view billing history.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are currently on the Free plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">$0<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">✓ Browse all events</li>
              <li className="flex items-center gap-2">✓ Book up to 5 events/month</li>
              <li className="flex items-center gap-2">✓ Basic support</li>
            </ul>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Upgrade to Pro</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>No payment methods on file.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="bg-muted p-4 rounded-full">
              <CreditCard className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Add a payment method to upgrade your plan.</p>
            <Button variant="outline">Add Payment Method</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>View and download your recent invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
