using Newtonsoft.Json;
using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;
using Umbraco.Community.Sustainability.Models;

namespace Umbraco.Community.Sustainability.Schemas
{
    [TableName(TableName)]
    [PrimaryKey("Id", AutoIncrement = true)]
    [ExplicitColumns]
    public class PageMetric
    {
        public const string TableName = "umbPageMetrics";

        [PrimaryKeyColumn(AutoIncrement = true, IdentitySeed = 1)]
        [Column("Id")]
        public int Id { get; set; }

        [Column("NodeKey")]
        public Guid? NodeKey { get; set; }

        [Ignore]
        public string? NodeName { get; set; }

        [Column("RequestedBy")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? RequestedBy { get; set; }

        [Column("RequestDate")]
        public DateTime RequestDate { get; set; }

        [Column("TotalSize")]
        public decimal TotalSize { get; set; }

        [Column("TotalEmissions")]
        public decimal TotalEmissions { get; set; }

        [Column("CarbonRating")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? CarbonRating { get; set; }

        [Column("PageData")]
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NTEXT)]
        public string? PageData { get; set; }

        [Ignore]
        public SustainabilityResponse? PageDataObject
        {
            get
            {
                if (!string.IsNullOrEmpty(PageData))
                {
                    return JsonConvert.DeserializeObject<SustainabilityResponse>(PageData);
                }

                return null;
            }
            set
            {
                if (value != null)
                {
                    PageData = JsonConvert.SerializeObject(value);
                }
                else
                {
                    PageData = null; // Or any default value you prefer
                }
            }
        }
    }
}
