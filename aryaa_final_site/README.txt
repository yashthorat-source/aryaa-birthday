ARYAA'S BIRTHDAY WEBSITE — FINAL DESIGN BUILD
==============================================

The site uses your approved original page artwork. The same top navigation ribbon has been copied directly from the first Home page and reused on every screen.

SCREENS
1. Home — original birthday cover and photos (unchanged)
2. Birthday timer — live days / hours / minutes / seconds
3. Gallery — five empty photo frames (click a frame to preview a photo)
4. Memories — four empty photo frames (click a frame to preview a photo)
5. Your Fav — Vampire Diaries page with the four main character cards and Elijah quote
6. Letter entrance — click the visible Open the Letter button
7. Opened letter — your letter artwork with roses and chocolates; use Back to envelope
8. Sky entrance — click the visible Enter My Sky cloud button
9. Nine wishes — click each glowing star to read its message

OPEN IN VS CODE
1. Extract this ZIP.
2. Open the extracted aryaa_final_site folder in VS Code.
3. Install the Live Server extension if needed.
4. Right-click index.html and select Open with Live Server.

NAVIGATION
- The ribbon is the exact same crop from the approved Home page.
- Home, Gallery, Memories, Your Fav, Letter and Surprise work on every screen.
- The website shows one screen at a time; it does not scroll like a PDF.
- Browser Back / Forward also changes screens.

BIRTHDAY TIMER
- Counts down to 14 November in the visitor's local time.
- Automatically chooses the next upcoming 14 November.

PHOTOS
- Gallery and Memories frames are empty by default.
- Click a frame to preview a local photo in that frame.
- These previews last for the current browser session; to make them permanent, replace the artwork file or add the photos to the site source.

LETTER
- Replace the sample text only when you are ready to add your own letter. The opened-letter art is currently used as the visual design.

WISHES
- Edit the nine wish titles and messages in script.js inside the `wishes` array.

IMPORTANT
- Google Fonts loads with an internet connection; fallback fonts are included.
- This is a static website and needs no database or paid hosting.
- The Home page artwork is preserved exactly as supplied in the approved design set.


SCROLL NAVIGATION UPDATE
========================
- All nine screens appear vertically on one continuous page.
- Clicking a ribbon tab scrolls smoothly to that section; it no longer hides/replaces other screens.
- The top ribbon remains fixed while scrolling.
- The active pink pill moves to the selected tab on click and follows the section currently in view.
- The Letter entrance button scrolls to the opened-letter section.
- The Enter My Sky button scrolls to the nine-wishes section.


FINAL POLISH
============
- The opened-letter reveal is hidden from the normal scroll until Open the Letter is clicked.
- The nine-wishes reveal is hidden from the normal scroll until Enter My Sky is clicked.
- Returning to the letter envelope or sky entrance closes the reveal again.
- The duplicate navigation ribbons baked into each page artwork have been removed.
- The fixed shared Home ribbon is now the only navigation ribbon visible throughout the site.


NAVIGATION MODE RESTORED
========================
- The site is back to one screen visible at a time.
- Navigation tabs switch screens; there is no continuous page scrolling.
- The dark pink active ribbon indicator moves to the selected tab.
- Letter-opened and Sky-wishes screens remain gated until their entrance buttons are clicked.
- Duplicate ribbon artwork remains removed from each page background.


LETTER → SURPRISE NAVIGATION
============================
- Added "Next Surprise ♡" to the Letter entrance screen.
- It navigates to the Surprise entrance page (Sky page).
- The Open the Letter button remains separate and unchanged.
- No extra Next Surprise button is shown on the final Surprise / wishes screen.
