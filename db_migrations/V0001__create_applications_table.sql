CREATE TABLE IF NOT EXISTS t_p47453904_sports_event_portal_.applications (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL CHECK (type IN ('section', 'event')),
  target_name VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(255),
  birthdate DATE,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);