## Getting Started

Clone the repository\
```git clone https://github.com/leesavage09/teach-io-trial-task.git```

Install dependance\
```npm install```

copy example.env to .env and configure the variables\
MONGO_URI & STRIPE_SK are required, an error will be thrown if they are missing

start dev server
```npm run dev```

setup [https://ngrok.com/](https://ngrok.com/) to forward to localhost

go to [https://dashboard.stripe.com/test/webhooks](https://dashboard.stripe.com/test/webhooks) and forward webhooks to ```{ngrok url}/api/stripe/webhooks```

create a payment in the Stripe dashboard
https://dashboard.stripe.com/test/payments/new

payments will appear in the webapp and they can be refunded
