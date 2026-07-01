# Contact form API (Azure Functions)

Serverless HTTP endpoint that receives contact form submissions from the website and sends two emails via Google Workspace SMTP:

1. **Business notification** to `contact@brendamello.com` with the full enquiry details
2. **Customer confirmation** to the submitter when their preferred contact field contains a valid email address

Built with **Azure Functions v4** (.NET 10 isolated worker) on the **Consumption plan** (free tier eligible on Windows; Flex Consumption also supported).

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Azure Functions Core Tools v4](https://learn.microsoft.com/azure/azure-functions/functions-run-local) (for local testing)
- A Google Workspace account with SMTP enabled and an [App Password](https://support.google.com/accounts/answer/185833) (required when 2-Step Verification is on)

## Local setup

1. Copy the example settings file:

   ```bash
   cp api/ContactApi/local.settings.json.example api/ContactApi/local.settings.json
   ```

2. Edit `api/ContactApi/local.settings.json` and set `SMTP_PASSWORD` to your Google App Password.

3. Run the function locally:

   ```bash
   cd api/ContactApi
   func start
   ```

   The endpoint will be available at `http://localhost:7071/api/contact`.

4. Point the frontend at the local API (from the repo root):

   ```bash
   echo VITE_CONTACT_API_URL=http://localhost:7071 > .env.local
   npm run dev
   ```

## Configuration

Set these values in `local.settings.json` (local) or **Function App → Configuration → Application settings** (Azure):

| Setting | Description |
|---------|-------------|
| `SMTP_HOST` | Gmail SMTP host (`smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (`587` for STARTTLS) |
| `SMTP_USER` | Google Workspace email used to send mail |
| `SMTP_PASSWORD` | Google App Password (not your regular login password) |
| `BUSINESS_EMAIL` | Where enquiry notifications are delivered |
| `FROM_NAME` | Display name on outgoing emails |
| `ALLOWED_ORIGINS` | Comma-separated site origins allowed by CORS |

## Deploy to Azure (Consumption / free tier)

1. In the [Azure Portal](https://portal.azure.com), create a **Function App**:
   - Runtime: **.NET 10 (Isolated)**
   - Plan: **Consumption (Serverless)**
   - Region: Australia East (or nearest to your users)

2. Add the application settings listed above under **Configuration**.

3. Publish from your machine:

   ```bash
   cd api/ContactApi
   func azure functionapp publish <your-function-app-name>
   ```

   Or deploy via GitHub Actions / VS Code Azure extension.

4. Set the production frontend env var when building the site:

   ```bash
   VITE_CONTACT_API_URL=https://<your-function-app-name>.azurewebsites.net
   ```

   Add this in your Azure Web App settings, Vercel env vars, or `.env.production.local` before `npm run build`.

## API

**POST** `/api/contact`

```json
{
  "name": "Jane Smith",
  "contact": "jane@example.com",
  "service": "Bridal Package",
  "eventDate": "14 March 2026",
  "eventLocation": "Gold Coast",
  "message": "Looking for a trial and wedding day styling.",
  "language": "en"
}
```

**Responses**

- `200` – emails sent successfully
- `400` – validation error
- `500` – SMTP or server error

CORS preflight (`OPTIONS`) is supported for origins listed in `ALLOWED_ORIGINS`.

## Google Workspace SMTP notes

- Use port **587** with STARTTLS (configured by default).
- Create an App Password under Google Account → Security → App passwords.
- The sending address (`SMTP_USER`) should match your Workspace domain for best deliverability.
- If the customer enters a phone number or WhatsApp handle only, the business still receives the enquiry; the confirmation email is skipped.
