import React, { useState } from 'react';
import styles from '../styles/Invoice.module.css';

interface InvoiceProps {
  invoiceId?: string;
  onBack?: () => void;
}

const Invoice: React.FC<InvoiceProps> = ({ invoiceId, onBack }) => {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>(invoiceId ? 'detail' : 'list');
  const [selectedId, setSelectedId] = useState(invoiceId);

  const mockInvoices = [
    { id: 'INV-001', patient: 'Liam Johnson', date: 'Nov 9, 2025', amount: 350, status: 'Paid' },
    { id: 'INV-002', patient: 'Emma Wilson', date: 'Nov 9, 2025', amount: 200, status: 'Pending' },
    { id: 'INV-003', patient: 'Noah Brown', date: 'Nov 8, 2025', amount: 450, status: 'Pending' },
    { id: 'INV-004', patient: 'Olivia Davis', date: 'Nov 2, 2025', amount: 150, status: 'Overdue' },
  ];

  const stats = {
    totalRevenue: 8750,
    pending: 1250,
    invoicesThisMonth: 12,
    paidInvoices: 8,
  };

  const invoiceDetail = {
    id: selectedId || 'INV-001',
    date: 'November 9, 2025',
    dueDate: 'November 16, 2025',
    patient: 'Liam Johnson',
    patientId: '#PT-2024-001',
    appointmentDate: 'November 9, 2025',
    appointmentType: 'General Checkup',
    items: [
      { description: 'General Consultation', qty: 1, price: 150, total: 150 },
      { description: 'Blood Pressure Check', qty: 1, price: 50, total: 50 },
      { description: 'Complete Blood Count (CBC)', qty: 1, price: 100, total: 100 },
      { description: 'Lipid Panel', qty: 1, price: 75, total: 75 },
    ],
    subtotal: 375,
    discount: 25,
    tax: 0,
    total: 350,
    status: 'Paid',
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
            <span className="material-icons">arrow_back</span>
            Back
          </button>
          <div className={styles.headerActions}>
            <button className={styles.actionBtn}>
              <span className="material-icons">email</span>
              Send Email
            </button>
            <button className={styles.actionBtn} onClick={() => window.print()}>
              <span className="material-icons">print</span>
              Print
            </button>
            <button className={styles.actionBtn}>
              <span className="material-icons">download</span>
              Export PDF
            </button>
          </div>
        </div>

        <div className={styles.invoice}>
          <div className={styles.invoiceHeader}>
            <div>
              <h1 className={styles.clinicName}>DocX Medical Center</h1>
              <p>123 Healthcare Ave, Medical District</p>
              <p>Phone: (555) 123-4567</p>
            </div>
            <div className={styles.invoiceInfo}>
              <h2>INVOICE</h2>
              <p><strong>Invoice #:</strong> {invoiceDetail.id}</p>
              <p><strong>Date:</strong> {invoiceDetail.date}</p>
              <p><strong>Due Date:</strong> {invoiceDetail.dueDate}</p>
              <span className={getStatusClass(invoiceDetail.status)}>{invoiceDetail.status}</span>
            </div>
          </div>

          <div className={styles.billTo}>
            <div>
              <h3>Bill To:</h3>
              <p className={styles.patientName}>{invoiceDetail.patient}</p>
              <p>{invoiceDetail.patientId}</p>
            </div>
            <div>
              <h3>Appointment:</h3>
              <p><strong>Date:</strong> {invoiceDetail.appointmentDate}</p>
              <p><strong>Type:</strong> {invoiceDetail.appointmentType}</p>
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
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
              <span>Subtotal:</span>
              <span>${invoiceDetail.subtotal.toFixed(2)}</span>
            </div>
            {invoiceDetail.discount > 0 && (
              <div className={styles.totalRow}>
                <span>Discount:</span>
                <span>-${invoiceDetail.discount.toFixed(2)}</span>
              </div>
            )}
            {invoiceDetail.tax > 0 && (
              <div className={styles.totalRow}>
                <span>Tax:</span>
                <span>${invoiceDetail.tax.toFixed(2)}</span>
              </div>
            )}
            <div className={styles.totalRowFinal}>
              <span>Total:</span>
              <span>${invoiceDetail.total.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.footer}>
            <p>Thank you for choosing DocX Medical Center</p>
            <p>For questions, contact billing@docx.com</p>
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
            <span className="material-icons">arrow_back</span>
            Back
          </button>
        )}
        <h1 className={styles.pageTitle}>Invoices</h1>
        <button className={styles.newBtn}>
          <span className="material-icons">add</span>
          New Invoice
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className="material-icons">attach_money</span>
          <div>
            <div className={styles.statValue}>${stats.totalRevenue.toLocaleString()}</div>
            <div className={styles.statLabel}>Total Revenue</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className="material-icons">pending</span>
          <div>
            <div className={styles.statValue}>${stats.pending.toLocaleString()}</div>
            <div className={styles.statLabel}>Pending Payments</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className="material-icons">description</span>
          <div>
            <div className={styles.statValue}>{stats.invoicesThisMonth}</div>
            <div className={styles.statLabel}>Invoices This Month</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <span className="material-icons">check_circle</span>
          <div>
            <div className={styles.statValue}>{stats.paidInvoices}</div>
            <div className={styles.statLabel}>Paid Invoices</div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <span className="material-icons">search</span>
            <input type="text" placeholder="Search invoices..." />
          </div>
          <select className={styles.filterSelect}>
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>
          <select className={styles.filterSelect}>
            <option>All Time</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
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
                    View
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
