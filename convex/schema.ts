import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  animals: defineTable({
    key: v.string(),
    name: v.string(),
    era: v.string(),
    period: v.string(),
    environment: v.string(),
    lineage: v.string(),
    sharedTrait: v.string(),
    adaptation: v.string(),
    wikiTitle: v.string(),
  }).index("by_key", ["key"]),
  cards: defineTable({
    id: v.string(),
    animalKey: v.string(),
    name: v.string(),
    title: v.string(),
    period: v.string(),
    connectionAnimal: v.optional(v.string()),
    connectionNote: v.optional(v.string()),
    environment: v.string(),
    sharedTrait: v.string(),
    adaptation: v.string(),
    claim: v.string(),
    evidence: v.string(),
    reasoning: v.string(),
    imageUrl: v.optional(v.string()),
    imageSource: v.optional(v.string()),
    color: v.string(),
    updatedAt: v.number(),
  })
    .index("by_updated", ["updatedAt"])
    .index("by_card_id", ["id"]),
});
