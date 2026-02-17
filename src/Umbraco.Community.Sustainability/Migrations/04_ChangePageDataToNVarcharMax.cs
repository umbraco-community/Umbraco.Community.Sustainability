using Microsoft.Extensions.Logging;
using NPoco;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.Sustainability.Schemas;

namespace Umbraco.Community.Sustainability.Migrations
{
    public class ChangePageDataToNVarcharMax : AsyncMigrationBase
    {
        public ChangePageDataToNVarcharMax(IMigrationContext context) : base(context)
        {
        }

        protected override Task MigrateAsync()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "ChangePageDataToNVarcharMax");

            // SQLite doesn't need this - text is already unlimited
            if (DatabaseType == DatabaseType.SQLite)
            {
                Logger.LogDebug("SQLite detected - text columns are already unlimited, skipping");
                return Task.CompletedTask;
            }

            if (!ColumnExists(PageMetric.TableName, "PageData"))
            {
                Logger.LogDebug("The column PageData does not exist, skipping");
                return Task.CompletedTask;
            }

            // For SQL Server: change NTEXT to NVARCHAR(MAX)
            Alter.Table(PageMetric.TableName)
                .AlterColumn("PageData")
                .AsString(int.MaxValue)
                .Nullable()
                .Do();

            Logger.LogDebug("Changed PageData column from NTEXT to NVARCHAR(MAX)");

            return Task.CompletedTask;
        }
    }
}
