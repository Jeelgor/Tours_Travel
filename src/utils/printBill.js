import { format } from "date-fns";

export const printBill = (payment) => {
    // Create a temporary div for the bill
    const printWindow = window.open('', '_blank');

    // Add necessary styles
    const styles = `
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
            }
            .bill-header {
                text-align: center;
                margin-bottom: 30px;
            }
            .bill-details {
                margin-bottom: 20px;
            }
            .amount {
                font-size: 24px;
                color: #2563eb;
                font-weight: bold;
            }
            .divider {
                border-top: 1px solid #e5e7eb;
                margin: 20px 0;
            }
            .footer {
                margin-top: 40px;
                text-align: center;
                color: #6b7280;
                font-size: 14px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #e5e7eb;
            }
        </style>
    `;

    // Create bill content
    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Travel Booking Receipt</title>
            ${styles}
        </head>
        <body>
            <div class="bill-header">
                <h1>Travel Booking Receipt</h1>
                <p>Invoice #${payment._id.slice(-6)}</p>
            </div>

            <div class="bill-details">
                <h2>${payment.packageName}</h2>
                <p>Transaction Date: ${format(new Date(payment.paymentDate), 'MMM dd, yyyy')}</p>
            </div>

            <div class="divider"></div>

            <table>
                <tr>
                    <td><strong>Customer Email:</strong></td>
                    <td>${payment.userEmail}</td>
                </tr>
                <tr>
                    <td><strong>Payment Method:</strong></td>
                    <td>${payment.paymentMethod}</td>
                </tr>
                <tr>
                    <td><strong>Status:</strong></td>
                    <td>${payment.status}</td>
                </tr>
                <tr>
                    <td><strong>Transaction ID:</strong></td>
                    <td>${payment.paymentIntentId}</td>
                </tr>
            </table>

            <div class="divider"></div>

            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th style="text-align: right;">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Travel Package Booking</td>
                        <td style="text-align: right;">₹${payment.amount}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total Amount</th>
                        <th style="text-align: right;">₹${payment.amount}</th>
                    </tr>
                </tfoot>
            </table>

            <div class="footer">
                <p>Thank you for choosing our services!</p>
                <p>For any queries, please contact support@travel.com</p>
            </div>
        </body>
        </html>
    `;

    // Write content to the new window
    printWindow.document.write(content);
    printWindow.document.close();

    // Print after the content is loaded
    printWindow.onload = function () {
        printWindow.print();
        printWindow.onafterprint = function () {
            printWindow.close();
        };
    };
};
