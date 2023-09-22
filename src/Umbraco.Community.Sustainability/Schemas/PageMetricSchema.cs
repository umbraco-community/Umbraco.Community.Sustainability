using NPoco;
using Umbraco.Cms.Infrastructure.Persistence.DatabaseAnnotations;

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

        [Column("NodeId")]
        public int NodeId { get; set; }

        [Column("RequestedBy")]
        public string RequestedBy { get; set; }

        [Column("RequestDate")]
        public DateTime RequestDate { get; set; }

        [Column("PageWeight")]
        public decimal PageWeight { get; set; }

        [SpecialDbType(SpecialDbTypes.NVARCHARMAX)]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string? PageData { get; set; }
    }
}
