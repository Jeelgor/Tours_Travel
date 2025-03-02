import { format } from 'date-fns';

const PrintableBill = ({ payment }) => {
    return (
        <div className="print-only p-8" style={{ display: 'none' }}>
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold">Travel Booking Receipt</h1>
                    <p className="text-gray-500">Invoice #{payment._id.slice(-6)}</p>
                </div>

                <div className="border-b pb-4 mb-4">
                    <h2 className="font-semibold">Package Details</h2>
                    <p className="text-lg">{payment.packageName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                        <h3 className="font-semibold">Bill To:</h3>
                        <p>{payment.userEmail}</p>
                    </div>
                    <div className="text-right">
                        <h3 className="font-semibold">Payment Date:</h3>
                        <p>{format(new Date(payment.paymentDate), 'MMM dd, yyyy')}</p>
                    </div>
                </div>

                <table className="w-full mb-8">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2">Description</th>
                            <th className="text-right py-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2">Travel Package Booking</td>
                            <td className="text-right">₹{payment.amount}</td>
                        </tr>
                    </tbody>
                    <tfoot className="border-t">
                        <tr>
                            <th className="text-left py-2">Total Amount</th>
                            <th className="text-right py-2">₹{payment.amount}</th>
                        </tr>
                    </tfoot>
                </table>

                <div className="border-t pt-4">
                    <div className="mb-4">
                        <h3 className="font-semibold">Payment Information:</h3>
                        <p>Method: {payment.paymentMethod}</p>
                        <p>Status: {payment.status}</p>
                        <p>Transaction ID: {payment.paymentIntentId}</p>
                    </div>

                    <div className="text-sm text-gray-500">
                        <p>Thank you for choosing our services!</p>
                        <p>For any queries, please contact support@travel.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintableBill; 