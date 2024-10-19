const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json()); 

const plans = [
  {
    plan_id: "price_1QA7IGJoWb85sJGHCDaS9CTS",
    plan_name: "3-mon",
    duration: "month"
  },
  {
    plan_id: "price_1QAFGiJoWb85sJGHwJwW38or",
    plan_name: "annual",
    duration: "year"
  }
];

app.post("/create-subs", async (req, res) => {
  const { plan_name, duration, email } = req.body; // Get email from request body
  const plan = plans.find(_plan => _plan.plan_name === plan_name && _plan.duration === duration); // Find the plan

  if (!plan) {
    return res.status(400).json({ message: "Plan not found" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.plan_id,
          quantity: 1
        }
      ],
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:5173/fail",
      customer_email: email // Use dynamic email from request
    });

    return res.status(200).json({ session });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});


app.post("/save-payment", async(req,res)=>{
  const {session_id} =  req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const subs = await stripe.subs.retrieve(session.subs);

    if(session.status === "complete"){
      console.log({session,subs})
      return res.status(200).json({session,subs})
    }
  } catch (error) {
    console.log(error)
  }
})



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
