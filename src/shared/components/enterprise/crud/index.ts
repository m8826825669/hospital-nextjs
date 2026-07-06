// src/shared/components/enterprise/crud/index.ts
// A2.3 Enterprise CRUD Framework exports.
//
// Backward compatibility rule:
// Do not export names that already exist in the enterprise/workspace API.
// Many HMS modules already import EntityHeader, EntityDrawer, EntityInfoGrid,
// EntityWorkspaceDrawer, EntityWorkspaceTabs, EntityMetaItem, etc. from
// "@/shared/components/enterprise". To avoid breaking those modules, conflicting
// CRUD components are exported with explicit Crud* aliases.

export * from "./entity-delete-dialog";
export { EntityDrawer as CrudEntityDrawer } from "./entity-drawer";
export * from "./entity-empty-state";
export * from "./entity-form-section";
export * from "./entity-loading-state";
export {
  EntityPage,
  EntityHeader as CrudEntityHeader,
  EntitySection,
  EntitySectionHeader,
  EntitySectionBody,
} from "./entity-page";
export * from "./entity-stats";
export * from "./entity-status-badge";
export * from "./entity-tabs";
export * from "./entity-toolbar";
