/**
 * Creates the FAQ section
 * @returns {HTMLElement} The FAQs page element
 */
export function createFaqSection() {
  const faqsPage = document.createElement("div");
  faqsPage.className = "product-tab-page";
  faqsPage.style.display = "none";
  const faqsTitle = document.createElement("h3");
  faqsTitle.textContent = "Frequently Asked Questions";
  faqsPage.appendChild(faqsTitle);
  const faqList = document.createElement("div");
  faqList.className = "product-faq-list";

  const faqs = [
    {
      q: "How does E.CO ensure ethical and sustainable shipping?",
      a: "At E.CO, we are committed to minimizing our environmental impact. All of our shipments are carbon offset, meaning we invest in projects that reduce greenhouse gas emissions to compensate for the carbon produced during transportation. Additionally, we utilize packaging made from 100% recycled, non-toxic, and biodegradable materials to ensure your order arrives safely and sustainably.",
    },
    {
      q: "What is your handling time?",
      a: "Our team works diligently to process and prepare your order for shipment. Please allow 1-3 business days for handling before your order is dispatched. You will receive a confirmation email with tracking information as soon as your package is on its way.",
    },
    {
      q: "What are your shipping options and costs?",
      a: "We offer a range of shipping options to meet your needs. Shipping costs are calculated at checkout based on your location, the weight of your items, and the selected shipping method. We strive to offer competitive rates while maintaining our commitment to ethical and sustainable practices.",
    },
    {
      q: "Can I track my order?",
      a: "Yes! Once your order has been shipped, you will receive an email with a tracking number and a link to the carrier's website. Please allow up to 24 hours for the tracking information to update.",
    },
    {
      q: "What should I do if my package is delayed or lost?",
      a: "We understand that shipping delays can be frustrating. If your tracking information has not updated for several days, or if your package is marked as delivered but you have not received it, please contact our customer support team at ",
      mail: "support@e.co",
      mailText: "support@e.co",
      mailSuffix:
        ". We will work with the carrier to resolve the issue as quickly as possible.",
    },
  ];

  faqs.forEach((faq, idx) => {
    const item = document.createElement("div");
    item.className = "product-faq-item";
    const q = document.createElement("strong");
    q.textContent = `${idx + 1}. ${faq.q}`;
    item.appendChild(q);
    const a = document.createElement("p");
    if (faq.mail) {
      a.appendChild(document.createTextNode(faq.a));
      const mailLink = document.createElement("a");
      mailLink.href = `mailto:${faq.mail}`;
      mailLink.textContent = faq.mailText;
      a.appendChild(mailLink);
      a.appendChild(document.createTextNode(faq.mailSuffix));
    } else {
      a.textContent = faq.a;
    }
    item.appendChild(a);
    faqList.appendChild(item);
  });
  faqsPage.appendChild(faqList);

  return faqsPage;
}
