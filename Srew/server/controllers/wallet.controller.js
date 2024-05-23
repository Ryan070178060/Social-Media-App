const createHttpError = require("http-errors");
const { User } = require("../models/user.model");
const { Wallet } = require("../models/wallet.model");
const crypto = require("crypto");
const { client } = require("../services/paypal");
const paypal = require('@paypal/checkout-server-sdk');

module.exports.createWallet = async (userId, balance = 0) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, "user not found");
  }

  const wallet = new Wallet({
    user: userId,
    balance,
  });

  await wallet.save();
  return wallet.populate(
    "user",
    "first_name last_name username profile_img email contact_no"
  );
};

module.exports.updateBalance = async (userId, balance) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, "user not found");
  }

  let wallet = await Wallet.findOne({ user: userId }).populate(
    "user",
    "first_name last_name username profile_img email contact_no"
  );

  if (!wallet) {
    wallet = await this.createWallet(userId);
  }

  wallet.balance = wallet.balance + balance;

  await wallet.save();

  return wallet;
};

module.exports.pay = async (userId, amount) => {
  const wallet = await Wallet.findOne({ user: userId });

  if (!wallet) {
    throw createHttpError(404, "wallet not found");
  } else if (wallet.balance < amount) {
    throw createHttpError(400, "insufficient wallet balance");
  }

  let owner = await Wallet.findOne({ isOwner: true });
  if (!owner) {
    owner = new Wallet({ isOwner: true, balance: 0 });
    await owner.save();
  }

  wallet.balance = wallet.balance - amount;
  owner.balance = owner.balance + amount;

  await wallet.save();
  await owner.save();

  return true;
};

module.exports.refundCompetitionPayment = async (amount, userId) => {
  const wallet = await Wallet.findOne({ user: userId });

  if (!wallet) {
    throw createHttpError(404, "wallet not found");
  }

  let owner = await Wallet.findOne({ isOwner: true });
  if (!owner) {
    owner = new Wallet({ isOwner: true, balance: 0 });
    await owner.save();
  }

  wallet.balance = wallet.balance + amount;
  owner.balance = owner.balance - amount;

  await wallet.save();
  await owner.save();

  return wallet;
};

module.exports.getWalletInfo = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const wallet = await Wallet.findOne({ user: userId }).populate(
      "user",
      "first_name last_name username profile_img email contact_no"
    );

    if (!wallet) {
      return res.status(404).json({ message: "wallet not found" });
    }

    res.status(200).json({ data: wallet });
  } catch (e) {
    next(e);
  }
};

module.exports.createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: amount
        }
      }]
    });

    const order = await client().execute(request);
    res.status(200).json({ data: order.result });
  } catch (error) {
    console.log("Order error", error);
    res.status(500).json({ message: "error while creating order!" });
  }
};

module.exports.verifyPayment = async (req, res, next) => {
  try {
    const { orderID, userId, amount } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    const capture = await client().execute(request);

    if (capture.result.status === 'COMPLETED') {
      const wallet = await this.updateBalance(userId, amount);
      res.status(200).json({ message: "Payment verified successfully", data: wallet });
    } else {
      res.status(400).json({ message: "Payment not verified" });
    }
  } catch (e) {
   
    next(e);
  }
};
