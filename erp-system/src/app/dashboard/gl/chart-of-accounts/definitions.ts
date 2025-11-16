import { GLAccount, AccountType } from '@prisma/client';

export type ChartOfAccountsTable = {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  currency: string;
  parent?: GLAccount | null;
  parentId?: string | null;
  children: GLAccount[];
};
