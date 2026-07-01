using System.Net;
using System.Text.Json;
using ContactApi.Models;
using ContactApi.Services;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace ContactApi;

public sealed class ContactFunction
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
    };

    private readonly EmailService _emailService;
    private readonly ILogger<ContactFunction> _logger;
    private readonly HashSet<string> _allowedOrigins;

    public ContactFunction(EmailService emailService, ILogger<ContactFunction> logger)
    {
        _emailService = emailService;
        _logger = logger;

        var origins = Environment.GetEnvironmentVariable("ALLOWED_ORIGINS") ??
                      "http://localhost:5173,https://brendamello.com,https://www.brendamello.com";
        _allowedOrigins = origins
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(NormalizeOrigin)
            .ToHashSet(StringComparer.OrdinalIgnoreCase);
    }

    [Function("SubmitInquiry")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", "options", Route = "contact")]
        HttpRequestData req,
        FunctionContext context)
    {
        if (string.Equals(req.Method, "OPTIONS", StringComparison.OrdinalIgnoreCase))
        {
            return CreateCorsResponse(req, HttpStatusCode.NoContent);
        }

        try
        {
            var inquiry = await JsonSerializer.DeserializeAsync<InquiryRequest>(
                req.Body,
                JsonOptions,
                context.CancellationToken);

            if (inquiry is null)
            {
                return await CreateJsonResponse(req, HttpStatusCode.BadRequest, new { error = "Invalid request body." });
            }

            if (!inquiry.IsValid(out var validationError))
            {
                return await CreateJsonResponse(req, HttpStatusCode.BadRequest, new { error = validationError });
            }

            await _emailService.SendInquiryEmailsAsync(inquiry, context.CancellationToken);
            return await CreateJsonResponse(req, HttpStatusCode.OK, new { ok = true });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to process contact inquiry.");
            return await CreateJsonResponse(req, HttpStatusCode.InternalServerError, new
            {
                error = "Something went wrong sending your message. Please try again later.",
            });
        }
    }

    private HttpResponseData CreateCorsResponse(HttpRequestData req, HttpStatusCode statusCode)
    {
        var response = req.CreateResponse(statusCode);
        ApplyCorsHeaders(req, response);
        return response;
    }

    private async Task<HttpResponseData> CreateJsonResponse(HttpRequestData req, HttpStatusCode statusCode, object payload)
    {
        var response = req.CreateResponse(statusCode);
        ApplyCorsHeaders(req, response);
        await response.WriteAsJsonAsync(payload);
        return response;
    }

    private void ApplyCorsHeaders(HttpRequestData req, HttpResponseData response)
    {
        if (!req.Headers.TryGetValues("Origin", out var originValues))
        {
            return;
        }

        var origin = NormalizeOrigin(originValues.FirstOrDefault() ?? "");
        if (!_allowedOrigins.Contains(origin))
        {
            return;
        }

        response.Headers.Add("Access-Control-Allow-Origin", origin);
        response.Headers.Add("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.Headers.Add("Access-Control-Allow-Headers", "Content-Type");
        response.Headers.Add("Vary", "Origin");
    }

    private static string NormalizeOrigin(string origin)
    {
        return origin.Trim().TrimEnd('/');
    }
}
