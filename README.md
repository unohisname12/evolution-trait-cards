# Trait Deck

A kid-friendly evolution CER trading-card builder.

The app includes a built-in starter catalog of 202 animals across ancient and modern time periods. It does not generate AI images. Each card tries to pull a non-AI Wikipedia/Wikimedia thumbnail from the animal's page, and the student can paste a different approved image URL and source citation.

## Live Site

Production app:

https://evolution-trait-cards.vercel.app

Convex production deployment:

https://chatty-snail-962.convex.cloud

## Run Locally

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

Saved cards currently persist in browser `localStorage`, so the app is useful before any backend account setup.

## Convex Backend

Convex files are in `convex/`:

- `schema.ts` defines `animals` and `cards`
- `animals.ts` lists and seeds the animal catalog
- `cards.ts` saves and lists finished cards

To connect a real Convex deployment:

```bash
npm run convex
```

Convex will ask you to log in and choose/create a deployment. After that, you can wire the generated Convex API into the frontend or use the existing local-first flow as the classroom fallback.

## Classroom Flow

1. Pick an animal from the catalog.
2. Use the starter shared trait and adaptation as research prompts.
3. Replace or revise the CER text with the student's own research.
4. Confirm the image source line.
5. Save cards to the print sheet.
6. Print 2 cards per row or export the card JSON for backup.

## Image Guidance

Preferred non-AI sources:

- Wikipedia/Wikimedia Commons
- Smithsonian Open Access
- National Park Service
- NOAA/NASA for environment images
- Teacher-approved image folders

The card has an image source field so the student can cite where the image came from.
