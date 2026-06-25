import { manifests as workspaceManifests } from "./workspace/manifests.js";
import { manifests as menuItemManifests } from "./menu-item/manifests.js";

export const manifests = [...workspaceManifests, ...menuItemManifests];
