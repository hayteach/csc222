# AI HTML Creation Guidelines ✅

**Purpose:** Tell the AI how to create new HTML files consistently and accessibly by using `template.html` as a guide. All generated HTML must follow accessibility best practices (WCAG 2.1 AA where feasible) and be ADA-compliant.

---

## 1. Use `template.html` as the canonical guide 🔧
- Always base new HTML on `template.html` — preserve its overall structure, meta tags, header, footer, CSS classes, and site-level scripts.  
- If a new page requires additional structure, extend the template semantically (don't break site-wide IDs or global nav).  
- Keep `<head>` metadata: `charset`, `viewport`, `title`, `meta description`, canonical link (when applicable).

## 2. Document language and meta ✅
- Ensure the top-level `<html>` has a `lang` attribute, e.g., `<html lang="en">`.
- Include `<meta name="viewport" content="width=device-width, initial-scale=1">` and `<meta charset="utf-8">`.

## 3. Semantic HTML & landmarks ✨
- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<section>`, `<article>`.  
- Provide a skip link at the top of the page: `<a class="skip-link" href="#main">Skip to main content</a>`.
- Use an H1 for the main page title (one per page) and follow with H2/H3 for subsections.

## 4. Images & media accessibility 🖼️
- Every image must have a meaningful `alt` attribute. If decorative, use `alt=""` and `aria-hidden="true"`.
- Provide captions and/or transcripts for audio/video and include `captions` or a link to a transcript.

## 5. Forms & interactive controls 🧭
- Every control must have an associated `<label>` or an accessible name (use `aria-label` or `aria-labelledby` when label is not possible).
- For error messages, use `aria-describedby` and an `aria-live` region to announce changes.
- Ensure keyboard focus order is logical and tab stops follow a natural reading order.

## 6. Keyboard & focus management ⌨️
- All functionality must be operable with keyboard only (Tab, Enter, Space, Arrow keys where relevant).
- Ensure focus indicators are visible (do not remove default outlines without a visible replacement).
- Manage focus for dynamic content (e.g., after opening dialogs set focus to the dialog and return focus when closed).

## 7. ARIA usage & roles 🏷️
- Use ARIA only to enhance semantics when native HTML is not sufficient. Prefer native semantic elements first.
- When used, include proper roles (e.g., `role="dialog"` with `aria-modal="true"`) and accessible names.

## 8. Color contrast & visuals 🎨
- Maintain a contrast ratio of at least 4.5:1 for normal text (3:1 for large text) between text and background.
- Do not rely on color alone to convey information. Use text, patterns, icons, or `aria` attributes as well.

## 9. Links & navigation 🔗
- Use meaningful link text (avoid "click here"). If opening a new window/tab, warn users (e.g., include visually-hidden text: `aria-label="opens in new window"`).
- Make sure navigation is consistent and accessible from all pages.

## 10. Tables & data presentation 📊
- Use `<th scope="col">` or `<th scope="row">` for table headers.
- Avoid complex nested tables for layout; use tables only for tabular data.

## 11. Testing & validation ✅
- Run automated accessibility checks: Axe, Lighthouse (Accessibility audit), or WAVE.
- Perform manual checks: keyboard-only navigation, and at least one screen reader test (VoiceOver on macOS or NVDA/JAWS on Windows).
- Validate HTML (e.g., W3C validator) and test responsive behavior.

## 12. AI-specific instructions for generation 🤖
- ALWAYS use `template.html` as the starting point. If `template.html` lacks a required accessibility feature, add it and note the change in the commit message.
- Add a short comment at the top of generated HTML noting which template was used and list accessibility features added, e.g.:
  <!-- Generated from template.html — accessibility: lang, skip-link, alt text, form labels, focus management -->
- Keep files minimal and focused: don't copy unrelated pages' content, but preserve site-wide structure and classes.
- When uncertain about wording for alt text, use concise, descriptive language (who/what/where/context).

## 13. Commit message guidance ✍️
- Use clear commit messages like: "Create X page from `template.html` — add WCAG fixes: skip-link, alt text, labels".

## 14. Quick Accessibility Checklist (before submitting) 📝
- [ ] Uses `template.html` structure
- [ ] `<html lang>` present
- [ ] Skip link present and visible on focus
- [ ] One `h1` and logical heading hierarchy
- [ ] All images have `alt` (or empty alt for decorative)
- [ ] Forms have labels and accessible error handling
- [ ] Keyboard navigation works
- [ ] ARIA used only when necessary and correctly
- [ ] Contrast meets WCAG ratios
- [ ] Automated and manual accessibility checks passed

---

If you need stricter requirements (WCAG 2.1 AAA or additional tooling), update this file and the project README so the team knows the expectation.

Thank you — this helps keep the site usable for everyone. ✅
