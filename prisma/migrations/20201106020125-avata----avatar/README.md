# Migration `20201106020125-avata----avatar`

This migration has been generated by toycrane at 11/6/2020, 11:01:25 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Profile" DROP COLUMN "avata",
ADD COLUMN "avatar" text   
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105094553-..20201106020125-avata----avatar
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
@@ -22,9 +22,9 @@
 model Profile {
   id     Int     @default(autoincrement()) @id
   bio    String?
-  avata  String?
+  avatar String?
   user   User    @relation(fields: [userId], references: [id])
   userId Int     @unique
 }
```

