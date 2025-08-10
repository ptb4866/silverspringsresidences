-- Create enum types for status and location
CREATE TYPE tour_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE tour_location AS ENUM ('maple', 'willow', 'both');

-- Create the tour_requests table
CREATE TABLE tour_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  relationship TEXT NOT NULL,
  location tour_location NOT NULL,
  tour_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  group_size TEXT NOT NULL,
  interests TEXT[] DEFAULT '{}',
  special_requests TEXT,
  marketing_consent BOOLEAN DEFAULT false,
  status tour_status DEFAULT 'pending',
  confirmation_number TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_tour_requests_email ON tour_requests(email);

-- Create a function to generate confirmation numbers
CREATE OR REPLACE FUNCTION generate_confirmation_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.confirmation_number := 'SSR-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically generate confirmation numbers
CREATE TRIGGER set_confirmation_number
  BEFORE INSERT ON tour_requests
  FOR EACH ROW
  EXECUTE FUNCTION generate_confirmation_number();

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON tour_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
