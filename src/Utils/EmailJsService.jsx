const serviceVerificationId = import.meta.env
  .VITE_EMAILJS_VERIFICATION_SERVICE_ID;
const templateVerificationId = import.meta.env
  .VITE_EMAILJS_VERIFICATION_TEMPLATE_ID;
const serviceInviteId = import.meta.env.VITE_EMAILJS_INVITE_SERVICE_ID;
const templateInviteId = import.meta.env.VITE_EMAILJS_INVITE_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export {
  serviceInviteId,
  templateInviteId,
  serviceVerificationId,
  templateVerificationId,
  publicKey,
};
