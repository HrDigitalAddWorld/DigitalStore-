import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button, ListGroup } from "react-bootstrap";

const faqResponses = {
  "return": `Our Return Policy:
1. Items can be returned within 7 days of delivery.
2. Product must be unused and in original packaging.
3. Include original invoice and accessories.
4. Damaged or used products are not eligible for return.
5. Initiate return from 'My Orders' or contact support.
6. Return pickup will be scheduled within 2–3 days.`,

  "refund": `Refund Policy:
1. Refunds are processed after item inspection.
2. It may take 7-10 working days to reflect in your account.
3. Refunds are credited via original payment method.
4. In case of COD orders, refund is made via bank transfer.
5. You’ll receive a confirmation email after processing.`,

  "shipping": `Shipping Info:
1. Orders are shipped within 2-3 working days.
2. You will get an email with tracking details.
3. Delivery partners: Delhivery, Bluedart, Ekart etc.
4. Free shipping for orders above ₹499.
5. Shipping charges apply for remote locations.`,

  "delivery": `Delivery Details:
1. Standard delivery time: 4–7 working days.
2. Remote areas may take longer.
3. Delivery not available on Sundays or national holidays.
4. Contactless delivery is available.
5. Track your order in 'My Orders' section.`,

  "payment": `Payment Options:
1. Credit/Debit Cards (Visa, Mastercard, RuPay).
2. UPI (Google Pay, PhonePe, Paytm, etc.).
3. Net Banking for all major banks.
4. Wallets like Amazon Pay, Paytm Wallet.
5. COD available in selected pin codes.`,

  "offer": `Offers & Discounts:
1. Visit homepage banners for ongoing sales.
2. Signup to receive exclusive coupon codes.
3. Festival offers are updated regularly.
4. Cashback available via select wallets.
5. Use "FIRST10" to get 10% off on first order.`,

  "warranty": `Warranty Info:
1. Most electronics have brand warranty (6–12 months).
2. Warranty card must be preserved for claims.
3. Brand service center will assist you directly.
4. We do not provide extended warranty currently.
5. Contact brand for software/hardware issues.`,

  "cancel": `Order Cancellation:
1. Orders can be cancelled before they are shipped.
2. Go to 'My Orders' → Cancel Order.
3. Once shipped, cancellation is not allowed.
4. Refunds are processed immediately for prepaid orders.
5. You’ll receive SMS & email updates on cancellation.`,

  "support": `Customer Support:
1. Email: support@digitalstore.com
2. Phone: +91 7300004094 (10AM – 6PM, Mon–Sat)
3. Chat: Available on website from bottom right.
4. Response time: Within 24 hours on email.
5. FAQs also available on our website.`,

  "track": `Tracking Your Order:
1. Login to your account.
2. Go to 'My Orders' → Click on the order.
3. Track ID and courier name will be shown.
4. You’ll get SMS & email when item is out for delivery.
5. If tracking is not available, wait for 24 hrs post shipment.`,

  "account": `Account Info:
1. You can register or login from the top-right button.
2. Forgot password? Use 'Forgot Password' to reset.
3. Customers, sellers and admins have different portals.
4. You can update your details from 'My Profile'.
5. Always logout if using public device.`,

  "login": "Click the Login button on the top-right of the page to access your account.",

  "register": "Use 'Create Account' on login page to register as a customer, seller or admin.",

  "product": "Browse categories or use search bar to explore products. Each product has detailed info, price, and offers listed.",

  "cart": "To place an order, add items to your cart and click on the cart icon to proceed with payment."
};

const FaqChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const messagesEndRef = useRef(null);

  const handleAsk = (e) => {
    e.preventDefault();
    const userMsg = question.trim();
    if (!userMsg) return;

    const lower = userMsg.toLowerCase();
    let reply = "❓ Sorry, I didn’t understand that. Please try asking about shipping, refund, offers, warranty, etc.";

    for (const keyword in faqResponses) {
      if (lower.includes(keyword)) {
        reply = faqResponses[keyword];
        break;
      }
    }

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userMsg },
      { from: "bot", text: reply },
    ]);
    setQuestion("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container className="my-5">
      <h2 className="mb-4">Ask Your Questions</h2>
      <Form onSubmit={handleAsk}>
        <Form.Control
          type="text"
          placeholder="Type a question like 'What is your refund policy?'"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-2"
        />
        <Button type="submit" variant="primary">Ask</Button>
      </Form>

      <ListGroup className="mt-4">
        {messages.map((msg, idx) => (
          <ListGroup.Item
            key={idx}
            className={msg.from === "user" ? "text-end bg-light" : "text-start bg-white"}
          >
            <strong>{msg.from === "user" ? "You" : "Support Bot"}:</strong>
            <br />
            <pre style={{ whiteSpace: "pre-wrap", marginBottom: 0 }}>{msg.text}</pre>
          </ListGroup.Item>
        ))}
        <div ref={messagesEndRef} />
      </ListGroup>
    </Container>
  );
};

export default FaqChatBot;
