-- Create the contact_messages table
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  replied_at TIMESTAMPTZ
);

-- Create an index on email for faster lookups
CREATE INDEX idx_contact_messages_email ON contact_messages(email);

-- Create an index on status for faster filtering
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
