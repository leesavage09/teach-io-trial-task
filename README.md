## Getting Started

clone the repo
git clone https://github.com/leesavage09/teach-io-trial-task.git

Install dependance with
npm install

copy example.env to .env and configure the variables
MONGO_URI & STRIPE_SK are required

start dev server with
npm run dev

setup ngrok to forward to local testing url

setup stripe account to forward webhooks to {ngrok url}/api/stripe/webhooks

create a payment in the Stripe dashboard
https://dashboard.stripe.com/test/payments/new
