import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import stripe from "stripe";

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    // Calculate Amount using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);

      return acc + product.offerPrice * item.quantity;
    }, 0);

    // Add tax 2%
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
    });

    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Place Order stripe : /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;

    const { origin } = req.headers;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    let productData = [];

    // Calculate Amount using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      productData.push({
        name: product.name,
        quantity: item.quantity,
        price: product.offerPrice,
      });
      return acc + product.offerPrice * item.quantity;
    }, 0);

    // Add tax 2%
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "Online",
    });

    // stripe gateway initialization
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    // create line items for stripe

    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
        },
        quantity: item.quantity,
      };
    });

    // create stripe session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Stripe webhook to verify payment :/stripe
export const stripeWebhooks = async (req, res) => {
  // stripe gateway initialization
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error}`);
  }

  // handle event

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // getting session mtadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId, userId } = session.data[0].metadata;
      // mark payment as payed

      await Order.findByIdAndUpdate(orderId, { isPayed: true });
      // clear cart
      await User.findByIdAndUpdate(userId, { cartItems: {} });
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // getting session mtadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId } = session.data[0].metadata;

      await Order.findByIdAndDelete(orderId);

      break;
    }
    default:
      console.error(`Unhandeled event type ${event.type}`);
      break;
  }

  res.json({ receievd: true });
};

// update orderStatus : /api/order/status

export const updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    await Order.findByIdAndUpdate(id, { status: status });
    res.json({ success: true, message: "Order Status Updated" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// get Orders by User ID : /api/order/user

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPayed: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    return res.json({ success: true, orders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//  Get all orders (For Seller/Admin) /api/order/seller

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPayed: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    return res.json({ success: true, orders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
