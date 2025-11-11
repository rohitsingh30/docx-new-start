import React, { useState } from 'react';
import styles from '../styles/Invoice.module.css';
import { MOCK_DATA } from '../constants/dataConstants';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { InvoiceProps } from '../types/Invoice.types';

const Invoice: React.FC<InvoiceProps> = ({ invoiceId, onBack }) => {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>(invoiceId ? 'detail' : 'list');
  const [selectedId, setSelectedId] = useState(invoiceId);

  const mockInvoices = MOCK_DATA.INVOICES;
  const stats = MOCK_DATA.INVOICE_STATS;
  const invoiceDetail = {
    ...MOCK_DATA.INVOICE_DETAIL,
    id: selectedId || MOCK_DATA.INVOICE_DETAIL.id,
  };

  const handleViewInvoice = (id: string) => {
    setSelectedId(id);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Paid': return styles.statusPaid;
      case 'Pending': return styles.statusPending;
      case 'Overdue': return styles.statusOverdue;
      default: return '';
    }
  };

  if (viewMode === 'detail') {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onBack || handleBackToList}>
            <span className={styles.materialIcon}>arrow_back</span>
            {STRING_CONSTANTS.BUTTONS.BACK}
          </button>
          <div className={styles.headerActions}>
            <button className={styles.actionBtn}>
              <span className={styles.materialIcon}>email</span>
              {STRING_CONSTANTS.BUTTONS.SEND_EMAIL}
            </button>
            <button className={styles.actionBtn} onClick={() => window.print()}>
              <span className={styles.materialIcon}>print</span>
              {STRING_CONSTANTS.BUTTONS.PRINT}
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.materialIcon}>download</span>
              {STRING_CONSTANTS.BUTTONS.EXPORT_PDF}
            </button>
          </div>
        </div>

        <div className={styles.invoice}>
          <div className={styles.invoiceHeader}>
            <div>
              <h1 className={styles.clinicName}>{STRING_CONSTANTS.LABELS.CLINIC_NAME}</h1>
              <p>{STRING_CONSTANTS.LABELS.CLINIC_ADDRESS}</p>
              <p>{STRING_CONSTANTS.LABELS.CLINIC_PHONE}</p>
            </div>
            <div className={styles.invoiceInfo}>
              <h2>{STRING_CONSTANTS.LABELS.INVOICE_HEADER}</h2>
              <p><strong>{STRING_CONSTANTS.LABELS.INVOICE_NUMBER}</strong> {invoiceDetail.id}</p>
              <p><strong>{STRING_CONSTANTS.LABELS.DATE}</strong> {invoiceDetail.date}</p>
              <p><strong>{STRING_CONSTANTS.LABELS.DUE_DATE}</strong> {invoiceDetail.dueDate}</p>
              <span className={getStatusClass(invoiceDetail.status)}>{invoiceDetail.status}</span>
            </div>
          </div>

          <div className={styles.billTo}>
            <div>
              <h3>{STRING_CONSTANTS.LABELS.BILL_TO_HEADER}</h3>
              <p className={styles.patientName}>{invoiceDetail.patient}</p>
              <p>{invoiceDetail.patientId}</p>
            </div>
            <div>
              <h3>{STRING_CONSTANTS.LABELS.APPOINTMENT_HEADER}</h3>
              <p><strong>{STRING_CONSTANTS.LABELS.DATE}</strong> {invoiceDetail.appointmentDate}</p>
              <p><strong>{STRING_CONSTANTS.LABELS.APPOINTMENT_TYPE}</strong> {invoiceDetail.appointmentType}</p>
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>{STRING_CONSTANTS.LABELS.DESCRIPTION_HEADER}</th>
                <th>{STRING_CONSTANTS.LABELS.QTY_HEADER}</th>
                <th>{STRING_CONSTANTS.LABELS.UNIT_PRICE_HEADER}</th>
                <th>{STRING_CONSTANTS.LABELS.TOTAL_HEADER}</th>
              </tr>
            </thead>
            <tbody>
              {invoiceDetail.items.map((item, i) => (
                <tr key={i}>
                  <td>{item.description}</td>
                  <td>{item.qty}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>{STRING_CONSTANTS.LABELS.SUBTOTAL}</span>
              <span>${invoiceDetail.subtotal.toFixed(2)}</span>
            </div>
            {invoiceDetail.discount > 0 && (
              <div className={styles.totalRow}>
                <span>{STRING_CONSTANTS.LABELS.DISCOUNT}</span>
                <span>-${invoiceDetail.discount.toFixed(2)}</span>
              </div>
            )}
            {invoiceDetail.tax > 0 && (
              <div className={styles.totalRow}>
                <span>{STRING_CONSTANTS.LABELS.TAX}</span>
                <span>${invoiceDetail.tax.toFixed(2)}</span>
              </div>
            )}
            <div className={styles.totalRowFinal}>
              <span>{STRING_CONSTANTS.LABELS.TOTAL_FINAL}</span>
              <span>${invoiceDetail.total.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.footer}>
            <p>{STRING_CONSTANTS.LABELS.THANK_YOU_MESSAGE}</p>
            <p>{STRING_CONSTANTS.LABELS.BILLING_CONTACT}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {onBack && (
          <button className={styles.backButton} onClick={onBack}>
            <span className={styles.materialIcon}>arrow_back</span>
            {STRING_CONSTANTS.BUTTONS.BACK}
          </button>
        )}
        <h1 className={styles.pageTitle}>{STRING_CONSTANTS.LABELS.INVOICES}</h1>
        <button className={styles.newBtn}>
          <span className={styles.materialIcon}>add</span>
          {STRING_CONSTANTS.BUTTONS.NEW_INVOICE}
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.materialIcon}>attach_money</span>
          <div>
            <div className={styles.statValue}>${stats.totalRevenue.toLocaleString()}</div>
            <div className={styles.statLabel}>{STRING_CONSTANTS.LABELS.TOTAL_REVENUE}</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.materialIcon}>pending</span>
          <div>
            <div className={styles.statValue}>${stats.pending.toLocaleString()}</div>
            <div className={styles.statLabel}>{STRING_CONSTANTS.LABELS.PENDING_PAYMENTS}</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.materialIcon}>description</span>
          <div>
            <div className={styles.statValue}>{stats.invoicesThisMonth}</div>
            <div className={styles.statLabel}>{STRING_CONSTANTS.LABELS.INVOICES_THIS_MONTH}</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className={styles.materialIcon}>check_circle</span>
          <div>
            <div className={styles.statValue}>{stats.paidInvoices}</div>
            <div className={styles.statLabel}>{STRING_CONSTANTS.LABELS.PAID_INVOICES}</div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <span className={styles.materialIcon}>search</span>
            <input type="text" placeholder={STRING_CONSTANTS.PLACEHOLDERS.SEARCH_INVOICES} />
          </div>
          <select className={styles.filterSelect}>
            <option>{STRING_CONSTANTS.OPTIONS.ALL_STATUS}</option>
            <option>{STRING_CONSTANTS.OPTIONS.PAID}</option>
            <option>{STRING_CONSTANTS.OPTIONS.PENDING}</option>
            <option>{STRING_CONSTANTS.OPTIONS.OVERDUE}</option>
          </select>
          <select className={styles.filterSelect}>
            <option>{STRING_CONSTANTS.OPTIONS.ALL_TIME}</option>
            <option>{STRING_CONSTANTS.OPTIONS.THIS_MONTH}</option>
            <option>{STRING_CONSTANTS.OPTIONS.LAST_MONTH}</option>
          </select>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>{STRING_CONSTANTS.LABELS.INVOICE_ID_HEADER}</th>
              <th>{STRING_CONSTANTS.LABELS.PATIENT_HEADER}</th>
              <th>{STRING_CONSTANTS.LABELS.DATE}</th>
              <th>{STRING_CONSTANTS.LABELS.AMOUNT_HEADER}</th>
              <th>{STRING_CONSTANTS.LABELS.STATUS_HEADER}</th>
              <th>{STRING_CONSTANTS.LABELS.ACTIONS_HEADER}</th>
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map(inv => (
              <tr key={inv.id}>
                <td className={styles.invoiceId}>{inv.id}</td>
                <td>{inv.patient}</td>
                <td>{inv.date}</td>
                <td className={styles.amount}>${inv.amount}</td>
                <td>
                  <span className={getStatusClass(inv.status)}>{inv.status}</span>
                </td>
                <td>
                  <button 
                    className={styles.viewBtn}
                    onClick={() => handleViewInvoice(inv.id)}
                  >
                    {STRING_CONSTANTS.BUTTONS.VIEW}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoice;
