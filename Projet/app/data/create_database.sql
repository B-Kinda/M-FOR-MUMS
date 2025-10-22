-- Création de la table user
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    photo TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création d'un index pour les recherches par email
CREATE INDEX IF NOT EXISTS idx_user_email ON "user"(email);

-- Création d'un index pour les recherches par google_id
CREATE INDEX IF NOT EXISTS idx_user_google_id ON "user"(google_id);