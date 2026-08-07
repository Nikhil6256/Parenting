import Razorpay from 'razorpay';

/**
 * Returns a fresh Razorpay instance using runtime env vars.
 * Using a factory function instead of a module-level singleton ensures
 * the correct keys are always picked up at request time on Vercel.
 */
export function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.');
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export default getRazorpay;
