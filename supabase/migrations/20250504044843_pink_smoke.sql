/*
  # Create dogs table and security policies

  1. New Tables
    - `dogs`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `litters` (integer, not null)
      - `price` (decimal, not null) 
      - `characteristics` (text, not null)
      - `size` (text, not null)
      - `weight` (text, not null)
      - `height` (text, not null)
      - `image` (text, not null)
      - `created_at` (timestamp with time zone, default: now())

  2. Security
    - Enable RLS on dogs table
    - Add policies for:
      - Public read access
      - Admin write access
*/

CREATE TABLE IF NOT EXISTS dogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  litters integer NOT NULL,
  price decimal(10,2) NOT NULL,
  characteristics text NOT NULL,
  size text NOT NULL,
  weight text NOT NULL,
  height text NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON dogs
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access"
  ON dogs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);