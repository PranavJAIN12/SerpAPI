const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE", ]
}
app.options("", cors(corsConfig))
app.use(cors(corsConfig));
// app.use(express.json());

app.get('/', (req,res)=>{
  res.send("hello")
})

const endpointSecret =
  "whsec_5f89a0b9d495c973e42b5e6aafcf3efe52f5e1cc3b31f8d290c351e2ee3fdfa1";

app.use("/webhook", express.raw({ type: "application/json" }));

// Use JSON body parser for all other routes
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

const plans = [
  {
    plan_id: "price_1QA7IGJoWb85sJGHCDaS9CTS",
    plan_name: "3-mon",
    duration: "month",
  },
  {
    plan_id: "price_1QAFGiJoWb85sJGHwJwW38or",
    plan_name: "annual",
    duration: "year",
  },
];


app.post("/create-subs", async (req, res) => {
  const { plan_name, duration, email } = req.body; // Get email from request body
  const plan = plans.find(
    (_plan) => _plan.plan_name === plan_name && _plan.duration === duration
  ); // Find the plan

  if (!plan) {
    return res.status(400).json({ message: "Plan not found" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan.plan_id,
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:5173/fail",
      customer_email: email, // Use dynamic email from request
    });

    return res.status(200).json({ session });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/prod-payment", async(req,res)=>{
  const{title,price} = req.body
  try {
    const session = await stripe.checkout.sessions.create({
      
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: 'usd', 
            product_data: {
              name: title,
            },
            unit_amount: Math.round(parseFloat(price.replace(/[^0-9.-]+/g, '')) * 100), 
          },
          quantity: 1,
        },
      ],
      mode:'payment',
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:5173/fail",
      // customer_email: email, 
    });

    return res.status(200).json({ session });
  } catch (error) {
    console.error(error);
    console.log("error creating product payment")
    return res.status(500).json({ error: "Something went wrong" });
  }
})

// app.post("/save-payment", async (req, res) => {
//   const { session_id } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.retrieve(session_id);
//     const subs = await stripe.subscriptions.retrieve(session.subscription);

//     if (session.status === "complete") {
//       console.log({ session, subs });
//       return res.status(200).json({ session, subs });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });


app.post("/save-payment", async (req, res) => {
  const { session_id } = req.body;
  
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const subs = await stripe.subscriptions.retrieve(session.subscription);
    
    if (session.status === "complete") {
      const { customer_email } = session;
      const startDate = new Date(subs.start_date * 1000).toISOString();
      const endDate = new Date(subs.current_period_end * 1000).toISOString();
      const planName = subs.items.data[0].price.nickname || subs.items.data[0].price.id;

      const { data, error } = await supabase.from('subscriptions').insert([
        {
          id: uuidv4(),
          user_id: session.customer_email, 
          plan: planName,
          start_date: startDate,
          end_date: endDate,
          renewed: false,
        },
      ]);

      if (error) {
        console.error('Error saving subscription:', error);
        return res.status(500).json({ error: 'Failed to save subscription.' });
      }

      console.log('Subscription saved:', data);
      return res.status(200).json({ session, subs });
    }
  } catch (error) {
    console.error('Error handling payment:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post("/webhook", (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("Webhook received:", event);

  // Handle the event
  switch (event.type) {
    case "customer.created":
      const customer = event.data.object;
      console.log("Customer created:", customer.id);
      // Add your logic here
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      console.log("Payment method attached:", paymentMethod.id);
      // Add your logic here
      break;
    case "customer.updated":
      const updatedCustomer = event.data.object;
      console.log("Customer updated:", updatedCustomer.id);
      // Add your logic here
      break;
    case "invoiceitem.created":
      const invoiceItem = event.data.object;
      console.log("Invoice item created:", invoiceItem.id);
      // Add your logic here
      break;
    case "invoice.created":
      const createdInvoice = event.data.object;
      console.log("Invoice created:", createdInvoice.id);
      // Add your logic here
      break;
    case "charge.succeeded":
      const charge = event.data.object;
      console.log("Charge succeeded:", charge.id);
      // Add your logic here
      break;
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("Payment intent succeeded:", paymentIntent.id);
      // Add your logic here
      break;
    case "payment_intent.created":
      const createdPaymentIntent = event.data.object;
      console.log("Payment intent created:", createdPaymentIntent.id);
      // Add your logic here
      break;
    case "invoice.updated":
      const updatedInvoice = event.data.object;
      console.log("Invoice updated:", updatedInvoice.id);
      // Add your logic here
      break;
    case "invoice.paid":
      const paidInvoice = event.data.object;
      console.log("Invoice paid:", paidInvoice.id);
      // Add your logic here
      break;
    case "invoice.payment_succeeded":
      const successfulInvoice = event.data.object;
      console.log("Invoice payment succeeded:", successfulInvoice.id);
      // Add your logic here
      break;
    case "invoice.finalized":
      const finalizedInvoice = event.data.object;
      console.log("Invoice finalized:", finalizedInvoice.id);
      // Add your logic here
      break;
    case "customer.subscription.updated":
      const subscription = event.data.object;
      console.log("Subscription updated:", subscription.id);
      // Add your logic here
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.json({ received: true });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);
// console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
// console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);
// console.log('STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET);

//https://test2-zeta-swart.vercel.app/