import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const animalValidator = v.object({
  key: v.string(),
  name: v.string(),
  era: v.string(),
  period: v.string(),
  environment: v.string(),
  lineage: v.string(),
  sharedTrait: v.string(),
  adaptation: v.string(),
  wikiTitle: v.string(),
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("animals").collect();
  },
});

export const seed = mutation({
  args: { animals: v.array(animalValidator) },
  handler: async (ctx, args) => {
    let inserted = 0;
    let updated = 0;

    for (const animal of args.animals) {
      const existing = await ctx.db
        .query("animals")
        .withIndex("by_key", (q) => q.eq("key", animal.key))
        .unique();

      if (existing) {
        await ctx.db.patch(existing._id, animal);
        updated += 1;
      } else {
        await ctx.db.insert("animals", animal);
        inserted += 1;
      }
    }

    return { inserted, updated, total: args.animals.length };
  },
});
