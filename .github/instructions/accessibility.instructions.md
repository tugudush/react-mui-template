---
applyTo: '**'
---

# Accessibility Guidelines

This document provides accessibility (a11y) standards and practical guidance for contributors to this repository. It focuses on producing inclusive, keyboard-navigable, screen-reader-friendly web UI components and pages using React, MUI, and Jotai.

Follow these rules when adding or changing UI, forms, navigation, or content.

## Quick Principles

- Use semantic HTML first. Native elements (button, input, label, nav, main, header, footer) provide built-in a11y.
- Ensure keyboard accessibility: every interactive control must be reachable and operable with keyboard only (Tab, Shift+Tab, Enter/Space, Arrow keys when appropriate).
- Manage focus: set logical focus order; move focus to dialogs or newly shown content; restore focus after closing modals.
- Prefer ARIA only when semantic HTML cannot express the relationship/role.
- Respect user preferences: support reduced motion and system color-scheme.
- Test with automated tools and manual checks (keyboard, screen reader).

## Project-specific rules

- Use MUI components where possible — they include accessible defaults — but verify the output for your use case (labels, roles, focus behavior).
- Keep forms accessible:
  - Every input must have an associated label. Use `<label for>` or wrap the input in a label element.
  - For composed controls (e.g., custom selects), ensure correct `role`, `aria-labelledby` / `aria-label`, and keyboard support.
  - Provide clear inline error messages and tie them to inputs using `aria-describedby`.
- Buttons and clickable elements:
  - Use `<button>` for actions whenever possible (not `<div>` or `<span>`).
  - If a non-button element is necessary, add `role="button"`, keyboard handlers, and `tabIndex={0}` and ensure accessible name.
- Images and icons:
  - Decorative images: use empty alt (`alt=""`).
  - Meaningful images: provide descriptive `alt` text.
  - Icons used as standalone controls need an accessible label (`aria-label` or visually-hidden text).
- Color and contrast:
  - Ensure text and UI element contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large text). Use MUI theme tokens for consistent palettes.
  - Never rely on color alone to convey information. Add text or icons to communicate state.
- Focus styles:
  - Preserve visible focus outlines. If customizing focus, follow the site's design tokens and ensure >= 3px ring or other clear indicator.
- Headings and structure:
  - Use a single `<h1>` per page and maintain a logical heading order (h1 -> h2 -> h3...).

## ARIA guidance (use sparingly)

- Prefer native semantics. Add ARIA only when necessary.
- Common attributes:
  - `aria-hidden="true"` for decorative elements that should be ignored by assistive tech.
  - `aria-labelledby` to reference visible labels.
  - `aria-describedby` to associate helper or error text with a control.
  - `role="dialog"` combined with `aria-modal="true"` for modals; programmatically move focus to the dialog and trap focus inside.
- Avoid `aria-*` that conflicts with native roles.

## Keyboard & Focus Management

- All interactive widgets must be reachable by Tab and operate with Enter/Space (and Arrow keys where expected).
- For menus, listboxes, and custom widgets, implement roving tabindex or use an accessible pattern.
- When opening a dialog, set focus to the first meaningful element inside and restore focus to the element that opened it after closing.
- When showing content dynamically (e.g., error summary, success message), ensure the message is announced (use `role="status"` or live regions like `aria-live="polite"`).

## Motion & Reduced Motion

- Respect `prefers-reduced-motion`. Avoid large translation/scale animations for users who prefer reduced motion. Use CSS `@media (prefers-reduced-motion: reduce)`.

## Forms and Validation

- Inline validation should be programmatic: update `aria-invalid` on invalid inputs and use `aria-describedby` pointing to the error message element.
- For complex validation (server-side), present a summary at the top with links to each invalid field (anchor or `document.getElementById(...).focus()`).

## Testing and Tooling

- Add automated checks to PRs where possible:
  - Include `eslint-plugin-jsx-a11y` rules in the project; fix or justify rule violations in PRs.
  - Run accessibility linters locally with `npm run ltf` (project linting task) prior to opening PRs.
  - Use Accessibility testing libraries in unit/e2e tests: `@testing-library/react`, `jest-axe` / `vitest-axe` for component/a11y assertions.
- Manual testing:
  - Keyboard-only navigation across pages and dialogs.
  - Screen reader smoke tests (VoiceOver on macOS, NVDA or Narrator on Windows) for critical flows (forms, modal dialogs, navigation).
  - Color contrast checks using tools like Lighthouse, Axe, or contrast checkers.

## CI / PR Guidance

- Every PR that changes UI must include:
  - A short note on any accessibility changes made.
  - Results of automated linting/a11y checks.
  - If accessibility regressions are introduced, they must be justified and accompanied by an accessibility plan.

## Checklist for UI PRs (use in PR description)

- [ ] Semantic HTML used where possible
- [ ] Keyboard navigation verified
- [ ] Focus order and focus trapping (for dialogs) implemented & tested
- [ ] All form inputs have visible labels and programmatic associations
- [ ] Error states announced and linked to inputs
- [ ] Images/icons have appropriate alt text or aria-hidden
- [ ] Color contrast meets WCAG AA
- [ ] prefer-reduced-motion respected
- [ ] ESLint a11y rules pass or documented exception
- [ ] Unit tests or axe checks were added/updated

## Examples / Common Patterns

- Accessible button (preferred):

  <button type="button">Save</button>

- Labelled input:

  <label htmlFor="email">Email</label>
  <input id="email" name="email" type="email" />

- Error association:

<input id="username" aria-describedby="username-error" aria-invalid="true" />
<div id="username-error">Username is required</div>

- Dialog pattern (outline):
  - Add `role="dialog"` and `aria-modal="true"` on dialog container
  - Move focus into dialog on open and trap focus
  - Restore focus on close

## Resources

- WCAG 2.1: https://www.w3.org/TR/WCAG21/
- ARIA Authoring Practices: https://www.w3.org/TR/wai-aria-practices-1.2/
- axe DevTools: https://www.deque.com/axe/
- Lighthouse Accessibility: https://developer.chrome.com/docs/lighthouse/overview/
- eslint-plugin-jsx-a11y: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y

## Where to add more

If you add major UI patterns (complex form, new widgets), please add a short accessibility note under `.github/instructions/` or in the component's README explaining how the pattern is accessible and which tests exist.

---

Small, practical accessibility improvements are easier to review than large, sweeping changes. Aim for incremental improvements and include tests and notes in PRs.
