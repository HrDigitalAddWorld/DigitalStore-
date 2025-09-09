import React from "react";
import { Container } from "react-bootstrap";

const ReturnPolicy = () => {
  return (
    <Container className="my-5">
      <h2 className="mb-4">Return & Refund Policy</h2>

      <p>
        Thank you for shopping at <strong>Digital Store</strong>. We want you to be completely satisfied with your purchase. If you are not entirely happy, we’re here to help.
      </p>

      <h4>1. Return Eligibility</h4>
      <p>
        - You may request a return within <strong>7 days</strong> of receiving your order.<br />
        - The product must be unused, in its original packaging, and with all tags attached.<br />
        - Items that are damaged due to misuse or negligence are not eligible for return.
      </p>

      <h4>2. Non-Returnable Items</h4>
      <p>
        - Digital downloads (software, licenses)<br />
        - Items marked as final sale<br />
        - Gift cards or vouchers
      </p>

      <h4>3. Return Process</h4>
      <p>
        - Contact our customer support at <strong>support@digitalstore.com</strong> within 7 days of delivery.<br />
        - Provide your order number and reason for the return.<br />
        - We will guide you through the return shipping process.
      </p>

      <h4>4. Refunds</h4>
      <p>
        - Once we receive and inspect your returned item, we will notify you of the refund status.<br />
        - Approved refunds will be processed within <strong>7-10 business days</strong> to the original payment method.
      </p>

      <h4>5. Shipping Costs</h4>
      <p>
        - Return shipping costs are the responsibility of the customer, unless the return is due to our error (e.g., wrong or defective item).
      </p>

      <h4>6. Need Help?</h4>
      <p>
        If you have any questions regarding returns or refunds, feel free to contact us at: <strong>support@digitalstore.com</strong>
      </p>
    </Container>
  );
};

export default ReturnPolicy;
