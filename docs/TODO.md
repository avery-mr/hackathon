# Hackathon Project Finder — Implementation TODO

This plan breaks the MVP into small, independently verifiable increments. Complete and commit one increment at a time. Keep `docs/requirements.md` as the source of truth.

## 1. Project initialization and “Hello World”

- [x] Scaffold a Vite app with React and TypeScript.
- [x] Replace the starter screen with a single “Hackathon Project Finder — Hello World” heading.
- [x] Add `dev`, `build`, `preview`, `lint`, and `typecheck` scripts.
- [x] Add a `.gitignore` that excludes dependencies, build output, local environment files, logs, and editor artifacts.
- [x] Run the app locally and verify the heading renders.
- [x] Run a production build and preview it locally.
- [ ] Security: commit the package lockfile, review installed packages, and ensure no secrets or credentials are present.
- [x] Documentation: add a README with prerequisites, installation, local development, build, and preview commands.

## 2. Deploy the “Hello World” build

- [ ] Choose and record a static hosting target; use GitHub Pages by default.
- [ ] Configure Vite's base path for the selected host.
- [ ] Add a deployment workflow that builds the app and publishes the generated static files.
- [ ] Deploy the Hello World version and verify its public URL in a private/incognito window.
- [ ] Security: give the deployment workflow only the permissions it needs and pin third-party workflow actions to reviewed versions.
- [ ] Documentation: add the deployment URL, hosting choice, and manual redeployment instructions to the README.

## 3. Add early CI quality checks

- [ ] Configure ESLint for React and TypeScript.
- [ ] Add a consistent formatter and a `format:check` script.
- [ ] Add a CI workflow for pull requests and the default branch.
- [ ] Make CI install from the lockfile, then run formatting, linting, type checking, and a production build.
- [ ] Enable dependency update alerts or an equivalent dependency review process.
- [ ] Verify CI passes on the current Hello World app.
- [ ] Security: add a dependency audit step with a documented policy for handling findings; do not expose secrets to untrusted pull-request code.
- [ ] Documentation: document every CI check and how to run the same checks locally.

## 4. Create the static application shell

- [ ] Add a page header with the product name and a placeholder active-user area.
- [ ] Add a main content region with a page title and “Propose a project” button.
- [ ] Add a responsive project-grid container.
- [ ] Add a simple footer or version marker.
- [ ] Verify the shell at narrow and wide viewport sizes.
- [ ] Security: use semantic React elements and text content; do not introduce raw HTML rendering.
- [ ] Documentation: record the initial component structure and styling approach.

## 5. Define mocked project data

- [ ] Create temporary TypeScript types for mocked project cards.
- [ ] Add three mocked projects, including one open project, one full project, and one project with no participants.
- [ ] Keep mocked data in a dedicated module rather than inside UI components.
- [ ] Render a temporary JSON or title-only list to confirm the data is connected.
- [ ] Security: keep all mock content non-sensitive and treat displayed strings as untrusted text.
- [ ] Documentation: describe the mock scenarios and note that they will later be replaced by the persisted domain model.

## 6. Build a project card with mocked data

- [ ] Create a `ProjectCard` component for one mocked project.
- [ ] Show its title, short description, skills, and participant capacity.
- [ ] Show an explicit “Open” or “Full” state.
- [ ] Show a placeholder state for “Your project.”
- [ ] Render all mocked projects in the responsive grid.
- [ ] Security: do not render descriptions or skill names through `dangerouslySetInnerHTML`.
- [ ] Documentation: document the component inputs and include a short manual verification checklist.

## 7. Build project details with mocked data

- [ ] Make each project card open a detail view or dialog.
- [ ] Show the full description, skills, capacity, and participant names.
- [ ] Show an explicit message for an empty participant roster.
- [ ] Add a clear close/back action and restore focus when closing.
- [ ] Add non-functional placeholders for join, switch, and leave actions.
- [ ] Security: ensure mocked links are not rendered as clickable URLs and dialogs cannot be dismissed into an invalid UI state.
- [ ] Documentation: document how project details open, close, and handle keyboard focus.

## 8. Test the mocked browsing UI

- [ ] Install and configure Vitest, React Testing Library, and user-event.
- [ ] Add a test setup file and a `test` script.
- [ ] Test that open and full project cards render the correct capacity state.
- [ ] Test that selecting a card opens the correct project details.
- [ ] Test that an empty roster displays its empty-state message.
- [ ] Add the test command to CI.
- [ ] Security: keep test fixtures synthetic and verify project strings render as text rather than executable markup.
- [ ] Documentation: document test commands, naming conventions, and where tests live.

## 9. Introduce the real domain model

- [ ] Add `Participant`, `Project`, and `AppState` TypeScript types from the PRD.
- [ ] Add a schema version constant.
- [ ] Replace mock-only fields with `participantIds` and derived participant counts.
- [ ] Create typed seed participants and projects that satisfy the real model.
- [ ] Add selectors for participant count, capacity state, roster names, and current membership.
- [ ] Security: use stable generated IDs, avoid predictable IDs as an authorization mechanism, and validate assumptions at state boundaries.
- [ ] Documentation: document the domain model, invariants, and derived fields.

## 10. Add in-memory application state

- [ ] Load typed seed data into top-level React state.
- [ ] Pass projects and participants to the existing browsing UI.
- [ ] Replace placeholder card and detail values with selector results.
- [ ] Add a simple reducer or state-action layer for future mutations.
- [ ] Confirm refresh still resets state at this stage.
- [ ] Security: centralize state changes so UI controls cannot bypass business rules.
- [ ] Documentation: document state ownership, action flow, and the temporary non-persistent behavior.

## 11. Implement participant name entry

- [ ] Show a name-entry screen when no participant is active.
- [ ] Add a controlled display-name input and continue button.
- [ ] Trim input and enforce the 2–40 character rule.
- [ ] Enforce case-insensitive name uniqueness.
- [ ] Create and activate a participant after valid submission.
- [ ] Show inline, plain-language validation messages.
- [ ] Show the active participant's name in the application header.
- [ ] Security: reject control-only input, render names as plain text, and enforce validation in the state layer as well as the form.
- [ ] Documentation: document entry rules, uniqueness behavior, and manual test cases.

## 12. Test participant entry

- [ ] Test minimum, maximum, blank, and overlong names.
- [ ] Test whitespace trimming.
- [ ] Test case-insensitive duplicate detection.
- [ ] Test successful participant creation and activation.
- [ ] Test that invalid input does not mutate state.
- [ ] Security: add adversarial test strings containing HTML-like text and control characters.
- [ ] Documentation: add the covered participant-entry cases to the testing notes.

## 13. Add participant switching

- [ ] Add a header action for changing the active participant.
- [ ] List existing local participants for selection.
- [ ] Allow creation of a new participant from the same flow.
- [ ] Update all “Your project” indicators when the active participant changes.
- [ ] Security: do not present local participant switching as authentication or identity verification.
- [ ] Documentation: explain the shared-browser identity limitation in the UI copy and README.

## 14. Add safe local-storage persistence

- [ ] Define one namespaced local-storage key.
- [ ] Add serialization and deserialization functions for `AppState`.
- [ ] Validate parsed data before using it.
- [ ] Restore valid saved state during startup.
- [ ] Save projects, participants, membership, and active participant after state changes.
- [ ] Fall back to seeded initial state when data is absent or malformed.
- [ ] Handle unavailable or quota-exceeded storage without crashing.
- [ ] Security: never use `eval`, never persist secrets, constrain parsed values, and ignore unknown or invalid fields.
- [ ] Documentation: document the storage key, schema version, reset behavior, privacy limitations, and recovery behavior.

## 15. Test persistence and recovery

- [ ] Test round-trip serialization of valid state.
- [ ] Test startup with no saved state.
- [ ] Test malformed JSON and structurally invalid state.
- [ ] Test an invalid active participant reference.
- [ ] Test duplicate memberships and over-capacity saved data are rejected or safely normalized.
- [ ] Test storage read and write failures.
- [ ] Security: include oversized and malicious-looking strings in boundary tests.
- [ ] Documentation: describe the recovery policy and schema migration expectations.

## 16. Implement joining a project

- [ ] Add a state action for joining a project.
- [ ] Permit joining only when the participant has no current project.
- [ ] Block joining a full project.
- [ ] Prevent duplicate membership.
- [ ] Connect the detail-view “Join project” button to the action.
- [ ] Update rosters, capacity labels, and “Your project” state immediately.
- [ ] Persist successful joins.
- [ ] Security: enforce all membership rules inside the state action, not only through disabled buttons.
- [ ] Documentation: document join preconditions, outcomes, and user-facing errors.

## 17. Test joining

- [ ] Test a successful join.
- [ ] Test joining a full project.
- [ ] Test joining while already assigned elsewhere.
- [ ] Test repeated join attempts.
- [ ] Test joining with missing participant or project IDs.
- [ ] Verify failed joins leave state unchanged.
- [ ] Security: test direct reducer/action calls that bypass the UI.
- [ ] Documentation: record join test coverage and remaining limitations.

## 18. Implement leaving a project

- [ ] Add a state action for leaving the active participant's project.
- [ ] Show “Leave project” only on the active participant's current project.
- [ ] Add a confirmation dialog.
- [ ] Remove the participant after confirmation and update the UI immediately.
- [ ] Keep projects whose rosters become empty.
- [ ] Persist successful leaves.
- [ ] Security: identify membership from state rather than trusting a project ID supplied by the UI.
- [ ] Documentation: document leave behavior, confirmation wording, and cancellation behavior.

## 19. Test leaving

- [ ] Test confirming a leave.
- [ ] Test cancelling a leave.
- [ ] Test leaving an empty or unrelated project is rejected.
- [ ] Test that the project remains after its last participant leaves.
- [ ] Verify failed leaves do not mutate state.
- [ ] Security: test stale and invalid membership references.
- [ ] Documentation: record leave test coverage.

## 20. Implement switching projects atomically

- [ ] Add a switch action that accepts the destination project.
- [ ] Verify the participant has a current project.
- [ ] Verify the destination exists and has capacity before changing either roster.
- [ ] Add a confirmation dialog naming both source and destination projects.
- [ ] Apply removal and addition in one state update.
- [ ] Connect “Switch to this project” to the new action.
- [ ] Persist only the completed state.
- [ ] Security: reject switching to the same project, invalid IDs, full projects, and stale source membership.
- [ ] Documentation: document switch invariants and atomic failure behavior.

## 21. Test switching

- [ ] Test a successful switch.
- [ ] Test cancellation.
- [ ] Test switching to a full project.
- [ ] Test switching to the current project.
- [ ] Test missing participant, source, and destination records.
- [ ] Verify every failed switch preserves both rosters.
- [ ] Security: test direct action calls with manipulated and stale state.
- [ ] Documentation: record switch test coverage.

## 22. Build the project proposal form

- [ ] Add a “Propose a project” view or dialog.
- [ ] Add fields for title, description, skills, and maximum team size.
- [ ] Use controlled fields with accessible labels and error associations.
- [ ] Add cancel and submit actions.
- [ ] Return focus to the trigger after closing.
- [ ] Security: set sensible input lengths and numeric bounds in both the UI and state layer.
- [ ] Documentation: document each field, constraint, and keyboard interaction.

## 23. Implement project proposal validation and creation

- [ ] Validate title length from 3–80 characters.
- [ ] Validate description length from 20–1,000 characters.
- [ ] Parse and normalize at least one skill from tags or comma-separated text.
- [ ] Validate maximum team size as a whole number from 1–20.
- [ ] Show inline validation without losing entered values.
- [ ] Generate a stable ID and ISO creation timestamp.
- [ ] Record `proposedByParticipantId`.
- [ ] Create the project with an empty roster without changing current membership.
- [ ] Reset and close the form after success, then persist the project.
- [ ] Security: trim values, cap skill count and skill length, and display all submitted content as plain text.
- [ ] Documentation: document normalization rules, limits, and creation behavior.

## 24. Test project proposals

- [ ] Test every field boundary and required-field rule.
- [ ] Test skill parsing, whitespace cleanup, duplicates, count limits, and length limits.
- [ ] Test successful creation and persistence.
- [ ] Test that creating a project does not join its proposer.
- [ ] Test that duplicate titles are allowed.
- [ ] Test that invalid submissions do not mutate state.
- [ ] Security: test HTML-like content, unusual Unicode, large input, and invalid numeric formats.
- [ ] Documentation: record proposal test coverage.

## 25. Add feedback and resilient error handling

- [ ] Add visible success feedback for create, join, leave, and switch actions.
- [ ] Add plain-language errors for rejected actions and storage failures.
- [ ] Disable controls when their actions cannot succeed.
- [ ] Ensure feedback is announced to assistive technology.
- [ ] Add a recoverable fallback UI for unexpected rendering errors.
- [ ] Security: keep internal stack traces and raw stored data out of user-facing messages.
- [ ] Documentation: document the error categories, fallback behavior, and troubleshooting steps.

## 26. Add end-to-end core-flow tests

- [ ] Configure a browser-based end-to-end test runner.
- [ ] Test first-time name entry through joining an open project.
- [ ] Test leaving and joining another project.
- [ ] Test the complete switch confirmation flow.
- [ ] Test proposing a project and restoring it after reload.
- [ ] Test recovery from corrupt local storage.
- [ ] Test the core flow at mobile and desktop viewport sizes.
- [ ] Run end-to-end tests in CI.
- [ ] Security: use only synthetic test data and ensure CI artifacts contain no environment secrets or sensitive browser state.
- [ ] Documentation: document local and CI end-to-end test commands and debugging instructions.

## 27. Accessibility, responsive design, and UX review

- [ ] Verify all core flows using only a keyboard.
- [ ] Verify focus order, visible focus, dialog focus trapping, and focus restoration.
- [ ] Verify labels, headings, status announcements, and error associations.
- [ ] Check text and control contrast against WCAG 2.1 AA expectations.
- [ ] Check project cards and forms at mobile, tablet, and desktop widths.
- [ ] Ensure full, current-project, and destructive states do not rely on color alone.
- [ ] Add automated accessibility checks for key views where practical.
- [ ] Security: verify external content cannot create links, scripts, or misleading hidden UI.
- [ ] Documentation: add an accessibility statement and list tested browsers and viewport sizes.

## 28. Security and dependency hardening

- [ ] Run dependency audit and address actionable findings.
- [ ] Remove unused dependencies and starter assets.
- [ ] Review local-storage parsing and every state-action boundary.
- [ ] Confirm no use of `dangerouslySetInnerHTML`, dynamic code execution, or embedded secrets.
- [ ] Add baseline static-host security headers where the hosting platform supports them.
- [ ] Confirm production source maps follow the project's disclosure policy.
- [ ] Review CI and deployment workflow permissions.
- [ ] Security: document that display names are not authenticated and local storage is user-editable, device-local data.
- [ ] Documentation: create a short security section covering threat assumptions, reporting, and known limitations.

## 29. Final acceptance and release

- [ ] Run formatting, linting, type checking, unit/component tests, end-to-end tests, dependency audit, and production build.
- [ ] Manually verify all 14 PRD acceptance criteria.
- [ ] Test a clean first visit, refresh, browser restart, and storage reset.
- [ ] Verify the production deployment on supported browsers and viewport sizes.
- [ ] Confirm the deployed version contains no test data beyond intentional seed projects.
- [ ] Tag or otherwise identify the MVP release.
- [ ] Security: perform a final secrets scan and verify production workflow permissions and dependency findings.
- [ ] Documentation: update the README with final setup, architecture, testing, deployment, data/privacy limitations, and known issues.
- [ ] Documentation: mark completed TODO items and link the released version to `docs/requirements.md`.
