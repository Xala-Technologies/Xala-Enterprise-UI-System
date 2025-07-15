/**
 * @fileoverview Prisma Schema for Theme System
 * @description Database schema definitions for theme storage and management
 * @version 3.2.0
 * @compatibility PostgreSQL, MySQL, SQLite
 */

/**
 * Prisma Schema Example for Theme System
 * 
 * Save this as schema.prisma in your Prisma project:
 * 
 * ```prisma
 * generator client {
 *   provider = "prisma-client-js"
 * }
 * 
 * datasource db {
 *   provider = "postgresql" // or "mysql" or "sqlite"
 *   url      = env("DATABASE_URL")
 * }
 * 
 * // Theme category enumeration
 * enum ThemeCategory {
 *   MUNICIPAL
 *   ENTERPRISE
 *   ECOMMERCE
 *   HEALTHCARE
 *   EDUCATION
 *   FINANCE
 *   PRODUCTIVITY
 *   PUBLIC_SECTOR
 * }
 * 
 * // Theme mode enumeration
 * enum ThemeMode {
 *   LIGHT
 *   DARK
 *   AUTO
 * }
 * 
 * // Accessibility level enumeration
 * enum AccessibilityLevel {
 *   OFF
 *   BASIC
 *   ENHANCED
 *   WCAG_AA
 *   WCAG_AAA
 * }
 * 
 * // Compliance standards enumeration
 * enum ComplianceStandard {
 *   GDPR
 *   CCPA
 *   HIPAA
 *   PCI_DSS
 *   SOC2
 *   ISO27001
 *   NSM
 * }
 * 
 * // Icon style enumeration
 * enum IconStyle {
 *   OUTLINED
 *   FILLED
 *   ROUNDED
 *   SHARP
 * }
 * 
 * // Main theme model
 * model Theme {
 *   // Core identification
 *   id          String    @id @default(cuid())
 *   name        String    @unique
 *   displayName String
 *   description String
 *   version     String    @default("1.0.0")
 *   category    ThemeCategory
 *   mode        ThemeMode
 * 
 *   // Configuration sections (JSON fields)
 *   colors      Json      // ThemeColors
 *   typography  Json      // ThemeTypography
 *   spacing     Json      // ThemeSpacing
 *   accessibility Json    // ThemeAccessibility
 *   branding    Json      // ThemeBranding
 *   compliance  Json      // ThemeCompliance
 *   performance Json      // ThemePerformance
 *   responsive  Json      // ThemeResponsive
 * 
 *   // Metadata
 *   isDefault   Boolean   @default(false)
 *   isActive    Boolean   @default(true)
 *   isPublic    Boolean   @default(false)
 *   tags        String[]  @default([])
 * 
 *   // Relationships
 *   authorId        String?
 *   author          User?         @relation(fields: [authorId], references: [id])
 *   organizationId  String?
 *   organization    Organization? @relation(fields: [organizationId], references: [id])
 * 
 *   // Theme usage tracking
 *   usages      ThemeUsage[]
 *   favorites   ThemeFavorite[]
 * 
 *   // Timestamps
 *   createdAt   DateTime  @default(now())
 *   updatedAt   DateTime  @updatedAt
 * 
 *   @@map("themes")
 *   @@index([category, mode])
 *   @@index([isPublic, isActive])
 *   @@index([organizationId])
 * }
 * 
 * // User model (simplified)
 * model User {
 *   id        String   @id @default(cuid())
 *   email     String   @unique
 *   name      String?
 *   
 *   // Theme relationships
 *   themes    Theme[]
 *   favorites ThemeFavorite[]
 *   usages    ThemeUsage[]
 * 
 *   createdAt DateTime @default(now())
 *   updatedAt DateTime @updatedAt
 * 
 *   @@map("users")
 * }
 * 
 * // Organization model (simplified)
 * model Organization {
 *   id        String   @id @default(cuid())
 *   name      String
 *   slug      String   @unique
 *   
 *   // Theme relationships
 *   themes    Theme[]
 *   
 *   createdAt DateTime @default(now())
 *   updatedAt DateTime @updatedAt
 * 
 *   @@map("organizations")
 * }
 * 
 * // Theme usage tracking
 * model ThemeUsage {
 *   id      String @id @default(cuid())
 *   themeId String
 *   theme   Theme  @relation(fields: [themeId], references: [id], onDelete: Cascade)
 *   userId  String
 *   user    User   @relation(fields: [userId], references: [id], onDelete: Cascade)
 * 
 *   // Usage metadata
 *   applicationName String?
 *   applicationUrl  String?
 *   deviceType      String?
 *   browserInfo     String?
 *   
 *   createdAt DateTime @default(now())
 * 
 *   @@map("theme_usages")
 *   @@unique([themeId, userId])
 *   @@index([themeId])
 *   @@index([userId])
 * }
 * 
 * // Theme favorites
 * model ThemeFavorite {
 *   id      String @id @default(cuid())
 *   themeId String
 *   theme   Theme  @relation(fields: [themeId], references: [id], onDelete: Cascade)
 *   userId  String
 *   user    User   @relation(fields: [userId], references: [id], onDelete: Cascade)
 * 
 *   createdAt DateTime @default(now())
 * 
 *   @@map("theme_favorites")
 *   @@unique([themeId, userId])
 *   @@index([themeId])
 *   @@index([userId])
 * }
 * ```
 */

// TypeScript types for Prisma client usage
export type PrismaTheme = {
  id: string;
  name: string;
  displayName: string;
  description: string;
  version: string;
  category: string;
  mode: string;
  colors: unknown; // JSON field
  typography: unknown; // JSON field
  spacing: unknown; // JSON field
  accessibility: unknown; // JSON field
  branding: unknown; // JSON field
  compliance: unknown; // JSON field
  performance: unknown; // JSON field
  responsive: unknown; // JSON field
  isDefault: boolean;
  isActive: boolean;
  isPublic: boolean;
  tags: string[];
  authorId?: string;
  organizationId?: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Database query examples for themes
 */
export const themeQueries = {
  // Get all public themes
  getPublicThemes: `
    SELECT * FROM themes 
    WHERE "isPublic" = true AND "isActive" = true
    ORDER BY "createdAt" DESC;
  `,

  // Get themes by category and mode
  getThemesByCategoryAndMode: `
    SELECT * FROM themes 
    WHERE category = $1 AND mode = $2 AND "isActive" = true
    ORDER BY "displayName" ASC;
  `,

  // Get organization themes
  getOrganizationThemes: `
    SELECT * FROM themes 
    WHERE "organizationId" = $1 AND "isActive" = true
    ORDER BY "isDefault" DESC, "displayName" ASC;
  `,

  // Search themes
  searchThemes: `
    SELECT * FROM themes 
    WHERE (
      "displayName" ILIKE '%' || $1 || '%' OR 
      description ILIKE '%' || $1 || '%' OR 
      $1 = ANY(tags)
    ) AND "isActive" = true
    ORDER BY "displayName" ASC;
  `,

  // Get theme usage statistics
  getThemeUsageStats: `
    SELECT 
      t.id,
      t."displayName",
      COUNT(tu.id) as usage_count,
      COUNT(tf.id) as favorite_count
    FROM themes t
    LEFT JOIN theme_usages tu ON t.id = tu."themeId"
    LEFT JOIN theme_favorites tf ON t.id = tf."themeId"
    WHERE t."isActive" = true
    GROUP BY t.id, t."displayName"
    ORDER BY usage_count DESC;
  `,
} as const;

/**
 * Database migration examples
 */
export const themeMigrations = {
  // Initial theme table creation
  createThemeTable: `
    CREATE TABLE themes (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      "displayName" TEXT NOT NULL,
      description TEXT NOT NULL,
      version TEXT DEFAULT '1.0.0',
      category TEXT NOT NULL,
      mode TEXT NOT NULL,
      colors JSONB NOT NULL,
      typography JSONB NOT NULL,
      spacing JSONB NOT NULL,
      accessibility JSONB NOT NULL,
      branding JSONB NOT NULL,
      compliance JSONB NOT NULL,
      performance JSONB NOT NULL,
      responsive JSONB NOT NULL,
      "isDefault" BOOLEAN DEFAULT false,
      "isActive" BOOLEAN DEFAULT true,
      "isPublic" BOOLEAN DEFAULT false,
      tags TEXT[] DEFAULT '{}',
      "authorId" TEXT,
      "organizationId" TEXT,
      "createdAt" TIMESTAMP DEFAULT NOW(),
      "updatedAt" TIMESTAMP DEFAULT NOW()
    );
  `,

  // Create indexes for performance
  createIndexes: `
    CREATE INDEX idx_themes_category_mode ON themes(category, mode);
    CREATE INDEX idx_themes_public_active ON themes("isPublic", "isActive");
    CREATE INDEX idx_themes_organization ON themes("organizationId");
    CREATE INDEX idx_themes_author ON themes("authorId");
    CREATE INDEX idx_themes_tags ON themes USING GIN(tags);
  `,

  // Create theme usage table
  createThemeUsageTable: `
    CREATE TABLE theme_usages (
      id TEXT PRIMARY KEY,
      "themeId" TEXT NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
      "userId" TEXT NOT NULL,
      "applicationName" TEXT,
      "applicationUrl" TEXT,
      "deviceType" TEXT,
      "browserInfo" TEXT,
      "createdAt" TIMESTAMP DEFAULT NOW(),
      UNIQUE("themeId", "userId")
    );
  `,
} as const; 