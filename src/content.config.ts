import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const brandCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/brands" }),
  schema: z.object({
    id: z.string(),
    names: z.object({ en: z.string(), zh: z.string() }),
    slug: z.string(),
    logo: z.string(),
    website: z.string().optional(),
    country: z.string().default("CN"),
    description: z.object({ en: z.string(), zh: z.string() }),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const vehicleCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "src/content/vehicles" }),
  schema: z.object({
    id: z.string(),
    names: z.object({ en: z.string(), zh: z.string() }),
    slug: z.string(),
    brand: z.string(),
    type: z.enum(["SEDAN", "SUV", "MPV", "MINI", "LCV", "OFFROAD", "SPORTS"]),
    fuelType: z.enum(["electric", "plug_in_hybrid", "extended_range", "petrol"]),
    priceRange: z.object({
      min: z.number(),
      max: z.number(),
      currency: z.string().default("CNY"),
    }),
    images: z.array(z.string()).default([]),
    specs: z.object({
      range_km: z.number().optional(),
      battery_kwh: z.number().optional(),
      power_kw: z.number().optional(),
      top_speed_kmh: z.number().optional(),
      seats: z.number().optional(),
      doors: z.number().optional(),
    }),
    featured: z.boolean().default(false),
    inStock: z.boolean().default(true),
    order: z.number().default(0),
    description: z.object({ en: z.string(), zh: z.string() }),
  }),
});

export const collections = {
  brands: brandCollection,
  vehicles: vehicleCollection,
};
