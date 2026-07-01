namespace ContactApi.Models;

public sealed class InquiryRequest
{
    public string Name { get; set; } = "";
    public string Contact { get; set; } = "";
    public string Service { get; set; } = "";
    public string EventDate { get; set; } = "";
    public string EventLocation { get; set; } = "";
    public string Message { get; set; } = "";
    public string Language { get; set; } = "en";

    public bool IsValid(out string error)
    {
        if (string.IsNullOrWhiteSpace(Name))
        {
            error = "Name is required.";
            return false;
        }

        if (string.IsNullOrWhiteSpace(Contact))
        {
            error = "Contact is required.";
            return false;
        }

        if (string.IsNullOrWhiteSpace(Service))
        {
            error = "Service is required.";
            return false;
        }

        if (string.IsNullOrWhiteSpace(EventDate))
        {
            error = "Event date is required.";
            return false;
        }

        if (string.IsNullOrWhiteSpace(EventLocation))
        {
            error = "Event location is required.";
            return false;
        }

        if (Name.Length > 200 || Contact.Length > 200 || Service.Length > 200 ||
            EventDate.Length > 100 || EventLocation.Length > 300 || Message.Length > 5000)
        {
            error = "One or more fields exceed the maximum length.";
            return false;
        }

        error = "";
        return true;
    }
}
