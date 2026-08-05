import Razorpay from 'razorpay';

function getRazorpayInstance() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
  });
}

const razorpay = getRazorpayInstance();

export default razorpay;
