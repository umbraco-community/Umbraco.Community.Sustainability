using Microsoft.Extensions.Logging;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Community.Sustainability.Schemas;

namespace Umbraco.Community.Sustainability.Migrations
{
    public class ChangeNodeIdToNodeKey : MigrationBase
    {
        public ChangeNodeIdToNodeKey(IMigrationContext context) : base(context)
        {
        }

        protected override void Migrate()
        {
            Logger.LogDebug("Running migration {MigrationStep}", "ChangeNodeIdToNodeKey");

            if (ColumnExists(PageMetric.TableName, "NodeId"))
            {
                Alter.Table(PageMetric.TableName).AddColumn("NodeKey").AsGuid().Nullable().Do();

                Database.Execute($@"UPDATE {PageMetric.TableName} SET NodeKey = {Cms.Core.Constants.DatabaseSchema.Tables.Node}.uniqueId
FROM {Cms.Core.Constants.DatabaseSchema.Tables.Node}
INNER JOIN {PageMetric.TableName} ON {Cms.Core.Constants.DatabaseSchema.Tables.Node}.id = {PageMetric.TableName}.NodeId");

                Delete.Column("NodeId").FromTable(PageMetric.TableName).Do();
            }
            else
            {
                Logger.LogDebug("The column NodeKey already exists, skipping");
            }
        }
    }
}
