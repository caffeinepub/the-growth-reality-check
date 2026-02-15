# Specification

## Summary
**Goal:** Make the Contact Us form submit action open a WhatsApp chat to the owner with a pre-filled message containing the user’s submitted details.

**Planned changes:**
- Update the Contact Us form submit/Register button behavior to build a `https://wa.me/918829921156?text=<urlencoded_message>` link containing Full Name, Phone Number, and City (if provided).
- URL-encode the WhatsApp message so special characters, spaces, and newlines do not break the link.
- Replace the current “received your information” confirmation-only flow with a WhatsApp open action after successful validation.
- Add a visible fallback (link/button with the same wa.me URL) and guidance when the automatic WhatsApp open is blocked (e.g., popup blocked), while keeping validation rules the same (full name required, phone required/validated, city optional).

**User-visible outcome:** After filling the Contact Us form and pressing Submit/Register, the user is taken to WhatsApp with a pre-filled message to the owner number; if the automatic open is blocked, they see a clear manual link/button to open WhatsApp.
