# ERP System To-Do List

This document tracks the development progress of the ERP system, organized by functional modules and priorities.

---

## Progress Summary

- **Pending:** 19 tasks
- **In Progress:** 0 tasks
- **Completed:** 3 tasks

---

## High Priority

### Core Platform

- [ ] **Data Objects**
  - [x] **Implement Company/Branch management:** AC: User can create, read, update, and delete companies and branches.
  - [ ] **Implement Warehouse management:** AC: User can create, read, update, and delete warehouses.
  - [ ] **Implement Unit of Measure management:** AC: User can create, read, update, and delete units of measure.
  - [ ] **Implement Currency/FX rate management:** AC: User can create, read, update, and delete currencies and FX rates.
  - [ ] **Implement Tax management:** AC: User can create, read, update, and delete taxes.
  - [x] **Implement User/Role management:** AC: User can create, read, update, and delete users and roles.
  - [ ] **Implement Workflow management:** AC: User can create, read, update, and delete workflows.
  - [ ] **Implement Document Numbering management:** AC: User can create, read, update, and delete document numbering schemes.
  - [ ] **Implement Attachment management:** AC: User can upload, download, and delete attachments.
- [ ] **Processes**
  - [ ] **Implement RBAC/Approvals:** AC: User can define roles and permissions, and approve or reject documents.
  - [ ] **Implement Audit Logging:** AC: System logs all user actions.
  - [ ] **Implement Document/Attachment Handling:** AC: User can attach documents to records.
  - [ ] **Implement Workflow Routing:** AC: System routes documents for approval based on defined workflows.
  - [ ] **Implement Notifications:** AC: System sends notifications to users for important events.
  - [ ] **Implement Localization:** AC: System can be localized to different languages.
  - [ ] **Implement Integrations:** AC: System can be integrated with other systems.
- [ ] **Validations/Rules**
  - [ ] **Implement SoD:** AC: System enforces segregation of duties.
  - [ ] **Implement Required Master Data checks:** AC: System checks for required master data before creating transactions.
  - [ ] **Implement Retention & Privacy rules:** AC: System enforces data retention and privacy rules.
  - [ ] **Implement Numbering Gaps checks:** AC: System checks for gaps in document numbering.
  - [ ] **Implement Permission Checks:** AC: System checks user permissions before allowing actions.
- [ ] **Reports/KPIs**
  - [ ] **Implement System Health report:** AC: User can view a report on the health of the system.
  - [ ] **Implement Latency/Error Rates report:** AC: User can view a report on the latency and error rates of the system.
  - [ ] **Implement Backup/DR Status report:** AC: User can view a report on the status of backups and disaster recovery.
  - [ ] **Implement Integration Queue Status report:** AC: User can view a report on the status of the integration queue.
- [ ] **Forms**
  - [ ] **Implement Company (Master) form:** AC: User can create and edit companies.
  - [ ] **Implement Branch/Site (Master) form:** AC: User can create and edit branches.
  - [ ] **Implement Warehouse (Master) form:** AC: User can create and edit warehouses.
  - [ ] **Implement Unit of Measure (Master) form:** AC: User can create and edit units of measure.
  - [ ] **Implement Currency & FX Rate (Master/Txn) form:** AC: User can create and edit currencies and FX rates.
  - [ ] **Implement Tax (Master) form:** AC: User can create and edit taxes.
  - [ ] **Implement User (Master) form:** AC: User can create and edit users.
  - [ ] **Implement Role & Permission (Config) form:** AC: User can create and edit roles and permissions.
  - [ ] **Implement Document Numbering (Config) form:** AC: User can create and edit document numbering schemes.
  - [ ] **Implement Workflow Rule (Config) form:** AC: User can create and edit workflow rules.
  - [ ] **Implement Attachment (Txn) form:** AC: User can attach documents to records.
  - [ ] **Implement Data Isolation:** AC: All data is strictly isolated by `companyId`.
  - [x] **Implement Super Admin role:** AC: A `SUPER_ADMIN` role exists for managing companies and system-wide settings.
  - [ ] **Implement Onboarding process:** AC: A process exists for creating new companies and a default `ADMIN` user for each.

### General Ledger (GL)

- [ ] **Data Objects**
  - [ ] **Implement Chart of Accounts management:** AC: User can create, read, update, and delete accounts.
  - [ ] **Implement Cost Center/Dimension management:** AC: User can create, read, update, and delete cost centers and dimensions.
  - [ ] **Implement Journal management:** AC: User can create, read, update, and delete journals.
  - [ ] **Implement Fiscal Period management:** AC: User can create, read, update, and delete fiscal periods.
  - [ ] **Implement Currency Policy management:** AC: User can create, read, update, and delete currency policies.
- [ ] **Processes**
  - [ ] **Implement Journal Entries:** AC: User can create and post journal entries.
  - [ ] **Implement Allocations:** AC: User can create and run allocations.
  - [ ] **Implement Revaluations:** AC: User can create and run revaluations.
  - [ ] **Implement Period Close:** AC: User can close fiscal periods.
  - [ ] **Implement Year-End:** AC: User can close the fiscal year.
- [ ] **Validations/Rules**
  - [ ] **Implement Debit/Credit Balance validation:** AC: System validates that debits and credits balance in journal entries.
  - [ ] **Implement Locked Periods validation:** AC: System prevents posting to locked periods.
  - [ ] **Implement FX Rate Availability validation:** AC: System validates that FX rates are available for foreign currency transactions.
- [ ] **Reports/KPIs**
  - [ ] **Implement Trial Balance report:** AC: User can view a trial balance report.
  - [ ] **Implement General/Sub-Ledgers report:** AC: User can view general and sub-ledger reports.
  - [ ] **Implement P&L report:** AC: User can view a profit and loss report.
  - [ ] **Implement Balance Sheet report:** AC: User can view a balance sheet report.
  - [ ] **Implement Cash Flow report:** AC: User can view a cash flow report.
  - [ ] **Implement Cost Center Balances report:** AC: User can view a report on cost center balances.
- [ ] **Forms**
  - [ ] **Implement Chart of Accounts (Master) form:** AC: User can create and edit accounts.
  - [ ] **Implement Cost Center / Dimension (Master) form:** AC: User can create and edit cost centers and dimensions.
  - [ ] **Implement Fiscal Period (Config) form:** AC: User can create and edit fiscal periods.
  - [ ] **Implement Journal Entry (Txn) form:** AC: User can create and edit journal entries.
  - [ ] **Implement Allocation Rule (Config) form:** AC: User can create and edit allocation rules.

### Accounts Receivable (AR)

- [ ] **Data Objects**
  - [ ] **Implement Customer management:** AC: User can create, read, update, and delete customers.
  - [ ] **Implement AR Invoice/Credit Note management:** AC: User can create, read, update, and delete AR invoices and credit notes.
  - [ ] **Implement Receipt management:** AC: User can create, read, update, and delete receipts.
  - [ ] **Implement Dunning management:** AC: User can create, read, update, and delete dunning letters.
  - [ ] **Implement Price List management:** AC: User can create, read, update, and delete price lists.
  - [ ] **Implement Credit Term management:** AC: User can create, read, update, and delete credit terms.
- [ ] **Processes**
  - [ ] **Implement Invoicing:** AC: User can create and print invoices.
  - [ ] **Implement Collections:** AC: User can manage collections.
  - [ ] **Implement Cash Application:** AC: User can apply cash receipts to invoices.
  - [ ] **Implement Credit Control:** AC: User can manage customer credit.
  - [ ] **Implement Dunning:** AC: User can generate and send dunning letters.
- [ ] **Validations/Rules**
  - [ ] **Implement Credit Limit Checks:** AC: System checks customer credit limits before creating sales orders.
  - [ ] **Implement Duplicate Invoice validation:** AC: System checks for duplicate invoices.
  - [ ] **Implement Price/Discount Validity validation:** AC: System validates prices and discounts.
  - [ ] **Implement Tax Rules:** AC: System applies tax rules to invoices.
- [ ] **Reports/KPIs**
  - [ ] **Implement Aging report:** AC: User can view an aging report.
  - [ ] **Implement DSO report:** AC: User can view a DSO report.
  - [ ] **Implement Collection Rate report:** AC: User can view a collection rate report.
  - [ ] **Implement Delinquency report:** AC: User can view a delinquency report.
  - [ ] **Implement Write-offs report:** AC: User can view a write-offs report.
- [ ] **Forms**
  - [ ] **Implement Customer (Master) form:** AC: User can create and edit customers.
  - [ ] **Implement AR Invoice (Txn) form:** AC: User can create and edit AR invoices.
  - [ ] **Implement Receipt (Txn) form:** AC: User can create and edit receipts.
  - [ ] **Implement Credit Note (Txn) form:** AC: User can create and edit credit notes.
  - [ ] **Implement Dunning Setup (Config) form:** AC: User can configure dunning.

### Accounts Payable (AP)

- [ ] **Data Objects**
  - [ ] **Implement Supplier management:** AC: User can create, read, update, and delete suppliers.
  - [ ] **Implement AP Invoice/Debit Note management:** AC: User can create, read, update, and delete AP invoices and debit notes.
  - [ ] **Implement Payment management:** AC: User can create, read, update, and delete payments.
  - [ ] **Implement Withholding management:** AC: User can manage withholding tax.
- [ ] **Processes**
  - [ ] **Implement Invoice Capture:** AC: User can capture supplier invoices.
  - [ ] **Implement 2/3-way Match:** AC: System performs 2/3-way matching of invoices, purchase orders, and goods receipts.
  - [ ] **Implement Approvals:** AC: User can approve or reject supplier invoices.
  - [ ] **Implement Payment Runs:** AC: User can create and run payment runs.
- [ ] **Validations/Rules**
  - [ ] **Implement Duplicate Invoice validation:** AC: System checks for duplicate supplier invoices.
  - [ ] **Implement Approval Limits:** AC: System enforces approval limits.
  - [ ] **Implement Tax/Withholding validation:** AC: System validates taxes and withholding.
  - [ ] **Implement Match Tolerances:** AC: System allows for matching tolerances.
- [ ] **Reports/KPIs**
  - [ ] **Implement AP Aging report:** AC: User can view an AP aging report.
  - [ ] **Implement DPO report:** AC: User can view a DPO report.
  - [ ] **Implement Approval Cycle Time report:** AC: User can view a report on approval cycle times.
  - [ ] **Implement Early Payment Discounts report:** AC: User can view a report on early payment discounts.
- [ ] **Forms**
  - [ ] **Implement Supplier (Master) form:** AC: User can create and edit suppliers.
  - [ ] **Implement AP Invoice (Txn) form:** AC: User can create and edit AP invoices.
  - [ ] **Implement Payment (Txn) form:** AC: User can create and edit payments.
  - [ ] **Implement Debit Note (Txn) form:** AC: User can create and edit debit notes.

## Medium Priority

### Treasury & Banking

- [ ] **Data Objects**
  - [ ] **Implement Bank Account management:** AC: User can create, read, update, and delete bank accounts.
  - [ ] **Implement Cash Box management:** AC: User can create, read, update, and delete cash boxes.
  - [ ] **Implement Check management:** AC: User can create, read, update, and delete checks.
  - [ ] **Implement Bank Statement management:** AC: User can import and manage bank statements.
- [ ] **Processes**
  - [ ] **Implement Receipts/Disbursements:** AC: User can record receipts and disbursements.
  - [ ] **Implement Bank Reconciliation:** AC: User can reconcile bank statements.
  - [ ] **Implement Check Lifecycle:** AC: User can manage the lifecycle of checks.
  - [ ] **Implement Petty Cash:** AC: User can manage petty cash.
- [ ] **Validations/Rules**
  - [ ] **Implement Cash Limits:** AC: System enforces cash limits.
  - [ ] **Implement Signatory Controls:** AC: System enforces signatory controls.
  - [ ] **Implement Posting Links to Source Docs:** AC: System links payments and receipts to source documents.
- [ ] **Reports/KPIs**
  - [ ] **Implement Real-time Balances report:** AC: User can view real-time bank balances.
  - [ ] **Implement Daily Cash Movement report:** AC: User can view a daily cash movement report.
  - [ ] **Implement Reconciliation Status report:** AC: User can view a bank reconciliation status report.
  - [ ] **Implement Liquidity Ratios report:** AC: User can view a liquidity ratios report.
- [ ] **Forms**
  - [ ] **Implement Bank Account (Master) form:** AC: User can create and edit bank accounts.
  - [ ] **Implement Cash Box (Master) form:** AC: User can create and edit cash boxes.
  - [ ] **Implement Bank Reconciliation (Txn) form:** AC: User can perform bank reconciliation.
  - [ ] **Implement Check (Txn) form:** AC: User can create and edit checks.

### Tax & Compliance

- [ ] **Data Objects**
  - [ ] **Implement Tax Code/Rate management:** AC: User can create, read, update, and delete tax codes and rates.
  - [ ] **Implement Tax Category management:** AC: User can create, read, update, and delete tax categories.
  - [ ] **Implement E-Invoice Profile management:** AC: User can create, read, update, and delete e-invoice profiles.
  - [ ] **Implement Return management:** AC: User can manage tax returns.
- [ ] **Processes**
  - [ ] **Implement Tax Calculation:** AC: System calculates taxes on transactions.
  - [ ] **Implement Filings:** AC: User can generate tax filings.
  - [ ] **Implement E-Invoicing Submission:** AC: User can submit e-invoices to the tax authority.
  - [ ] **Implement Exception Handling:** AC: System handles tax exceptions.
- [ ] **Validations/Rules**
  - [ ] **Implement Tax ID/Format validation:** AC: System validates tax IDs and formats.
  - [ ] **Implement Exemptions:** AC: System handles tax exemptions.
  - [ ] **Implement Filing Thresholds:** AC: System enforces filing thresholds.
  - [ ] **Implement Jurisdiction Rules:** AC: System applies tax rules based on jurisdiction.
- [ ] **Reports/KPIs**
  - [ ] **Implement Output/Input Ledgers report:** AC: User can view output and input tax ledgers.
  - [ ] **Implement Return Summaries report:** AC: User can view tax return summaries.
  - [ ] **Implement Exception Rate report:** AC: User can view a report on tax exception rates.
- [ ] **Forms**
  - [ ] **Implement Tax Code (Master) form:** AC: User can create and edit tax codes.
  - [ ] **Implement E-Invoice Profile (Config) form:** AC: User can configure e-invoice profiles.
  - [ ] **Implement Tax Return (Txn) form:** AC: User can create and edit tax returns.

### Sales & Distribution

- [ ] **Data Objects**
  - [ ] **Implement Quote management:** AC: User can create, read, update, and delete quotes.
  - [ ] **Implement Sales Order management:** AC: User can create, read, aupdate, and delete sales orders.
  - [ ] **Implement Delivery/Shipment management:** AC: User can create, read, update, and delete deliveries and shipments.
  - [ ] **Implement Invoice management:** AC: User can create, read, update, and delete invoices.
  - [ ] **Implement Return management:** AC: User can create, read, update, and delete sales returns.
  - [ ] **Implement Price List management:** AC: User can create, read, update, and delete price lists.
  - [ ] **Implement Agreement management:** AC: User can create, read, update, and delete customer agreements.
- [ ] **Processes**
  - [ ] **Implement Pricing:** AC: System calculates prices on sales orders.
  - [ ] **Implement Order Promising:** AC: System provides an available-to-promise date for sales orders.
  - [ ] **Implement Fulfillment:** AC: User can fulfill sales orders.
  - [ ] **Implement Invoicing:** AC: User can create invoices from sales orders.
  - [ ] **Implement Returns:** AC: User can process sales returns.
  - [ ] **Implement Commissions:** AC: System calculates sales commissions.
- [ ] **Validations/Rules**
  - [ ] **Implement Stock Availability validation:** AC: System validates stock availability when creating sales orders.
  - [ ] **Implement Credit/Over-discount Checks:** AC: System checks customer credit and discount limits.
  - [ ] **Implement Approvals:** AC: User can approve or reject sales orders.
- [ ] **Reports/KPIs**
  - [ ] **Implement Quote→Order Conversion report:** AC: User can view a report on quote-to-order conversion rates.
  - [ ] **Implement Margin report:** AC: User can view a report on sales margins.
  - [ ] **Implement Fill Rate report:** AC: User can view a report on order fill rates.
  - [ ] **Implement Rep Performance report:** AC: User can view a report on sales representative performance.
- [ ] **Forms**
  - [ ] **Implement Price List (Master) form:** AC: User can create and edit price lists.
  - [ ] **Implement Customer Agreement (Master) form:** AC: User can create and edit customer agreements.
  - [ ] **Implement Quote (Txn) form:** AC: User can create and edit quotes.
  - [ ] **Implement Sales Order (Txn) form:** AC: User can create and edit sales orders.
  - [ ] **Implement Delivery (DO) (Txn) form:** AC: User can create and edit delivery orders.
  - [ ] **Implement Sales Return (Txn) form:** AC: User can create and edit sales returns.
  - [ ] **Implement Commission Scheme (Config) form:** AC: User can configure commission schemes.

### Procurement

- [ ] **Data Objects**
  - [ ] **Implement Requisition management:** AC: User can create, read, update, and delete requisitions.
  - [ ] **Implement RFQ management:** AC: User can create, read, update, and delete RFQs.
  - [ ] **Implement Vendor Quote management:** AC: User can create, read, update, and delete vendor quotes.
  - [ ] **Implement PO management:** AC: User can create, read, update, and delete purchase orders.
  - [ ] **Implement GRN management:** AC: User can create, read, update, and delete goods receipt notes.
  - [ ] **Implement Contract management:** AC: User can create, read, update, and delete contracts.
- [ ] **Processes**
  - [ ] **Implement Sourcing:** AC: User can source items from suppliers.
  - [ ] **Implement Bid Comparison:** AC: User can compare bids from suppliers.
  - [ ] **Implement PO Issuance:** AC: User can issue purchase orders to suppliers.
  - [ ] **Implement Receipt:** AC: User can receive goods from suppliers.
  - [ ] **Implement Vendor Evaluation:** AC: User can evaluate vendor performance.
- [ ] **Validations/Rules**
  - [ ] **Implement 2/3-way Match:** AC: System performs 2/3-way matching of invoices, purchase orders, and goods receipts.
  - [ ] **Implement Approval Thresholds:** AC: System enforces approval thresholds for purchase orders.
  - [ ] **Implement Price Rules:** AC: System applies price rules to purchase orders.
- [ ] **Reports/KPIs**
  - [ ] **Implement Savings report:** AC: User can view a report on procurement savings.
  - [ ] **Implement Lead Times report:** AC: User can view a report on supplier lead times.
  - [ ] **Implement On-contract Spend report:** AC: User can view a report on on-contract spend.
  - [ ] **Implement Supplier Scorecards report:** AC: User can view supplier scorecards.
- [ ] **Forms**
  - [ ] **Implement Requisition (Txn) form:** AC: User can create and edit requisitions.
  - [ ] **Implement RFQ (Txn) form:** AC: User can create and edit RFQs.
  - [ ] **Implement Vendor Quote (Txn) form:** AC: User can create and edit vendor quotes.
  - [ ] **Implement Purchase Order (Txn) form:** AC: User can create and edit purchase orders.
  - [ ] **Implement Goods Receipt (GRN) (Txn) form:** AC: User can create and edit goods receipt notes.

### Inventory & WMS

- [ ] **Data Objects**
  - [ ] **Implement Item management:** AC: User can create, read, update, and delete items.
  - [ ] **Implement Location/Bin management:** AC: User can create, read, update, and delete locations and bins.
  - [ ] **Implement Batch/Serial management:** AC: User can manage batches and serial numbers.
  - [ ] **Implement Transfer management:** AC: User can create, read, update, and delete stock transfers.
  - [ ] **Implement Adjustment management:** AC: User can create, read, update, and delete stock adjustments.
  - [ ] **Implement Cycle Count management:** AC: User can create, read, update, and delete cycle counts.
- [ ] **Processes**
  - [ ] **Implement Receipts/Issues:** AC: User can record stock receipts and issues.
  - [ ] **Implement Internal Moves:** AC: User can record internal stock moves.
  - [ ] **Implement Counting:** AC: User can perform stock counts.
  - [ ] **Implement Reservations:** AC: User can reserve stock for sales orders.
  - [ ] **Implement Costing:** AC: System calculates item costs.
- [ ] **Validations/Rules**
  - [ ] **Implement Min/Max/Reorder validation:** AC: System validates min, max, and reorder levels.
  - [ ] **Implement Lot/Expiry validation:** AC: System validates lot and expiry dates.
  - [ ] **Implement Count Tolerances:** AC: System allows for count tolerances.
- [ ] **Reports/KPIs**
  - [ ] **Implement Accuracy report:** AC: User can view a stock accuracy report.
  - [ ] **Implement Turns report:** AC: User can view a stock turns report.
  - [ ] **Implement Slow Movers report:** AC: User can view a slow movers report.
  - [ ] **Implement Variance report:** AC: User can view a stock variance report.
- [ ] **Forms**
  - [ ] **Implement Item (Master) form:** AC: User can create and edit items.
  - [ ] **Implement Location/Bin (Master) form:** AC: User can create and edit locations and bins.
  - [ ] **Implement Stock Transfer (Txn) form:** AC: User can create and edit stock transfers.
  - [ ] **Implement Stock Adjustment (Txn) form:** AC: User can create and edit stock adjustments.
  - [ ] **Implement Cycle Count (Txn) form:** AC: User can create and edit cycle counts.

## Low Priority

### Pricing & Promotions

- [ ] **Data Objects**
  - [ ] **Implement Price Book management:** AC: User can create, read, update, and delete price books.
  - [ ] **Implement Pricing Rule management:** AC: User can create, read, update, and delete pricing rules.
  - [ ] **Implement Coupon/Bundle management:** AC: User can create, read, update, and delete coupons and bundles.
  - [ ] **Implement Customer Segment management:** AC: User can create, read, update, and delete customer segments.
- [ ] **Processes**
  - [ ] **Implement Rule Evaluation:** AC: System evaluates pricing rules.
  - [ ] **Implement Stacking:** AC: System handles stacking of pricing rules.
  - [ ] **Implement Simulations:** AC: User can simulate pricing scenarios.
  - [ ] **Implement Channel Pricing:** AC: User can manage channel pricing.
- [ ] **Validations/Rules**
  - [ ] **Implement Priority/Conflict Resolution:** AC: System resolves conflicts between pricing rules.
  - [ ] **Implement Override Permissions:** AC: User can override pricing rules with the necessary permissions.
- [ ] **Reports/KPIs**
  - [ ] **Implement Margin Impact report:** AC: User can view a report on the impact of pricing rules on margins.
  - [ ] **Implement Promo ROI report:** AC: User can view a report on the ROI of promotions.
  - [ ] **Implement Redemption report:** AC: User can view a report on coupon redemption rates.
- [ ] **Forms**
  - [ ] **Implement Pricing Rule (Config) form:** AC: User can create and edit pricing rules.
  - [ ] **Implement Promotion/Coupon (Config) form:** AC: User can create and edit promotions and coupons.

### Projects & Job Costing

- [ ] **Data Objects**
  - [ ] **Implement Project/WBS management:** AC: User can create, read, update, and delete projects and WBS.
  - [ ] **Implement Task management:** AC: User can create, read, update, and delete tasks.
  - [ ] **Implement Budget management:** AC: User can create, read, update, and delete budgets.
  - [ ] **Implement Timesheet management:** AC: User can create, read, update, and delete timesheets.
  - [ ] **Implement Work Order management:** AC: User can create, read, update, and delete work orders.
  - [ ] **Implement Change Order management:** AC: User can create, read, update, and delete change orders.
- [ ] **Processes**
  - [ ] **Implement Time/Cost Capture:** AC: User can capture time and costs against projects.
  - [ ] **Implement Progress Billing:** AC: User can generate progress billings.
  - [ ] **Implement Change Control:** AC: User can manage changes to projects.
  - [ ] **Implement Variance Analysis:** AC: User can analyze project variances.
- [ ] **Validations/Rules**
  - [ ] **Implement Budget Ceilings:** AC: System enforces budget ceilings.
  - [ ] **Implement Approval Gates:** AC: System enforces approval gates for projects.
  - [ ] **Implement Cost Code Integrity:** AC: System ensures the integrity of cost codes.
- [ ] **Reports/KPIs**
  - [ ] **Implement Profitability report:** AC: User can view a project profitability report.
  - [ ] **Implement CPI/SPI report:** AC: User can view a CPI/SPI report.
  - [ ] **Implement Cost/Schedule Variance report:** AC: User can view a cost/schedule variance report.
- [ ] **Forms**
  - [ ] **Implement Project (Master) form:** AC: User can create and edit projects.
  - [ ] **Implement WBS/Task (Master/Txn) form:** AC: User can create and edit WBS and tasks.
  - [ ] **Implement Timesheet (Txn) form:** AC: User can create and edit timesheets.
  - [ ] **Implement Work Order (Txn) form:** AC: User can create and edit work orders.
  - [ ] **Implement Budget (Config/Txn) form:** AC: User can create and edit budgets.
  - [ ] **Implement Change Order (Txn) form:** AC: User can create and edit change orders.

### HR & Payroll

- [ ] **Data Objects**
  - [ ] **Implement Employee management:** AC: User can create, read, update, and delete employees.
  - [ ] **Implement Position/Grade management:** AC: User can create, read, update, and delete positions and grades.
  - [ ] **Implement Attendance management:** AC: User can manage employee attendance.
  - [ ] **Implement Leave management:** AC: User can manage employee leave.
  - [ ] **Implement Payroll Run management:** AC: User can manage payroll runs.
  - [ ] **Implement Loan/Advance management:** AC: User can manage employee loans and advances.
- [ ] **Processes**
  - [ ] **Implement Hiring/Changes:** AC: User can manage the hiring and termination of employees.
  - [ ] **Implement T&A:** AC: User can manage time and attendance.
  - [ ] **Implement Payroll:** AC: User can process payroll.
  - [ ] **Implement Deductions/Taxes:** AC: System calculates deductions and taxes.
  - [ ] **Implement EOS:** AC: User can process end-of-service benefits.
- [ ] **Validations/Rules**
  - [ ] **Implement Policy Compliance:** AC: System enforces HR policies.
  - [ ] **Implement Accruals:** AC: System calculates leave accruals.
  - [ ] **Implement Loan Limits:** AC: System enforces loan limits.
  - [ ] **Implement Statutory Rules:** AC: System complies with statutory rules.
- [ ] **Reports/KPIs**
  - [ ] **Implement Cost Per Employee report:** AC: User can view a cost per employee report.
  - [ ] **Implement Attrition report:** AC: User can view an employee attrition report.
  - [ ] **Implement Absenteeism report:** AC: User can view an employee absenteeism report.
- [ ] **Forms**
  - [ ] **Implement Employee (Master) form:** AC: User can create and edit employees.
  - [ ] **Implement Attendance (Txn) form:** AC: User can record employee attendance.
  - [ ] **Implement Leave (Txn) form:** AC: User can record employee leave.
  - [ ] **Implement Payroll Run (Txn) form:** AC: User can process payroll.
  - [ ] **Implement Payslip (Txn) form:** AC: User can generate payslips.
  - [ ] **Implement Loan/Advance (Txn) form:** AC: User can record employee loans and advances.

### Fixed Assets

- [ ] **Data Objects**
  - [ ] **Implement Asset Class management:** AC: User can create, read, update, and delete asset classes.
  - [ ] **Implement Asset management:** AC: User can create, read, update, and delete assets.
  - [ ] **Implement Depreciation Schedule management:** AC: User can manage depreciation schedules.
  - [ ] **Implement Transfer management:** AC: User can manage asset transfers.
  - [ ] **Implement Disposal management:** AC: User can manage asset disposals.
- [ ] **Processes**
  - [ ] **Implement Capitalization:** AC: User can capitalize assets.
  - [ ] **Implement Depreciation:** AC: System runs depreciation.
  - [ ] **Implement Revaluation:** AC: User can revalue assets.
  - [ ] **Implement Transfer:** AC: User can transfer assets.
  - [ ] **Implement Disposal:** AC: User can dispose of assets.
- [ ] **Validations/Rules**
  - [ ] **Implement Capex Policies:** AC: System enforces capex policies.
  - [ ] **Implement GL Mapping:** AC: System maps asset transactions to the GL.
  - [ ] **Implement Useful Life/Method validation:** AC: System validates the useful life and depreciation method of assets.
- [ ] **Reports/KPIs**
  - [ ] **Implement Asset Register report:** AC: User can view an asset register.
  - [ ] **Implement NBV report:** AC: User can view a net book value report.
  - [ ] **Implement Depreciation report:** AC: User can view a depreciation report.
  - [ ] **Implement Impairments report:** AC: User can view an impairments report.
- [ ] **Forms**
  - [ ] **Implement Asset Class (Master) form:** AC: User can create and edit asset classes.
  - [ ] **Implement Asset (Master) form:** AC: User can create and edit assets.
  - [ ] **Implement Depreciation Run (Txn) form:** AC: User can run depreciation.
  - [ ] **Implement Transfer (Txn) form:** AC: User can transfer assets.
  - [ ] **Implement Disposal (Txn) form:** AC: User can dispose of assets.

### Maintenance (CMMS/EAM)

- [ ] **Data Objects**
  - [ ] **Implement Maintainable Asset management:** AC: User can manage maintainable assets.
  - [ ] **Implement PM Plan management:** AC: User can manage preventive maintenance plans.
  - [ ] **Implement Work Order management:** AC: User can manage maintenance work orders.
  - [ ] **Implement Failure Code management:** AC: User can manage failure codes.
  - [ ] **Implement Spare management:** AC: User can manage spare parts.
- [ ] **Processes**
  - [ ] **Implement Preventive/Corrective Maintenance:** AC: User can perform preventive and corrective maintenance.
  - [ ] **Implement Scheduling:** AC: User can schedule maintenance work orders.
  - [ ] **Implement Failure Logging:** AC: User can log maintenance failures.
- [ ] **Validations/Rules**
  - [ ] **Implement Parts Availability validation:** AC: System validates parts availability for work orders.
  - [ ] **Implement SLA/Priority validation:** AC: System validates SLAs and priorities for work orders.
- [ ] **Reports/KPIs**
  - [ ] **Implement PM Compliance report:** AC: User can view a PM compliance report.
  - [ ] **Implement MTBF/MTTR report:** AC: User can view an MTBF/MTTR report.
  - [ ] **Implement Maintenance Cost Per Asset report:** AC: User can view a maintenance cost per asset report.
- [ ] **Forms**
  - [ ] **Implement Maintainable Asset (Master) form:** AC: User can create and edit maintainable assets.
  - [ ] **Implement PM Plan (Master) form:** AC: User can create and edit PM plans.
  - [ ] **Implement Work Order (Txn) form:** AC: User can create and edit maintenance work orders.
  - [ ] **Implement Spare Part (Master) form:** AC: User can create and edit spare parts.

### Hotel PMS

- [ ] **Data Objects**
  - [ ] **Implement Room Type/Room management:** AC: User can create, read, update, and delete room types and rooms.
  - [ ] **Implement Rate Plan management:** AC: User can create, read, update, and delete rate plans.
  - [ ] **Implement Reservation management:** AC: User can create, read, update, and delete reservations.
  - [ ] **Implement Guest management:** AC: User can create, read, update, and delete guest profiles.
  - [ ] **Implement Housekeeping management:** AC: User can manage housekeeping tasks.
  - [ ] **Implement Folio management:** AC: User can manage guest folios.
- [ ] **Processes**
  - [ ] **Implement Booking, Modify/Cancel:** AC: User can book, modify, and cancel reservations.
  - [ ] **Implement Check-in/Out:** AC: User can check in and check out guests.
  - [ ] **Implement Charge Posting:** AC: User can post charges to guest folios.
  - [ ] **Implement OTA Commissions:** AC: System calculates OTA commissions.
- [ ] **Validations/Rules**
  - [ ] **Implement Overbooking Prevention:** AC: System prevents overbooking of rooms.
  - [ ] **Implement No-show/Cancellation validation:** AC: System handles no-shows and cancellations.
  - [ ] **Implement Tax/Fees validation:** AC: System validates taxes and fees.
- [ ] **Reports/KPIs**
  - [ ] **Implement Occupancy report:** AC: User can view an occupancy report.
  - [ ] **Implement ADR report:** AC: User can view an average daily rate report.
  - [ ] **Implement RevPAR report:** AC: User can view a revenue per available room report.
  - [ ] **Implement Night Audit report:** AC: User can view a night audit report.
  - [ ] **Implement Channel Mix report:** AC: User can view a channel mix report.
- [ ] **Forms**
  - [ ] **Implement Room Type (Master) form:** AC: User can create and edit room types.
  - [ ] **Implement Room (Master) form:** AC: User can create and edit rooms.
  - [ ] **Implement Rate Plan (Master) form:** AC: User can create and edit rate plans.
  - [ ] **Implement Reservation (Txn) form:** AC: User can create and edit reservations.
  - [ ] **Implement Guest Profile (Master) form:** AC: User can create and edit guest profiles.
  - [ ] **Implement Check-In / Check-Out (Txn) form:** AC: User can check in and check out guests.
  - [ ] **Implement Folio/Posting (Txn) form:** AC: User can post charges to guest folios.
  - [ ] **Implement Housekeeping Task (Txn) form:** AC: User can manage housekeeping tasks.

### F&B / Restaurant POS

- [ ] **Data Objects**
  - [ ] **Implement Menu/Item management:** AC: User can create, read, update, and delete menus and items.
  - [ ] **Implement Recipe/BOM management:** AC: User can create, read, update, and delete recipes and BOMs.
  - [ ] **Implement Table/Area management:** AC: User can create, read, update, and delete tables and areas.
  - [ ] **Implement Order/Check management:** AC: User can manage orders and checks.
  - [ ] **Implement Kitchen Ticket management:** AC: User can manage kitchen tickets.
  - [ ] **Implement Delivery Order management:** AC: User can manage delivery orders.
- [ ] **Processes**
  - [ ] **Implement Ordering, Modifiers/Voids/Discounts:** AC: User can take orders, apply modifiers, voids, and discounts.
  - [ ] **Implement Check Close:** AC: User can close checks.
  - [ ] **Implement Inventory Deduction by Recipe:** AC: System deducts inventory based on recipes.
- [ ] **Validations/Rules**
  - [ ] **Implement Void/Discount Permissions:** AC: System enforces permissions for voids and discounts.
  - [ ] **Implement Cash Variance validation:** AC: System validates cash variances.
- [ ] **Reports/KPIs**
  - [ ] **Implement Avg Check report:** AC: User can view an average check report.
  - [ ] **Implement Table Turns report:** AC: User can view a table turns report.
  - [ ] **Implement Food Cost % report:** AC: User can view a food cost percentage report.
  - [ ] **Implement Waste report:** AC: User can view a waste report.
- [ ] **Forms**
  - [ ] **Implement Menu Item (Master) form:** AC: User can create and edit menu items.
  - [ ] **Implement Recipe / BOM (Master) form:** AC: User can create and edit recipes and BOMs.
  - [ ] **Implement Table (Master) form:** AC: User can create and edit tables.
  - [ ] **Implement Order / Check (Txn) form:** AC: User can create and edit orders and checks.
  - [ ] **Implement Kitchen Ticket (Txn) form:** AC: User can manage kitchen tickets.
  - [ ] **Implement Delivery Order (Txn) form:** AC: User can manage delivery orders.

### Real Estate

- [ ] **Data Objects**
  - [ ] **Implement Project/Building management:** AC: User can create, read, update, and delete projects and buildings.
  - [ ] **Implement Unit management:** AC: User can create, read, update, and delete units.
  - [ ] **Implement Contract management:** AC: User can create, read, update, and delete contracts.
  - [ ] **Implement Payment Schedule management:** AC: User can create, read, update, and delete payment schedules.
  - [ ] **Implement Penalty management:** AC: User can create, read, update, and delete penalties.
- [ ] **Processes**
  - [ ] **Implement Unit Reservation:** AC: User can reserve units.
  - [ ] **Implement Contract Execution:** AC: User can execute contracts.
  - [ ] **Implement Periodic Billing:** AC: User can generate periodic billings.
  - [ ] **Implement Penalties:** AC: User can apply penalties.
  - [ ] **Implement Transfers:** AC: User can transfer units.
- [ ] **Validations/Rules**
  - [ ] **Implement Double-booking validation:** AC: System prevents double-booking of units.
  - [ ] **Implement Discount Thresholds:** AC: System enforces discount thresholds.
  - [ ] **Implement Legal Clauses:** AC: System manages legal clauses in contracts.
- [ ] **Reports/KPIs**
  - [ ] **Implement Occupancy/Sell-through report:** AC: User can view an occupancy/sell-through report.
  - [ ] **Implement Collections report:** AC: User can view a collections report.
  - [ ] **Implement Delinquency report:** AC: User can view a delinquency report.
- [ ] **Forms**
  - [ ] **Implement Project/Building (Master) form:** AC: User can create and edit projects and buildings.
  - [ ] **Implement Unit (Master) form:** AC: User can create and edit units.
  - [ ] **Implement Contract (Txn) form:** AC: User can create and edit contracts.
  - [ ] **Implement Payment Schedule (Txn) form:** AC: User can create and edit payment schedules.
  - [ ] **Implement Penalty (Txn) form:** AC: User can create and edit penalties.

### Construction

- [ ] **Data Objects**
  - [ ] **Implement Project management:** AC: User can create, read, update, and delete projects.
  - [ ] **Implement BOQ Item management:** AC: User can create, read, update, and delete BOQ items.
  - [ ] **Implement Contract management:** AC: User can create, read, update, and delete contracts.
  - [ ] **Implement Variation Order management:** AC: User can create, read, update, and delete variation orders.
  - [ ] **Implement Progress Certificate management:** AC: User can create, read, update, and delete progress certificates.
  - [ ] **Implement Equipment management:** AC: User can create, read, update, and delete equipment.
- [ ] **Processes**
  - [ ] **Implement Cost Tracking:** AC: User can track costs against projects.
  - [ ] **Implement Progress Measurement:** AC: User can measure progress on projects.
  - [ ] **Implement Certifications:** AC: User can generate certifications.
  - [ ] **Implement VO Management:** AC: User can manage variation orders.
- [ ] **Validations/Rules**
  - [ ] **Implement BOQ Match validation:** AC: System validates BOQ matching.
  - [ ] **Implement VO Approvals:** AC: System enforces approvals for variation orders.
  - [ ] **Implement Retention/LD Rules:** AC: System applies retention and liquidated damages rules.
- [ ] **Reports/KPIs**
  - [ ] **Implement % Complete report:** AC: User can view a project % complete report.
  - [ ] **Implement Cost Variance report:** AC: User can view a project cost variance report.
  - [ ] **Implement Project Margin report:** AC: User can view a project margin report.
- [ ] **Forms**
  - [ ] **Implement Job/Project (Master) form:** AC: User can create and edit jobs and projects.
  - [ ] **Implement BOQ Item (Master) form:** AC: User can create and edit BOQ items.
  - [ ] **Implement Contract (Txn) form:** AC: User can create and edit contracts.
  - [ ] **Implement Variation Order (Txn) form:** AC: User can create and edit variation orders.
  - [ ] **Implement Progress Certificate (Txn) form:** AC: User can create and edit progress certificates.
  - [ ] **Implement Equipment (Master) form:** AC: User can create and edit equipment.

### Shipping & 3PL

- [ ] **Data Objects**
  - [ ] **Implement Carrier/Service management:** AC: User can create, read, update, and delete carriers and services.
  - [ ] **Implement Shipment/Label management:** AC: User can create, read, update, and delete shipments and labels.
  - [ ] **Implement Tracking management:** AC: User can track shipments.
  - [ ] **Implement Return (RMA) management:** AC: User can manage returns (RMAs).
- [ ] **Processes**
  - [ ] **Implement Rate Shopping:** AC: User can shop for rates from different carriers.
  - [ ] **Implement Label Generation:** AC: User can generate shipping labels.
  - [ ] **Implement Tracking/Notifications:** AC: System tracks shipments and sends notifications.
  - [ ] **Implement Returns:** AC: User can process returns.
- [ ] **Validations/Rules**
  - [ ] **Implement Weight/Dimension Checks:** AC: System validates weight and dimensions of packages.
  - [ ] **Implement Duties/Surcharges:** AC: System calculates duties and surcharges.
- [ ] **Reports/KPIs**
  - [ ] **Implement Ship Cost Per Order report:** AC: User can view a ship cost per order report.
  - [ ] **Implement On-time Delivery report:** AC: User can view an on-time delivery report.
  - [ ] **Implement Return Rate report:** AC: User can view a return rate report.
- [ ] **Forms**
  - [ ] **Implement Carrier/Service (Master) form:** AC: User can create and edit carriers and services.
  - [ ] **Implement Shipment (Txn) form:** AC: User can create and edit shipments.
  - [ ] **Implement Return (RMA) (Txn) form:** AC: User can create and edit returns (RMAs).

### CRM & Service Desk

- [ ] **Data Objects**
  - [ ] **Implement Lead management:** AC: User can create, read, update, and delete leads.
  - [ ] **Implement Account/Contact management:** AC: User can create, read, update, and delete accounts and contacts.
  - [ ] **Implement Deal/Opportunity management:** AC: User can create, read, update, and delete deals and opportunities.
  - [ ] **Implement Activity management:** AC: User can create, read, update, and delete activities.
  - [ ] **Implement Ticket management:** AC: User can create, read, update, and delete tickets.
  - [ ] **Implement SLA management:** AC: User can create, read, update, and delete SLAs.
  - [ ] **Implement Knowledge Base management:** AC: User can create, read, update, and delete knowledge base articles.
- [ ] **Processes**
  - [ ] **Implement Lead Qualification:** AC: User can qualify leads.
  - [ ] **Implement Pipeline Progression:** AC: User can manage the sales pipeline.
  - [ ] **Implement Omnichannel Support:** AC: User can provide support through multiple channels.
  - [ ] **Implement SLA Tracking:** AC: System tracks SLAs.
- [ ] **Validations/Rules**
  - [ ] **Implement Stage Exit Criteria:** AC: System enforces stage exit criteria for deals.
  - [ ] **Implement Duplicate Detection:** AC: System detects duplicate leads, accounts, and contacts.
  - [ ] **Implement SLA Timers/Escalations:** AC: System manages SLA timers and escalations.
- [ ] **Reports/KPIs**
  - [ ] **Implement Win Rate report:** AC: User can view a win rate report.
  - [ ] **Implement Pipeline Value/Velocity report:** AC: User can view a pipeline value/velocity report.
  - [ ] **Implement FCR report:** AC: User can view a first contact resolution report.
  - [ ] **Implement Time-to-resolve report:** AC: User can view a time-to-resolve report.
  - [ ] **Implement CSAT/NPS report:** AC: User can view a CSAT/NPS report.
- [ ] **Forms**
  - [ ] **Implement Lead (Txn/Master) form:** AC: User can create and edit leads.
  - [ ] **Implement Account/Contact (Master) form:** AC: User can create and edit accounts and contacts.
  - [ ] **Implement Deal (Txn) form:** AC: User can create and edit deals.
  - [ ] **Implement Activity (Txn) form:** AC: User can create and edit activities.
  - [ ] **Implement Ticket (Txn) form:** AC: User can create and edit tickets.
  - [ ] **Implement SLA (Config) form:** AC: User can configure SLAs.

### Subscriptions (Recurring Revenue)

- [ ] **Data Objects**
  - [ ] **Implement Plan/Add-on management:** AC: User can create, read, update, and delete plans and add-ons.
  - [ ] **Implement Subscription management:** AC: User can create, read, update, and delete subscriptions.
  - [ ] **Implement Invoice Schedule management:** AC: User can manage invoice schedules.
  - [ ] **Implement Dunning management:** AC: User can manage dunning.
- [ ] **Processes**
  - [ ] **Implement Auto Invoicing/Charging:** AC: System automatically generates invoices and charges customers.
  - [ ] **Implement Proration:** AC: System handles proration for upgrades and downgrades.
  - [ ] **Implement Upgrades/Downgrades:** AC: User can upgrade and downgrade subscriptions.
  - [ ] **Implement Dunning:** AC: System handles dunning for overdue payments.
- [ ] **Validations/Rules**
  - [ ] **Implement Renewal Windows:** AC: System enforces renewal windows.
  - [ ] **Implement Payment Gateway Checks:** AC: System performs checks with payment gateways.
  - [ ] **Implement Seat Limits:** AC: System enforces seat limits for subscriptions.
- [ ] **Reports/KPIs**
  - [ ] **Implement MRR/ARR report:** AC: User can view a monthly recurring revenue (MRR) and annual recurring revenue (ARR) report.
  - [ ] **Implement Churn report:** AC: User can view a churn report.
  - [ ] **Implement LTV report:** AC: User can view a customer lifetime value (LTV) report.
  - [ ] **Implement Expansion/Contraction report:** AC: User can view an expansion/contraction report.
- [ ] **Forms**
  - [ ] **Implement Plan (Master) form:** AC: User can create and edit plans.
  - [ ] **Implement Subscription (Txn) form:** AC: User can create and edit subscriptions.
  - [ ] **Implement Invoice Schedule (Txn) form:** AC: User can create and edit invoice schedules.
  - [ ] **Implement Dunning (Config/Txn) form:** AC: User can configure and manage dunning.

### BI & Analytics

- [ ] **Data Objects**
  - [ ] **Implement Data Source management:** AC: User can create, read, update, and delete data sources.
  - [ ] **Implement Dataset management:** AC: User can create, read, update, and delete datasets.
  - [ ] **Implement Dashboard management:** AC: User can create, read, update, and delete dashboards.
  - [ ] **Implement Lineage/Security management:** AC: User can manage data lineage and security.
- [ ] **Processes**
  - [ ] **Implement ETL/ELT:** AC: System performs ETL/ELT processes.
  - [ ] **Implement Modeling:** AC: User can create and manage data models.
  - [ ] **Implement Dashboards:** AC: User can create and view dashboards.
  - [ ] **Implement Alerts:** AC: User can create and manage alerts.
- [ ] **Validations/Rules**
  - [ ] **Implement Data Quality Rules:** AC: System enforces data quality rules.
  - [ ] **Implement RLS/PII Governance:** AC: System enforces row-level security (RLS) and personally identifiable information (PII) governance.
  - [ ] **Implement Refresh SLAs:** AC: System enforces data refresh SLAs.
- [ ] **Reports/KPIs**
  - [ ] **Implement Executive Dashboards:** AC: User can view executive dashboards.
  - [ ] **Implement Per-module KPIs:** AC: User can view key performance indicators (KPIs) for each module.
  - [ ] **Implement Data Freshness/Error Rates report:** AC: User can view a report on data freshness and error rates.
- [ ] **Forms**
  - [ ] **Implement Data Source (Config) form:** AC: User can configure data sources.
  - [ ] **Implement Dataset (Config) form:** AC: User can configure datasets.
  - [ ] **Implement Dashboard (Config) form:** AC: User can configure dashboards.
