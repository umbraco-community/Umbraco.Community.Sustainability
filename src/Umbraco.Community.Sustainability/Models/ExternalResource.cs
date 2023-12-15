namespace Umbraco.Community.Sustainability.Models
{
    public class ExternalResource
    {
        public string? Url { get; set; }
        public decimal Size { get; set; } = 0;

        public ExternalResource() { }

        public ExternalResource(string url, decimal size)
        {
            Url = url;
            Size = size;
        }

        private decimal GetResourceSize(string resourceUrl)
        {
            long pageSize = 0;
            try
            {
                using (HttpClient resourceClient = new HttpClient())
                {
                    byte[] resourceData = resourceClient.GetByteArrayAsync(resourceUrl).Result;
                    pageSize = resourceData.Length;
                }
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Error fetching resource '{resourceUrl}': {ex.Message}");
            }

            return pageSize;
        }
    }
}
