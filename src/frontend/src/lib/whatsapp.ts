/**
 * WhatsApp helper utility for building wa.me links with pre-filled messages
 */

interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  city?: string;
}

/**
 * Builds a WhatsApp wa.me URL with a pre-filled message containing contact form data
 * @param phoneNumber - WhatsApp number in international format (e.g., 918829921156)
 * @param formData - Contact form data to include in the message
 * @returns Complete wa.me URL with URL-encoded message
 */
export function buildWhatsAppUrl(phoneNumber: string, formData: ContactFormData): string {
  // Build the message with line breaks
  let message = `Hello! I'm interested in becoming a Financial Advisor with Axis Max Life.\n\n`;
  message += `*Full Name:* ${formData.fullName}\n`;
  message += `*Phone Number:* ${formData.phoneNumber}\n`;
  
  if (formData.city && formData.city.trim()) {
    message += `*City:* ${formData.city}\n`;
  }
  
  message += `\nPlease contact me with more information about the training program.`;

  // URL encode the message
  const encodedMessage = encodeURIComponent(message);

  // Build the complete wa.me URL
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Attempts to open WhatsApp in a new window/tab
 * @param url - The wa.me URL to open
 * @returns true if the window was opened successfully, false if blocked
 */
export function openWhatsApp(url: string): boolean {
  try {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    return newWindow !== null && newWindow !== undefined;
  } catch (error) {
    console.error('Failed to open WhatsApp:', error);
    return false;
  }
}
