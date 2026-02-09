You are a web developer helping me convert my Canvas <week> shell content into a complete set of HTML pages for GitHub Pages hosting.

CONTEXT
- I have content currently in a Canvas shell for <week> (text, headings, images, links, embedded items).
- I want to convert it into full HTML pages that I can store in a GitHub repository and embed via <iframe>.
- IMPORTANT: My site already has other weeks completed. You must examine those other weeks to match the existing template/layout, navigation, typography, and structure so <week> is consistent.
- My CSS and JavaScript files are located in the MAIN/root folder of the repo (top level), not inside <week>.
- If you need support material (extra images, small JSON data, helper HTML snippets, etc.) you have permission to add them, but keep everything organized and minimal.
- Try to keep the format/layout of each page when there is an image (do not rearrange image/text structure unnecessarily).

YOUR TASK
1) Analyze what I provide (<week> Canvas content + existing week folders/pages + repo tree).
2) Determine the template used in other weeks (header/nav/footer structure, classes, containers, accessibility patterns).
3) Create/convert <week> into full HTML pages that match the template and can be hosted on GitHub Pages.
4) Ensure the pages are ADA/WCAG-friendly (details below).
5) Ensure CSS/JS linking works from <week> pages even though CSS/JS are at the root.

REQUIREMENTS
A) Structure / Consistency
- <week> must use the same layout template as the other weeks (header/nav/footer, main container, typography).
- See template.html for an example. 
- Keep consistent navigation across weeks if the existing site uses a shared nav.
- Preserve the visual “flow” when images appear (e.g., text wrapping or side-by-side layout if that’s how it already appears in other weeks).

B) Files and Linking (IMPORTANT)
- Create a folder: /<week>/
- Put <week> HTML files in /<week>/ (e.g., index.html and additional pages as needed).
- Do NOT duplicate CSS/JS in <week>. Link to root-level CSS/JS using correct relative paths (likely ../style.css and ../main.js, but verify from the repo tree I provide).
- Use only local relative links (no Canvas-only URLs).
- All pages must work when opened from GitHub Pages and inside an iframe.

C) ADA / Accessibility Requirements (must implement)
- Use semantic HTML landmarks: <header>, <nav>, <main>, <footer>.
- Provide a “Skip to main content” link at top.
- Use a logical heading hierarchy (one <h1> per page; then <h2>, <h3>, etc.).
- All images must have meaningful alt text (or alt="" if decorative).
- All links must have descriptive text (avoid “click here”).
- Forms (if any) must have <label> associated with inputs.
- Keyboard navigable: focus visible styles, no keyboard traps.
- Ensure adequate color contrast (do not change theme unless needed; if template already handles this, follow it).
- If using icons, ensure accessible labels (aria-label) or visible text.
- If embedding media, include captions/transcripts or provide accessible alternatives/links.
- Avoid autoplay, flashing, or motion without controls.

D) iFrame Compatibility
- Avoid using anything that breaks in an iframe.
- Ensure layout is responsive and scrolls properly.
- If there are internal anchor links, ensure they work inside the iframe.

E) Output Format (must follow exactly)
1) First output a brief summary of what you found in my existing weeks (template notes).
2) Then output the final /<week> folder tree.
3) Then output the FULL content of every file you create or modify, each preceded by a header like:
   --- <week>/index.html ---
   (full file content)
4) End with:
   - A short README snippet for <week> (how to use on GitHub Pages + iframe example code)
   - A checklist mapping each requirement to where it is implemented.

INPUTS I WILL PROVIDE
- The repo folder tree (showing root CSS/JS and the other weeks)
- The existing <week> Canvas shell content (raw text + images + any embedded links)
- Any existing <week> folder or partial files, if they exist
- The names of root CSS/JS files (e.g., style.css, site.css, main.js, scripts.js)

If anything is missing, ask ONLY for the minimum necessary info (repo tree + template example page + <week> shell content).