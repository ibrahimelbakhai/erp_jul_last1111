'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { createSalesOrder, deleteSalesOrder } from '../actions';
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
import { SalesOrder } from '@prisma/client';
import { Customer } from '@prisma/client';
import { Product } from '@prisma/client';

export function SalesOrderManagement({
  salesOrders,
  customers,
  products
}: {
  salesOrders: SalesOrder[],
  customers: Customer[],
  products: Product[]
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, formAction] = useFormState(createSalesOrder, { success: false, message: '' });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add Sales Order</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Sales Order</DialogTitle>
            </DialogHeader>
            <form action={formAction} className="space-y-4">
              <div>
                <Label htmlFor="customerId">Customer</Label>
                <select id="customerId" name="customerId" required className="w-full p-2 border rounded">
                  <option value="">Select a customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="orderDate">Order Date</Label>
                <Input id="orderDate" name="orderDate" type="date" required />
              </div>
              <div>
                <Label>Items</Label>
                {/* A more complex item selection UI would be needed here */}
              </div>
              <Button type="submit">Save</Button>
            </form>
          </DialogContent>
        </Dialog>

        <div className="mt-4">
          <ul className="space-y-2">
            {salesOrders.map((order) => (
              <li key={order.id} className="flex justify-between items-center">
                <span>Order #{order.id}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={async () => await deleteSalesOrder(order.id)}
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
