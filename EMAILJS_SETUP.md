# EmailJS Setup Instructions

To enable the feedback functionality, you need to set up EmailJS:

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (200 emails/month)

## Step 2: Create Email Service
1. Go to Email Services
2. Add new service (Gmail recommended)
3. Connect your Gmail account
4. Note down the **Service ID**

## Step 3: Create Email Template
1. Go to Email Templates
2. Create new template with these variables:
   - `{{from_name}}` - sender name
   - `{{feedback}}` - the feedback message
   - `{{app_version}}` - app version
   - `{{timestamp}}` - when sent
   - `{{to_email}}` - your email (tfqnet@gmail.com)

Template example:
```
New feedback from Nak Makan Apa app:

From: {{from_name}}
Version: {{app_version}}
Time: {{timestamp}}

Message:
{{feedback}}

---
This message was sent from the Nak Makan Apa app.
```

4. Note down the **Template ID**

## Step 4: Get Public Key
1. Go to Account > API Keys
2. Copy your **Public Key**

## Step 5: Update App.jsx
Replace these placeholders in the `sendFeedback` function:
- `YOUR_SERVICE_ID` with your Service ID
- `YOUR_TEMPLATE_ID` with your Template ID  
- `YOUR_PUBLIC_KEY` with your Public Key

## Step 6: Test
1. Build and deploy the app
2. Go to About page and send a test feedback
3. Check your email (tfqnet@gmail.com)

That's it! Users can now send feedback directly from the app.
