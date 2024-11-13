import type { ManifestMenuItem } from '@umbraco-cms/backoffice/extension-registry';
import { SUSTAINABILITY_OVERVIEW_ROOT_ENTITY_TYPE } from '../types';

const menuItem: ManifestMenuItem = {
  type: 'menuItem',
  alias: 'Sustainability.MenuItem.Overview',
  name: 'Overview Menu Item',
  weight: 2000,
  meta: {
    label: 'Overview',
    icon: 'icon-eco',
    entityType: SUSTAINABILITY_OVERVIEW_ROOT_ENTITY_TYPE,
    menus: ["Umb.Menu.Sustainability"],
  }
};

export const manifests = [menuItem];