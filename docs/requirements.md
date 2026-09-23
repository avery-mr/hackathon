# Hackathon Project Finder — Product Requirements Document

## 1. Product summary

Hackathon Project Finder is a lightweight web app that helps participants discover project ideas, see who is working on each project, join a team, leave or switch teams, and propose new projects.

The MVP is a client-side React application intended for a single shared browser or individual demonstrations. Data is stored in the browser's local storage; it is not synchronized between devices or participants.

## 2. Problem statement

During hackathons, participants often struggle to quickly find interesting projects, understand which teams need help, and organize themselves. Project information is commonly scattered across conversations, chat threads, or physical boards.

The app provides one place to:

- Browse available coding projects.
- Understand each project's goal, technologies, and team capacity.
- See who has joined each project.
- Join, leave, or switch projects.
- Propose new ideas that others can join.

## 3. Goals

- Let a new participant get started by entering only a display name.
- Make projects easy to scan and compare.
- Make team membership clear and easy to change.
- Prevent a participant from joining more than one project at a time.
- Prevent teams from exceeding their stated size limit.
- Preserve app data across browser refreshes.

## 4. Non-goals

The MVP will not include:

- User accounts, passwords, or identity verification.
- A shared backend or synchronization across browsers and devices.
- Join-request approval or team-owner moderation.
- Chat, comments, notifications, or direct messaging.
- Project editing, deletion, archival, or ownership controls.
- Repository, file, or submission management.
- Hackathon scheduling, judging, or voting.

## 5. Target users

### Hackathon participant

A participant wants to quickly discover ideas, find a team with available capacity, understand who is already involved, or publish an idea for others to join.

No separate organizer or administrator role is required for the MVP.

## 6. Core user journeys

### 6.1 Enter the app

1. The participant opens the app.
2. The app asks for a display name.
3. The participant enters a valid name and continues.
4. The app remembers the name on future visits in the same browser.

### 6.2 Browse and inspect projects

1. The participant sees all projects as cards.
2. Each card summarizes the project and its current team capacity.
3. The participant opens a card to view full details and the participant roster.

### 6.3 Join a project

1. A participant who is not currently on a team opens a project with capacity.
2. The participant selects **Join project**.
3. The app adds the participant immediately and updates the project count.

### 6.4 Leave a project

1. A participant views their current project.
2. The participant selects **Leave project**.
3. After confirmation, the app removes them from the project.

### 6.5 Switch projects

1. A participant who already belongs to one project selects **Switch to this project** on another project.
2. The app explains that switching will remove them from their current project.
3. After confirmation, the app moves the participant to the new project as one atomic action.

### 6.6 Propose a project

1. The participant selects **Propose a project**.
2. The participant enters the required project information.
3. After validation, the app creates and displays the project.
4. Creating a project does not automatically join the creator; they may join it separately, subject to the normal one-project rule.

## 7. Functional requirements

### FR-1: Participant entry

- The app must require a display name before showing the main project experience.
- A display name must be between 2 and 40 characters after trimming whitespace.
- The app must store the participant record and active participant ID in local storage.
- The app must allow the current participant to change to another locally stored participant or enter a new name.
- Names must be unique within local data, compared case-insensitively.
- The app must show the active participant's name in the main interface.

### FR-2: Project list

- The main view must display all projects as cards.
- Each card must show:
  - Project title.
  - Short description.
  - Desired skills or technologies.
  - Current participant count and maximum team size.
  - A clear **Open** or **Full** capacity state.
  - Whether the active participant is currently on the project.
- Projects must remain visible when full.
- The empty state must explain that no projects exist and offer an action to propose one.
- The MVP should include seed projects on first launch so the browsing experience can be evaluated immediately.

### FR-3: Project details

- A participant must be able to open a project from its card.
- The detail view must show:
  - Title.
  - Full description.
  - Desired skills or technologies.
  - Current participant count and maximum team size.
  - Display names of all current participants.
  - The action available to the active participant: join, switch, leave, or unavailable because the project is full.
- A project with no participants must show an explicit empty-team message.

### FR-4: Join a project

- A participant who has no current project may immediately join any project with available capacity.
- Joining must update the participant roster and count without a page reload.
- Joining must be blocked when the project is full.
- Joining must be blocked if the participant already belongs to another project; the app must offer the switch flow instead.
- Repeated join actions must not create duplicate membership.

### FR-5: Leave a project

- A participant may leave their current project at any time.
- The app must ask for confirmation before removing the participant.
- Leaving must update the roster and count without a page reload.
- Leaving must not delete the project, including when its roster becomes empty.

### FR-6: Switch projects

- A participant may switch directly from their current project to another project with capacity.
- The app must identify the project they will leave and the project they will join before asking for confirmation.
- A successful switch must remove the participant from the old roster and add them to the new roster as one state update.
- If the destination is full, the switch must not alter either project.
- Cancelling the confirmation must leave membership unchanged.

### FR-7: Propose a project

- The proposal form must collect:
  - Title: required, 3–80 characters.
  - Description: required, 20–1,000 characters.
  - Desired skills or technologies: at least one required; entered as tags or a comma-separated list.
  - Maximum team size: required whole number from 1–20.
- The form must show validation messages next to invalid fields.
- A valid submission must create the project, persist it, close or reset the form, and make the new project visible immediately.
- Project titles do not need to be unique.
- The app must record the proposing participant and creation time for data integrity, even if they are not displayed in the MVP.

### FR-8: Persistence

- Projects, participants, active participant, and memberships must persist in local storage.
- The app must restore valid saved state after a refresh or browser restart.
- The app must fall back to a safe initial state if saved data is missing or malformed.
- Membership must have one source of truth so participant counts cannot diverge from rosters.
- Clearing browser storage may reset all app data; this limitation must be acceptable for the MVP.

### FR-9: Feedback and error handling

- The app must provide visible feedback after creating, joining, leaving, or switching projects.
- Actions must be disabled while they cannot be completed, such as joining a full project.
- Validation and storage errors must be communicated in plain language.
- An error must not leave membership partially updated.

## 8. Business rules

1. A participant may belong to zero or one project.
2. A project may have zero participants.
3. A project's participant count is derived from its membership roster.
4. A project is full when its participant count equals its maximum team size.
5. Membership cannot exceed the project's maximum team size.
6. Proposing a project does not change the participant's current membership.
7. Any active participant may join any non-full project; approval is not required.
8. Seed projects behave the same as participant-created projects.

## 9. Data model

### Participant

- `id`: stable unique identifier.
- `displayName`: trimmed participant name.
- `createdAt`: ISO timestamp.

### Project

- `id`: stable unique identifier.
- `title`: project name.
- `description`: project summary and goal.
- `skills`: list of desired skills or technologies.
- `maxTeamSize`: maximum participant count.
- `participantIds`: list of participant IDs.
- `proposedByParticipantId`: ID of the participant who submitted the idea.
- `createdAt`: ISO timestamp.

### App state

- `schemaVersion`: saved-data schema version.
- `activeParticipantId`: participant currently using the app.
- `participants`: participant collection.
- `projects`: project collection.

## 10. UX requirements

- The primary project list must work at mobile, tablet, and desktop widths.
- Cards must use a consistent visual hierarchy and make capacity easy to scan.
- The active participant's current project must be visually distinguishable.
- Primary actions must use clear labels such as **Join project**, **Switch to this project**, and **Leave project**.
- Destructive or membership-changing actions must not rely on color alone.
- Forms and dialogs must support keyboard navigation.
- Interactive controls must have visible focus states and accessible labels.
- Text and controls should meet WCAG 2.1 AA contrast expectations.

## 11. Technical constraints

- The app must use React, TypeScript, and Vite.
- The MVP must run entirely in the browser without a backend.
- Browser local storage is the persistence mechanism.
- State updates must enforce membership and capacity rules in application logic, not only in the UI.
- TypeScript types must represent the persisted data model.
- Saved data should include a schema version to support future migrations.

## 12. Acceptance criteria

The MVP is complete when:

1. A first-time visitor can enter a valid display name and reach the project list.
2. Refreshing the page restores the active participant and saved projects.
3. The visitor can browse seeded and newly proposed projects as cards.
4. Opening a project shows its full description, skills, capacity, and participant names.
5. A participant with no project can join a non-full project.
6. A participant cannot join two projects simultaneously.
7. A participant can confirm a switch and is moved between projects without duplicate or partial membership.
8. A participant can cancel a switch without changing membership.
9. A participant can leave their current project after confirmation.
10. A full project cannot accept another participant.
11. A valid proposal creates a project that remains after refresh.
12. Invalid proposal fields show actionable validation messages and do not create a project.
13. Core entry, browsing, detail, proposal, and membership flows are usable with a keyboard.
14. Corrupt or unavailable saved data does not prevent the app from starting.

## 13. Success indicators

For a hackathon demo or usability test:

- A new participant can enter the app and join a project in under one minute.
- A participant can identify project capacity and desired skills without opening every project.
- Test participants complete join, leave, switch, and proposal flows without facilitator help.
- No tested flow creates duplicate membership or exceeds team capacity.

## 14. Future considerations

- Shared real-time backend and multi-device synchronization.
- Authenticated accounts and hackathon access controls.
- Search, filtering, sorting, and skill matching.
- Project owners and join approval.
- Project editing, archival, and deletion.
- Team chat and contact links.
- Repository and demo links.
- Organizer dashboard, announcements, judging, and voting.
