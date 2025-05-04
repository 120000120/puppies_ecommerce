/*
  # Create dogs table with policies

  1. New Tables
    - `dogs` table for storing dog information
      - `id` (uuid, primary key)
      - `name` (text)
      - `litters` (integer)
      - `price` (decimal)
      - `characteristics` (text)
      - `size` (text)
      - `weight` (text)
      - `height` (text)
      - `image` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policy for public read access
    - Add policy for authenticated users full access
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

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow public read access" ON dogs;
  DROP POLICY IF EXISTS "Allow authenticated users full access" ON dogs;
END $$;

-- Create policies
CREATE POLICY "Allow public read access"
  ON dogs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access"
  ON dogs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);