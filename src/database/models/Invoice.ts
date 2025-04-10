import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation, text } from '@nozbe/watermelondb/decorators';

export default class Invoice extends Model {
	static table = 'invoices';
	//add product type to enum(P,S)to invoices
	@text('invoice_no') invoiceNo;
	@text('product_no') productNo;
	@text('txn_id') txnId;
	@text('product_id') productId;
	@text('quantity') quantity;
	@text('payee_id') payeeId;
	@field('date') date;
	@text('amount') amount;
	@text('status') status;
	@readonly @date('created_at') createdAt;
	@readonly @date('updated_at') updatedAt;

	// Relations
	@relation('payee', 'payee_id') payee; // Each Invoice belongs to one Payee
	@relation('products', 'product_id') product; // Each Invoice belongs to one Product

	static associations = {
		payee: { type: 'belongs_to', key: 'payee_id' },
		products: { type: 'belongs_to', key: 'product_id' },
	};
}
