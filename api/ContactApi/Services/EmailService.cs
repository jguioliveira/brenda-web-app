using System.Net.Mail;
using System.Text.RegularExpressions;
using ContactApi.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using MimeKit;

namespace ContactApi.Services;

public sealed partial class EmailService
{
    private static readonly Regex EmailRegex = EmailPattern();

    private readonly string _smtpHost;
    private readonly int _smtpPort;
    private readonly string _smtpUser;
    private readonly string _smtpPassword;
    private readonly string _businessEmail;
    private readonly string _fromName;
    private readonly ILogger<EmailService> _logger;

    public EmailService(ILogger<EmailService> logger)
    {
        _logger = logger;
        _smtpHost = GetRequiredSetting("SMTP_HOST");
        _smtpPort = int.TryParse(Environment.GetEnvironmentVariable("SMTP_PORT"), out var port) ? port : 587;
        _smtpUser = GetRequiredSetting("SMTP_USER");
        _smtpPassword = GetRequiredSetting("SMTP_PASSWORD");
        _businessEmail = Environment.GetEnvironmentVariable("BUSINESS_EMAIL") ?? _smtpUser;
        _fromName = Environment.GetEnvironmentVariable("FROM_NAME") ?? "Brenda Mello Beauty";
    }

    public async Task SendInquiryEmailsAsync(InquiryRequest inquiry, CancellationToken cancellationToken = default)
    {
        await SendEmailAsync(
            _businessEmail,
            $"New enquiry: {inquiry.Service}",
            BuildBusinessBody(inquiry),
            cancellationToken);

        if (TryGetCustomerEmail(inquiry.Contact, out var customerEmail))
        {
            var (subject, body) = BuildConfirmationEmail(inquiry);
            await SendEmailAsync(customerEmail, subject, body, cancellationToken);
        }
        else
        {
            _logger.LogInformation(
                "Skipping customer confirmation email because no valid email was found in contact field.");
        }
    }

    private async Task SendEmailAsync(
        string to,
        string subject,
        string body,
        CancellationToken cancellationToken)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_fromName, _smtpUser));
        message.To.Add(MailboxAddress.Parse(to));
        message.Subject = subject;
        message.Body = new TextPart("plain") { Text = body };

        using var client = new MailKit.Net.Smtp.SmtpClient();
        await client.ConnectAsync(_smtpHost, _smtpPort, SecureSocketOptions.StartTls, cancellationToken);
        await client.AuthenticateAsync(_smtpUser, _smtpPassword, cancellationToken);
        await client.SendAsync(message, cancellationToken);
        await client.DisconnectAsync(true, cancellationToken);

        _logger.LogInformation("Sent email to {Recipient} with subject {Subject}", to, subject);
    }

    private static string BuildBusinessBody(InquiryRequest inquiry)
    {
        var lines = new List<string>
        {
            "A new enquiry was submitted via the website contact form.",
            "",
            $"Name: {inquiry.Name}",
            $"Contact: {inquiry.Contact}",
            $"Service: {inquiry.Service}",
            $"Event date: {inquiry.EventDate}",
            $"Event location: {inquiry.EventLocation}",
            $"Language: {inquiry.Language}",
        };

        if (!string.IsNullOrWhiteSpace(inquiry.Message))
        {
            lines.Add("");
            lines.Add("Message:");
            lines.Add(inquiry.Message.Trim());
        }

        return string.Join(Environment.NewLine, lines);
    }

    private static (string Subject, string Body) BuildConfirmationEmail(InquiryRequest inquiry)
    {
        return inquiry.Language switch
        {
            "pt" => (
                "Recebemos a sua mensagem - Brenda Mello Beauty",
                BuildConfirmationBody(
                    inquiry,
                    greeting: $"Olá {inquiry.Name},",
                    intro: "Obrigada pelo seu contacto. Recebi a sua mensagem e responderei em 1–2 dias úteis.",
                    detailsTitle: "Resumo da sua consulta:",
                    closing: "Com carinho,\nBrenda Mello Beauty")),
            "es" => (
                "Recibimos tu mensaje - Brenda Mello Beauty",
                BuildConfirmationBody(
                    inquiry,
                    greeting: $"Hola {inquiry.Name},",
                    intro: "Gracias por contactarme. Recibí tu mensaje y responderé en 1–2 días hábiles.",
                    detailsTitle: "Resumen de tu consulta:",
                    closing: "Con cariño,\nBrenda Mello Beauty")),
            _ => (
                "We received your enquiry - Brenda Mello Beauty",
                BuildConfirmationBody(
                    inquiry,
                    greeting: $"Hi {inquiry.Name},",
                    intro: "Thank you for reaching out. I have received your message and will reply within 1–2 business days.",
                    detailsTitle: "Your enquiry summary:",
                    closing: "Warm regards,\nBrenda Mello Beauty")),
        };
    }

    private static string BuildConfirmationBody(
        InquiryRequest inquiry,
        string greeting,
        string intro,
        string detailsTitle,
        string closing)
    {
        var lines = new List<string>
        {
            greeting,
            "",
            intro,
            "",
            detailsTitle,
            $"Service: {inquiry.Service}",
            $"Event date: {inquiry.EventDate}",
            $"Event location: {inquiry.EventLocation}",
        };

        if (!string.IsNullOrWhiteSpace(inquiry.Message))
        {
            lines.Add("");
            lines.Add($"Message: {inquiry.Message.Trim()}");
        }

        lines.Add("");
        lines.Add(closing);

        return string.Join(Environment.NewLine, lines);
    }

    private static bool TryGetCustomerEmail(string contact, out string email)
    {
        email = "";

        var match = EmailRegex.Match(contact);
        if (!match.Success)
        {
            return false;
        }

        var candidate = match.Value.Trim();
        return MailAddress.TryCreate(candidate, out _) && (email = candidate).Length > 0;
    }

    private static string GetRequiredSetting(string name)
    {
        var value = Environment.GetEnvironmentVariable(name);
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new InvalidOperationException($"Missing required configuration: {name}");
        }

        return value;
    }

    [GeneratedRegex(@"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}", RegexOptions.IgnoreCase)]
    private static partial Regex EmailPattern();
}
