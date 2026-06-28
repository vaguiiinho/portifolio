# Admin Project Management Ideas

This note captures the admin project-management improvements discussed for the portfolio dashboard.

## Implemented Now

- Projects shown as a table in the admin area.
- Per-row actions for details, edit, and delete.
- Public area remains list-only, without management actions.
- Search and filters in the admin table.
- Visual sorting in the admin table.
- Persistent `featured` flag with quick toggle from the admin table.

## Useful Next Steps

1. Manual ordering
- Allow reordering projects so the public gallery can follow a curated sequence.

2. Undo after delete
- Replace the current destructive confirmation with a short undo window.

3. Mobile table fallback
- Switch the admin table to stacked cards on smaller screens.

## Notes

- Search currently matches title, description, and technologies.
- Featured sorting is persisted and used by the public listing order.
