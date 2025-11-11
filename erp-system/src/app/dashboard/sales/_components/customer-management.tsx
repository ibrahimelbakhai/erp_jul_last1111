'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { createCustomer, deleteCustomer } from '../actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Customer } from '@prisma/client';

export function CustomerManagement({ customers }: { customers: Customer[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, formAction] = useFormState(createCustomer, { success: false, message: '' });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add Customer</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <form action={formAction}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" />
                </div>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="mt-4">
          <ul className="space-y-2">
            {customers.map((customer) => (
              <li key={customer.id} className="flex justify-between items-center">
                <span>{customer.name}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={async () => await deleteCustomer(customer.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
