---
applyTo: '**'
---

When generating code or instructed to refactor, please follow these best practices in addition to any feature-specific requirements:

- **Minimize re-renders**: continue to prioritize memoization, stable callbacks, and derived state to keep React components performant. inspect props/state flows when moving logic.
- **Plan the breakpoints**: prefer a series of small, reviewable commits over one massive rewrite. each step should compile and pass tests independently.
- **Right-size modules**: if a file grows beyond ~250-300 lines or mixes unrelated concerns, split cohesive chunks into utilities, hooks, or subcomponents inside the same domain folder.
- **Codify shared logic**: eliminate duplication by extracting pure helpers in `src/utils/` or shared `src/hooks` when logic appears in multiple screens.
- **Keep APIs stable**: avoid breaking public `src/hooks` signatures unless the user request explicitly allows it. if a breaking change is unavoidable, document it clearly and update all call sites.
- **Mind dependencies**: prefer MUI and existing shared components before introducing new libraries. get approval before adding new runtime dependencies.
- **Type safety first**: tighten TypeScript types while refactoring—replace `any` with discriminated unions or generics, and keep generated GraphQL types as the source of truth.
- **Separate types and interfaces**: extract TypeScript types and interfaces into dedicated `.types.ts` files co-located with their implementation. this improves code organization, reusability, and makes the codebase more maintainable. for hooks, use `<hook-name>.types.ts`; for components, use `<component-name>.types.ts`; for shared types, place in `src/types/`.
- **Improve readability**: prioritize clear naming, linear control flow, and early returns. remove dead code, commented-out blocks, and excessive inline logic.
- **Accessibility & UX**: ensure refactors retain aria labels, keyboard support, focus management, and visual hierarchy. never regress accessibility for cosmetic improvements.
- **Error handling**: centralize repeated try/catch or notification patterns and ensure user-facing errors remain informative.
- **Performance guardrails**: profile critical paths when altering data fetching, memoization, or rendering heuristics. confirm pagination/storage hooks still meet SSP-1119 behavior.
- **Documentation hooks**: when extracting major utilities or patterns, add or update JSDoc and inline comments where it aids future maintainers without duplicating obvious logic.
- **Verification**: finish with `npm run ltfb` (or the smallest relevant subset) to ensure lint, typecheck, format, build, and tests stay green. include evidence in the PR description or summary.
