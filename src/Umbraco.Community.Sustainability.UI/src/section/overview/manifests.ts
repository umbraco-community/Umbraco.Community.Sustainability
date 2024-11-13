import { manifests as menuItems } from './menu-item/manifests';
import { manifests as workspaceManifests } from './workspace/manifests';

export const manifests = [
  ...workspaceManifests,
  ...menuItems
]