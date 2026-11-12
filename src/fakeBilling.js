const invoices = new Map();

function createInvoice(customerId, amountCents, currency = 'USD') {
  const id = `inv_${invoices.size + 1}`;
  const invoice = {
    id,
    customerId,
    amountCents,
    currency,
    status: 'open',
    createdAt: new Date().toISOString(),
  };
  invoices.set(id, invoice);
  return invoice;
}

function payInvoice(id) {
  const invoice = invoices.get(id);
  if (!invoice) return { ok: false, error: 'not_found' };
  if (invoice.status === 'paid') return { ok: false, error: 'already_paid' };
  invoice.status = 'paid';
  invoice.paidAt = new Date().toISOString();
  return { ok: true, invoice };
}

function listInvoices(customerId) {
  return [...invoices.values()].filter(i => i.customerId === customerId);
}

module.exports = { createInvoice, payInvoice, listInvoices };
