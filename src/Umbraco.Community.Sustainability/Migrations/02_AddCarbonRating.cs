using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.Sustainability.Schemas;

namespace Umbraco.Community.Sustainability.Migrations
{
    public class AddCarbonRating : AsyncMigrationBase
    {
        public AddCarbonRating(IMigrationContext context) : base(context)
        {
        }

        protected override Task MigrateAsync()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "AddCarbonRating");

            if (ColumnExists(PageMetric.TableName, "CarbonRating") == false)
            {
                Alter.Table(PageMetric.TableName).AddColumn("CarbonRating").AsString().Nullable().Do();
            }
            else
            {
                Logger.LogDebug("The column CarbonRating already exists, skipping");
            }

            return Task.CompletedTask;
        }
    }
}
