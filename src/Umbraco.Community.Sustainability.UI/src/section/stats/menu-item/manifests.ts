import type { ManifestMenuItem } from '@umbraco-cms/backoffice/extension-registry';
import { SUSTAINABILITY_STATS_ROOT_ENTITY_TYPE } from '../types';

const menuItem: ManifestMenuItem = {
  type: 'menuItem',
  alias: 'Sustainability.MenuItem.Stats',
  name: 'Stats Menu Item',
  weight: 1000,
  meta: {
    label: 'Stats',
    icon: 'icon-chart',
    entityType: SUSTAINABILITY_STATS_ROOT_ENTITY_TYPE,
    menus: ["Umb.Menu.Sustainability"],
  }
};

export const manifests = [menuItem];