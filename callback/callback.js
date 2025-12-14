const items = ["Peenut Butter", "T-shirts", "Sanitizers", "Notebook", "Oats"];

function orderItems(items, callback) {
  // order items
  console.log(`Items ordered: [${items}]`);
  callback(null, "order001", 1000);
}

function proceedToPayment(err, orderId, amount) {
  // proceed to pay amount for orderId
  console.log(`Paying ${amount} for order no ${orderId}`);
}

orderItems(items, proceedToPayment);

// Arrow function approach with error handling

// Callback Hell
console.log(`\n..........Example of Nested Callbacks (Callback Hell)............\n`);
const items2 = ["Shirt", "Pant", "Shoes", "Socks"];

function processPayment(amount, callback) {
  console.log(`Payment of ${amount} is successful`);
  return callback(null, true);
}

function getEta(orderId, callback) {
  const deliveryDate = "2025-12-20 11:00:00 AM";
  console.log(
    `Expected delivery date for order ${orderId} is: ${deliveryDate}`
  );

  return callback(null, deliveryDate);
}

function sendEmail(orderId, deliveryDate, callback) {
  console.log(`Email confirmation sent successfully`);
  callback(null, true);
}
// Callback Hell starts
orderItems(items2, (error, orderId, amount) => {
  if (error) {
    throw new Error(`Unable to place order`);
  }

  console.log(`Paying ${amount} for order no ${orderId}`);
  processPayment(amount, (error, success) => {
    if (error) {
      throw new Error(`Payment unsuccessful`);
    }
    console.log(`Estimating delivery date & time`);
    getEta(orderId, (error, deliveryDate) => {
      if (error) {
        throw new Error(`Unable to fetch ETA details currently`);
      }

      console.log(`Sending email confirmation`);
      sendEmail(orderId, deliveryDate, (error, success) => {
        if (error) {
          throw new Error(`Unable to send email notification`);
        }
      });
    });
  });
});
