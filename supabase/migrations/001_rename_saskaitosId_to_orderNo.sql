-- Migration: Rename saskaitosId to orderNo
-- Run this in Supabase SQL Editor

-- Rename the column
ALTER TABLE orders RENAME COLUMN "saskaitosId" TO "orderNo";

-- Update the unique constraint
DROP INDEX IF EXISTS orders_saskaitosId_key;
CREATE UNIQUE INDEX orders_orderNo_key ON orders("orderNo");

-- Update the conflict resolution in sample data insert
-- (This will be handled by the updated schema.sql)
