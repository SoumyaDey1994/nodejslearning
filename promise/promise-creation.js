const createOrder = () => {
  return new Promise((resolve, reject) => {
    resolve("order001");
  });
};

const proceedToPayment = (orderId) => {
  return new Promise((resolve, reject) => {
    resolve({ orderId, amount: 1000 });
  });
};

const notifyUser = ({ orderId, amount }) => {
  return new Promise((resolve, reject) => {
    resolve({ orderId, amount, msg: "successful" });
  });
};

createOrder()
  .then((orderId) => {
    console.log(`Order ${orderId} created successfully`);
    return orderId;
  })
  .then((orderId) => proceedToPayment(orderId))
  .then((orderInfo) => {
    console.log(`Payment of INR ${orderInfo.amount} is successful`);
    return notifyUser({ orderId: orderInfo.orderId, amount: orderInfo.amount });
  })
  .then((data) => {
    console.log(`Your order with id: ${data.orderId} is successfully placed`);
    console.log(`Payment of amount INR ${data.amount} received successfully`);
  })
  .catch((err) => console.log(`Something went wrong: `, err));
