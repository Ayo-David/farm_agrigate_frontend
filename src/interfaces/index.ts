export type PayeeType = {
	id: string;
	full_name: string;
	phone: string;
	address: string;
	category: string;
	gender: string;
	location: string;
};

export type InvoiceType = {
	payeeId: string;
	amount: string;
	quantity: string;
	invoiceNo: string;
	productNo: string;
	txnID: string;
	productId: string;
	date: number;
	createdAt: Date;
};
