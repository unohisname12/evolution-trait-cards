import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cards").withIndex("by_updated").order("desc").collect();
  },
});

export const save = mutation({
  args: {
    id: v.string(),
    animalKey: v.string(),
    name: v.string(),
    title: v.string(),
    period: v.string(),
    connectionAnimal: v.string(),
    connectionNote: v.string(),
    environment: v.string(),
    sharedTrait: v.string(),
    adaptation: v.string(),
    claim: v.string(),
    evidence: v.string(),
    reasoning: v.string(),
    imageUrl: v.optional(v.string()),
    imageSource: v.optional(v.string()),
    color: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("cards", { ...args, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { cardId: v.id("cards") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.cardId);
  },
});
