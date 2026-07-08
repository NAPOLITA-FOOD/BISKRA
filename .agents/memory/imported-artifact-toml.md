---
name: Imported artifact with pre-existing artifact.toml
description: What to do when a GitHub-imported project already has artifacts/<slug>/.replit-artifact/artifact.toml but the artifact isn't registered (listArtifacts() returns empty, WorkflowsRestart says the workflow doesn't exist).
---

When a project is imported from GitHub with an `artifacts/<slug>/` directory and a valid `.replit-artifact/artifact.toml` already checked in, the artifact is often not actually registered in the system yet (`listArtifacts()` returns `[]`). `createArtifact()` cannot be used to register it because it refuses to run when `artifacts/<slug>/` already exists (`ARTIFACT_DIR_EXISTS`), and there is no separate "register/import existing artifact" callback.

**Workaround:** read the service definition out of `artifact.toml` (dev command, `localPort`, required env vars like `PORT`/`BASE_PATH`) and call `configureWorkflow` directly with a workflow named `artifacts/<slug>: <service-name>`, embedding the required env vars inline in the command, e.g. `PORT=24531 BASE_PATH=/ pnpm --filter @workspace/<slug> run dev`. Then use the normal `WorkflowsRestart` tool.

**Why:** this keeps the workflow name consistent with the artifact-owned convention so future restarts use the documented `artifacts/<slug>: web` pattern, even though `createArtifact`/`listArtifacts` don't know about it.

**Caveat:** the `Screenshot` tool's `appPreview` source still fails with "Artifact not found" in this state since the artifact isn't registered with the platform's artifact registry (only the workflow exists). Use `Screenshot` with `externalUrl` against `https://$REPLIT_DEV_DOMAIN/` instead to verify the app visually.
