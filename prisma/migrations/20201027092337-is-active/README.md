# Migration `20201027092337-is-active`

This migration has been generated by toycrane at 10/27/2020, 6:23:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "isActive" boolean   NOT NULL DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201024073529-create-reset-token..20201027092337-is-active
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -36,5 +36,6 @@
   posts   Post[]
   profile Profile?
   resetToken String?
   resetTokenExpiry Int?
+  isActive Boolean @default(false)
 }
```


