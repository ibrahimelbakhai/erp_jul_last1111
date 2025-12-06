# ERP System Project Plan

This document outlines the complete, uniform specification for the ERP system. Each module follows a consistent structure, detailing its Data Objects, Processes, Validations, Reports, and Forms.

---

## 0) Core Platform

**Data Objects:** Companies/branches, warehouses, units, currencies/FX, taxes, users/roles, workflows, document numbering, attachments.
**Processes:** RBAC/approvals, audit logging, document/attachment handling, workflow routing, notifications, localization, integrations.
**Validations/Rules:** SoD, required master data, retention & privacy, numbering gaps, permission checks.
**Reports/KPIs:** System health, latency/error rates, backup/DR status, integration queue status.

**Company (Master)**
Legal Name, Trade Name, Registration No, Tax/VAT No, Country, Address, Phone, Email, Base Currency, Fiscal Start Month, Logo

**Branch / Site (Master)**
Company, Branch Code, Name, Address, Timezone, Warehouse Link, POS Enabled (Y/N)

**Warehouse (Master)**
Code, Name, Address, Default Bin, Allow Negative Stock (Y/N), Picking Strategy (FIFO/LIFO), Temperature Zone

**Unit of Measure (Master)**
Code, Name, Type (Weight/Length/Count), Precision, Conversion Rules

**Currency & FX Rate (Master/Txn)**
Currency Code, Name, Minor Unit, FX Source, Rate Date, Buy Rate, Sell Rate, Mid Rate

**Tax (Master)**
Tax Code, Name, Jurisdiction, Type (VAT/Sales/Withholding), Rate %, Inclusive (Y/N), Deductible (Y/N), GL Accounts

**User (Master)**
Username, Full Name, Email, Phone, Role(s), Locale/Timezone, MFA Enabled, Allowed Branches

**Role & Permission (Config)**
Role Name, Description, Permission Matrix (CRUD by module), SoD Rules

**Document Numbering (Config)**
Document Type, Prefix, Suffix, Padding, Reset (Year/Month/Never), Next Number

**Workflow Rule (Config)**
Document Type, Stages, Conditions, Approvers, SLAs, Escalations, Auto-Actions

**Attachment (Txn)**
Doc Type, Doc ID, File, Version, Tags, Confidential (Y/N)

**Multi-Tenancy (SaaS)**
- **Data Isolation:** All data must be strictly isolated by `companyId`.
- **Super Admin:** A `SUPER_ADMIN` role for managing companies and system-wide settings.
- **Onboarding:** A process for creating new companies and a default `ADMIN` user for each.

---

## 1) General Ledger (GL)

**Data Objects:** Chart of accounts, cost centers/dimensions, journals, fiscal periods, currency policies.
**Processes:** Journal entries, allocations, revaluations, period close, year-end.
**Validations/Rules:** Debit/credit balance, locked periods, FX rate availability.
**Reports/KPIs:** Trial balance, general/sub-ledgers, P&L, balance sheet, cash flow, cost center balances.

**Chart of Accounts (Master)**
Account Code, Name, Type (Asset/Liab/Equity/Income/Expense), Parent, Currency, Posting Allowed (Y/N), Reconciliation (Y/N), Cost Center Required (Y/N), Tax Mapping

**Cost Center / Dimension (Master)**
Code, Name, Parent, Type, Budget Required (Y/N)

**Fiscal Period (Config)**
Year, Period No, Start Date, End Date, Status (Open/Closed)

**Journal Entry (Txn)**
Date, Journal Type (General/Accrual/Adjustment), Reference, Currency, Lines[Account, Description, Debit, Credit, Cost Center, Dimension1..N, Tax Code], FX Rate, Attachment, Prepared By, Approved By

**Allocation Rule (Config)**
Name, Source Account(s), Base (Amount/Qty/Percent), Targets[Account, Ratio], Effective From/To

---

## 2) Accounts Receivable (AR)

**Data Objects:** Customers, AR invoices/credit notes, receipts, dunning, price lists, credit terms.
**Processes:** Invoicing, collections, cash application, credit control, dunning.
**Validations/Rules:** Credit limit checks, duplicate invoice, price/discount validity, tax rules.
**Reports/KPIs:** Aging, DSO, collection rate, delinquency, write-offs.

**Customer (Master)**
Code, Legal/Trade Name, Tax ID, Billing/Shipping Address, Email/Phone, Payment Terms, Credit Limit, Price List, Salesperson, Currency, AR Account, Blocking Rules

**AR Invoice (Txn)**
Customer, Invoice No/Date, Due Date, Currency, Lines[Item/Service, Description, Qty, UoM, Unit Price, Discount %, Tax Code, Warehouse], Freight/Other Charges, Taxes, FX Rate, Total, Posting Date, Payment Terms, Delivery Ref, E-Invoice Flags, Status

**Receipt (Txn)**
Customer, Date, Method (Cash/Bank/Card/Check), Currency, Amount, Applied Invoices[Invoice, Amount], Undeposited (Y/N), Bank/Account, Reference, FX Rate

**Credit Note (Txn)**
Customer, Date, Reason, Reference Invoice, Lines[…], Taxes, Total

**Dunning Setup (Config)**
Level, Days Past Due, Template, Fees, Channel (Email/SMS), Auto-Schedule (Y/N)

---

## 3) Accounts Payable (AP)

**Data Objects:** Suppliers, AP invoices/debit notes, payments, withholdings.
**Processes:** Invoice capture, 2/3-way match, approvals, payment runs.
**Validations/Rules:** Duplicate invoice, approval limits, tax/withholding, match tolerances.
**Reports/KPIs:** AP aging, DPO, approval cycle time, early payment discounts.

**Supplier (Master)**
Code, Name, Tax ID, Address, Email/Phone, Payment Terms, Currency, AP Account, Withholding Tax %, Lead Time, Preferred Shipping

**AP Invoice (Txn)**
Supplier, Date, Due Date, Currency, Lines[Item/Service, Qty, Price, Discount, Tax], PO/GRN Link, Withholding Tax, Expenses Allocation, Status

**Payment (Txn)**
Supplier, Date, Method, Bank/Cash Account, Currency, Amount, Applied Invoices[…], Check No/Date, FX Rate, Payment File Ref

**Debit Note (Txn)**
Supplier, Date, Reason, Linked Invoice (Optional), Lines[…], Taxes

---

## 4) Treasury & Banking

**Data Objects:** Bank accounts, cash boxes, checks, bank statements.
**Processes:** Receipts/disbursements, bank reconciliation, check lifecycle, petty cash.
**Validations/Rules:** Cash limits, signatory controls, posting links to source docs.
**Reports/KPIs:** Real-time balances, daily cash movement, reconciliation status, liquidity ratios.

**Bank Account (Master)**
Bank Name, Account Name/No, IBAN, Currency, GL Account, Swift/BIC, Bank Charges Account

**Cash Box (Master)**
Code, Name, Responsible User, Location, Currency, Limit

**Bank Reconciliation (Txn)**
Bank Account, Statement No, Period From/To, Opening Balance, Imported Lines[Date, Description, Amount, Ref], Matching Rules, Closing Balance, Variance

**Check (Txn)**
Type (In/Out), No, Issue Date, Due Date, Bank, Amount, Payee/Payer, Status (Issued/Cleared/Bounced)

---

## 5) Tax & Compliance

**Data Objects:** Tax codes/rates, tax categories, e-invoice profiles, returns.
**Processes:** Tax calculation, filings, e-invoicing submission, exception handling.
**Validations/Rules:** Tax ID/format, exemptions, filing thresholds, jurisdiction rules.
**Reports/KPIs:** Output/input ledgers, return summaries, exception rate.

**Tax Code (Master)**
Name, Jurisdiction, Rate, Type (VAT/Sales/Withholding), GL Mappings, Recoverable %

**E-Invoice Profile (Config)**
Authority, API Keys, Series/Prefix, QR/UUID Settings, Payload Mapping

**Tax Return (Txn)**
Period, Tax Codes Summary, Output/Input, Payable/Refundable, Attachments, Declaration, Submission Ref

---

## 6) Sales & Distribution

**Data Objects:** Quotes, sales orders, deliveries/shipments, invoices, returns, price lists, agreements.
**Processes:** Pricing, order promising, fulfillment, invoicing, returns, commissions.
**Validations/Rules:** Stock availability, credit/over-discount checks, approvals.
**Reports/KPIs:** Quote→order conversion, margin, fill rate, rep performance.

**Price List (Master)**
Name, Currency, Valid From/To, Level (Retail/Wholesale), Rounding, Items[Item, UoM, Price]

**Customer Agreement (Master)**
Customer, Validity, Discount Rules, Min/Max Qty, Payment Terms Override

**Quote (Txn)**
Customer, Date, Valid Till, Lines[Item, Qty, UoM, Price, Discount, Tax], Expected Close Date, Probability

**Sales Order (Txn)**
Customer, Order Date, Required Date, Fulfillment Location, Lines[…], Reservations, Shipment Plan, Payment Terms, Credit Check Result, Approval

**Delivery (DO) (Txn)**
SO Ref, Ship Date, From Warehouse/Bin, Carrier/Service, Packages, Weights, Lines[Item, Qty Shipped], Tracking

**Sales Return (Txn)**
Customer, Reason, Lines[…], Receipt Warehouse, Refund Method

**Commission Scheme (Config)**
Agent, Basis (Revenue/Margin/Collection), Rate/Slab, Effective Dates, Caps

---

## 7) Procurement

**Data Objects:** Requisitions, RFQs, vendor quotes, POs, GRNs, contracts.
**Processes:** Sourcing, bid comparison, PO issuance, receipt, vendor evaluation.
**Validations/Rules:** 2/3-way match, approval thresholds, price rules.
**Reports/KPIs:** Savings, lead times, on-contract spend, supplier scorecards.

**Requisition (Txn)**
Requester, Date Needed, Items[Item, Qty, UoM, Target Price], Justification, Cost Center, Approval Route

**RFQ (Txn)**
Vendors[], Items[…], Submission Deadline, Terms, Attachments

**Vendor Quote (Txn)**
Supplier, RFQ Ref, Prices, Lead Time, Validity, Incoterms, Taxes

**Purchase Order (Txn)**
Supplier, Order Date, Delivery Terms, Ship To, Lines[…], Taxes/Charges, Payment Terms, Approval

**Goods Receipt (GRN) (Txn)**
PO Ref, Receipt Date, From Supplier, To Warehouse/Bin, Lines[Item, Qty Received, Lot/Serial, Expiry], Discrepancies

---

## 8) Inventory & WMS

**Data Objects:** Items, locations/bins, batches/serials, transfers, adjustments, cycle counts.
**Processes:** Receipts/issues, internal moves, counting, reservations, costing.
**Validations/Rules:** Min/max/reorder, lot/expiry, count tolerances.
**Reports/KPIs:** Accuracy, turns, slow movers, variance.

**Item (Master)**
Code, Name, Barcode(s), Type (Stock/Service/BOM), Category, UoM (Base/Alt), Weight/Dim, Batch/Serial Tracked (Y/N), Expiry (Y/N), Reorder Level/Qty, Costing Method, Default Warehouse/Bin, GL Accounts, Attributes (key:value)

**Location/Bin (Master)**
Warehouse, Aisle/Row/Bin, Capacity, Temperature, Picking Seq

**Stock Transfer (Txn)**
From Warehouse/Bin, To Warehouse/Bin, Reason, Lines[Item, Qty, Lot/Serial], Carrier (If External)

**Stock Adjustment (Txn)**
Date, Reason (Damage/Shrinkage/Found), Lines[Item, System Qty, Counted Qty, Lot/Serial], Approval

**Cycle Count (Txn)**
Warehouse/Zone, Schedule, Items[], Tolerances, Results, Recount

---

## 9) Pricing & Promotions

**Data Objects:** Price books, pricing rules, coupons/bundles, customer segments.
**Processes:** Rule evaluation, stacking, simulations, channel pricing.
**Validations/Rules:** Priority/conflict resolution, override permissions.
**Reports/KPIs:** Margin impact, promo ROI, redemption.

**Pricing Rule (Config)**
Name, Priority, Channels, Customer Segment, Item/Category, Conditions (Qty/Date/Coupon), Price/Discount Formula, Stackable (Y/N), Valid From/To

**Promotion/Coupon (Config)**
Name, Code/Series, Redemption Limits, Min Basket, Exclusions, Free Items, Start/End

---

## 10) Projects & Job Costing

**Data Objects:** Projects/WBS, tasks, budgets, timesheets, work orders, change orders.
**Processes:** Time/cost capture, progress billing, change control, variance analysis.
**Validations/Rules:** Budget ceilings, approval gates, cost code integrity.
**Reports/KPIs:** Profitability, CPI/SPI, cost/schedule variance.

**Project (Master)**
Code, Name, Customer (Optional), Start/End Dates, Contract Value, Currency, Cost Centers, Manager, Billing Method (Fixed/Time&Material), Status

**WBS/Task (Master/Txn)**
Project, Code, Name, Planned Start/End, Budget Hrs/Cost, Dependencies, Assignee(s), % Complete

**Timesheet (Txn)**
Employee, Project/Task, Date, Hours, Rate, Billable (Y/N), Notes

**Work Order (Txn)**
Project/Asset, Scope, Materials, Labor, Schedule, Priority, Approvals

**Budget (Config/Txn)**
Project, Cost Codes, Planned Cost/Revenue, Revisions

**Change Order (Txn)**
Project, Reason, Scope Delta, Cost/Time Impact, Approvals

---

## 11) HR & Payroll

**Data Objects:** Employees, positions/grades, attendance, leave, payroll runs, loans/advances.
**Processes:** Hiring/changes, T&A, payroll, deductions/taxes, EOS.
**Validations/Rules:** Policy compliance, accruals, loan limits, statutory rules.
**Reports/KPIs:** Cost per employee, attrition, absenteeism.

**Employee (Master)**
Code, Name, National ID, DOB, Gender, Marital Status, Address, Phone, Email, Join Date, Department, Position/Grade, Manager, Bank Details, Tax No, Social Insurance No, Work Schedule, Leave Policy

**Attendance (Txn)**
Employee, Date, Shift, Check-In, Check-Out, Breaks, Overtime, Exceptions

**Leave (Txn)**
Employee, Type, From/To, Days, Balance, Approvals, Attachment

**Payroll Run (Txn)**
Period, Employee Set, Components[Basic, Allowances, Deductions], Taxes, Net Pay, Bank File, Journal Entry

**Payslip (Txn)**
Employee, Period, Earnings, Deductions, Taxes, Net, Approvals

**Loan/Advance (Txn)**
Employee, Amount, Installments, Start Date, Interest (Y/N), Recovery Method

---

## 12) Fixed Assets

**Data Objects:** Asset classes, assets, depreciation schedules, transfers, disposals.
**Processes:** Capitalization, depreciation, revaluation, transfer, disposal.
**Validations/Rules:** Capex policies, GL mapping, useful life/method.
**Reports/KPIs:** Asset register, NBV, depreciation, impairments.

**Asset Class (Master)**
Code, Name, Depreciation Method, Useful Life, Residual %, GL Accounts

**Asset (Master)**
Tag/Code, Description, Class, Acquisition Date, Vendor, Cost, Location, Custodian, Serial No, Warranty, Depreciation Start, Method/Rate, Useful Life, Residual, Pictures/Docs

**Depreciation Run (Txn)**
Period, Assets Included, Method, Journal Preview, Post

**Transfer (Txn)**
From/To Location/Branch, Date, Reason, New Custodian

**Disposal (Txn)**
Date, Method (Sale/Scrap), Proceeds, Costs, Gain/Loss, Documents

---

## 13) Maintenance (CMMS/EAM)

**Data Objects:** Maintainable assets, PM plans, work orders, failure codes, spares.
**Processes:** Preventive/corrective maintenance, scheduling, failure logging.
**Validations/Rules:** Parts availability, SLA/priority.
**Reports/KPIs:** PM compliance, MTBF/MTTR, maintenance cost per asset.

**Maintainable Asset (Master)**
Asset Ref, Criticality, Warranty, PM Required (Y/N), Tech Specs

**PM Plan (Master)**
Asset/Group, Frequency (Meter/Calendar), Tasks/Checklist, Required Skills, Estimated Duration, Spares

**Work Order (Txn)**
Asset, Failure Code, Priority, Reporter, Assignment, Start/End, Materials, Labor, Downtime, Resolution, Close Codes

**Spare Part (Master)**
Item Link, Min/Max, Lead Time, Storage Location, Alternate Parts

---

## 14) Hotel PMS

**Data Objects:** Room types/rooms, rate plans, reservations, guests, housekeeping, folios.
**Processes:** Booking, modify/cancel, check-in/out, charge posting, OTA commissions.
**Validations/Rules:** Overbooking prevention, no-show/cancellation, tax/fees.
**Reports/KPIs:** Occupancy, ADR, RevPAR, night audit, channel mix.

**Room Type (Master)**
Code, Name, Capacity, Amenities, Base Rate, Tax Profile

**Room (Master)**
No, Type, Floor, Status (Vacant/Occupied/OOO), Housekeeping Status, Features

**Rate Plan (Master)**
Name, Board (RO/BB/HB/FB/AI), Seasonality, Occupancy Rules, Cancellation, Children Policy

**Reservation (Txn)**
Guest(s), Channel (Direct/OTA), Check-In/Out Dates, Room Type, No. of Rooms, Rate Plan, Price Breakdown, Taxes/Fees, Guarantee (Card/Deposit), Special Requests, Status

**Guest Profile (Master)**
Name, Nationality, ID/Passport, DOB, Contact, Preferences, Loyalty Tier

**Check-In / Check-Out (Txn)**
Reservation Ref, Room Assign, Deposits, Folio Settlement, Late Checkout Fees

**Folio/Posting (Txn)**
Guest/Room, Date, Charges[Room, F&B, Services], Payments, Adjustments, Taxes

**Housekeeping Task (Txn)**
Room, Type (Clean/Inspect/Turn-down), Priority, Assigned To, Start/End, Status

---

## 15) F&B / Restaurant POS

**Data Objects:** Menus/items, recipes/BOM, tables/areas, orders/checks, kitchen tickets, delivery orders.
**Processes:** Ordering, modifiers/voids/discounts, check close, inventory deduction by recipe.
**Validations/Rules:** Void/discount permissions, cash variance.
**Reports/KPIs:** Avg check, table turns, food cost %, waste.

**Menu Item (Master)**
Code, Name, Category, Recipe Link, Sales Price, Tax, Print Group, Availability Schedule

**Recipe / BOM (Master)**
Item, Ingredients[Item, Qty, UoM], Yield, Waste %, Prep Instructions

**Table (Master)**
Code, Area, Seats, Mergeable (Y/N)

**Order / Check (Txn)**
Table/Customer, Server, Time Opened/Closed, Items[Qty, Modifiers, Notes], Discounts, Service Charge, Taxes, Payment(s), Void Reasons

**Kitchen Ticket (Txn)**
Order Ref, Course, Items, KDS Status

**Delivery Order (Txn)**
Customer, Address, Partner, ETA, Rider, Tracking

---

## 16) Real Estate

**Data Objects:** Projects/buildings, units, contracts, payment schedules, penalties.
**Processes:** Unit reservation, contract execution, periodic billing, penalties, transfers.
**Validations/Rules:** Double-booking, discount thresholds, legal clauses.
**Reports/KPIs:** Occupancy/sell-through, collections, delinquency.

**Project/Building (Master)**
Code, Name, Address, Developer, Handover Date, Amenities

**Unit (Master)**
Unit No, Type, Floor, Area, Bedrooms, View, Price, Status (Available/Reserved/Sold/Leased)

**Contract (Txn)**
Buyer/Tenant, Unit, Type (Sale/Lease), Start/End, Price/Rent, Payment Schedule, Deposits, Penalties, Indexation, Agent

**Payment Schedule (Txn)**
Milestone, Due Date, Amount, Paid (Y/N), Receipt Ref

**Penalty (Txn)**
Contract Ref, Reason, Calc Rule, Amount, Waiver (Y/N)

---

## 17) Construction

**Data Objects:** Projects, BOQ items, contracts, variation orders, progress certificates, equipment.
**Processes:** Cost tracking, progress measurement, certifications, VO management.
**Validations/Rules:** BOQ match, VO approvals, retention/LD rules.
**Reports/KPIs:** % complete, cost variance, project margin.

**Job/Project (Master)**
Code, Name, Client, Start/End, Contract Value, Retention %, Engineer, Site

**BOQ Item (Master)**
Section, Item Code, Description, UoM, Qty, Rate, Budget

**Contract (Txn)**
Scope, Terms, Advance %, Retention %, Payment Terms, LDs, Variations Allowed

**Variation Order (Txn)**
Reason, Scope Change, Qty/Rate Changes, Time Impact, Approvals

**Progress Certificate (Txn)**
Period, % Complete, Measured Qty, Amount Due, Retention, Previous Paid

**Equipment (Master)**
Code, Type, Capacity, Rate, Operator, Availability

---

## 18) Shipping & 3PL

**Data Objects:** Carriers/services, shipments/labels, tracking, returns (RMA).
**Processes:** Rate shopping, label generation, tracking/notifications, returns.
**Validations/Rules:** Weight/dimension checks, duties/surcharges.
**Reports/KPIs:** Ship cost per order, on-time delivery, return rate.

**Carrier/Service (Master)**
Name, Service Levels, Zones, Cutoffs, Insurance (Y/N), COD Support

**Shipment (Txn)**
Order Ref, Ship From/To, Packages[Dims, Weight], Carrier/Service, Declared Value, Label, Tracking, COD, Duties (DDU/DDP)

**Return (RMA) (Txn)**
Customer, Order/Invoice, Reason, Condition, Authorization No, Disposition (Restock/Scrap)

---

## 19) CRM & Service Desk

**Data Objects:** Leads, accounts/contacts, deals/opportunities, activities, tickets, SLAs, knowledge base.
**Processes:** Lead qualification, pipeline progression, omnichannel support, SLA tracking.
**Validations/Rules:** Stage exit criteria, duplicate detection, SLA timers/escalations.
**Reports/KPIs:** Win rate, pipeline value/velocity, FCR, time-to-resolve, CSAT/NPS.

**Lead (Txn/Master)**
Source, Company/Contact, Email/Phone, Industry, Size, Score, Owner, Notes, Next Action, Stage

**Account/Contact (Master)**
Name, Addresses, Emails/Phones, Relationship, Owner, Preferences

**Deal (Txn)**
Account, Value, Currency, Stage, Probability, Expected Close, Competitors, Products, Activities

**Activity (Txn)**
Type (Call/Email/Meeting/Task), Date/Time, Owner, Outcome, Next Step, Attachments

**Ticket (Txn)**
Customer, Channel, Subject, Priority, SLA, Assignee, Category, Knowledge Article, Status, CSAT

**SLA (Config)**
Tier, Targets (FRT/Resolution), Business Hours, Holidays, Escalations

---

## 20) Subscriptions (Recurring Revenue)

**Data Objects:** Plans/add-ons, subscriptions, invoice schedules, dunning.
**Processes:** Auto invoicing/charging, proration, upgrades/downgrades, dunning.
**Validations/Rules:** Renewal windows, payment gateway checks, seat limits.
**Reports/KPIs:** MRR/ARR, churn, LTV, expansion/contraction.

**Plan (Master)**
Name, Billing Cycle (Monthly/Yearly), Price, Setup Fee, Add-ons, Trial Days, Proration, Tax

**Subscription (Txn)**
Customer, Plan, Start, Renewal Date, Billing Anchor, Seats/Units, Add-ons, Payment Method, Status, Cancellation Date/Reason

**Invoice Schedule (Txn)**
Period, Amount, Taxes, Generated (Y/N), Paid (Y/N), Dunning Level

**Dunning (Config/Txn)**
Sequence, Days, Messages, Fees, Suspend/Cancel Rules

---

## 21) BI & Analytics

**Data Objects:** Data sources, datasets, dashboards, lineage/security.
**Processes:** ETL/ELT, modeling, dashboards, alerts.
**Validations/Rules:** Data quality rules, RLS/PII governance, refresh SLAs.
**Reports/KPIs:** Executive dashboards, per-module KPIs, data freshness/error rates.

**Data Source (Config)**
Type (DB/API/File), Connection Params, Sync Schedule, Owner

**Dataset (Config)**
Name, Grain, Dimensions, Measures, Filters, RLS Policy

**Dashboard (Config)**
Title, Widgets, Data Sources, Refresh Rate, Viewers/Editors, Alerts
