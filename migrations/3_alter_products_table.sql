ALTER TABLE products ADD COLUMN creator_id uuid NOT NULL REFERENCES users (id);