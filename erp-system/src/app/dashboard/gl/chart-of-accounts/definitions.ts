import { Account, AccountType } from '@prisma/client';

export type ChartOfAccountsTable = {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  currency: string;
  parent?: Account | null;
  parentId?: string | null;
  children: Account[];
};
