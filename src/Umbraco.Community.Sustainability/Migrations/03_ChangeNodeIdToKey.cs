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

            if (ColumnExists(PageMetric.TableName, "NodeKey"))
            {
                Rename.Column("NodeId").OnTable(PageMetric.TableName).To("NodeKey").Do();
                Alter.Table(PageMetric.TableName).AlterColumn("NodeKey").AsGuid().Nullable().Do();
            }
            else
            {
                Logger.LogDebug("The column NodeKey already exists, skipping");
            }
        }
    }
}
