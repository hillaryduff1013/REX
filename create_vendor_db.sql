CREATE TABLE IF NOT EXISTS vendors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2) DEFAULT 0.00
);

-- Insert sample data with prices
INSERT INTO vendors (email, password, name, company, category, price) VALUES
-- Realtors
('premium.realty@example.com', 'password123', 'Premium Realty', 'Premium Realty Co.', 'Real Estate Agent', 5000.00),
('quality.realty@example.com', 'password123', 'Quality Realty', 'Quality Realty Co.', 'Real Estate Agent', 3500.00),
('budget.realty@example.com', 'password123', 'Budget Realty', 'Budget Realty Co.', 'Real Estate Agent', 2000.00),

-- Mortgage Agents
('premium.mortgages@example.com', 'password123', 'Premium Mortgages', 'Premium Mortgages Co.', 'Mortgage Agent', 4000.00),
('quality.mortgages@example.com', 'password123', 'Quality Mortgages', 'Quality Mortgages Co.', 'Mortgage Agent', 3000.00),
('budget.mortgages@example.com', 'password123', 'Budget Mortgages', 'Budget Mortgages Co.', 'Mortgage Agent', 1500.00),

-- Insurance Agents
('premium.insurance@example.com', 'password123', 'Premium Insurance', 'Premium Insurance Co.', 'Insurance Agent', 3000.00),
('quality.insurance@example.com', 'password123', 'Quality Insurance', 'Quality Insurance Co.', 'Insurance Agent', 2000.00),
('budget.insurance@example.com', 'password123', 'Budget Insurance', 'Budget Insurance Co.', 'Insurance Agent', 1000.00),

-- Photographers
('premium.photo@example.com', 'password123', 'Premium Photography', 'Premium Photo Co.', 'Photographer', 2000.00),
('quality.photo@example.com', 'password123', 'Quality Photography', 'Quality Photo Co.', 'Photographer', 1500.00),
('budget.photo@example.com', 'password123', 'Budget Photography', 'Budget Photo Co.', 'Photographer', 800.00),

-- Property Managers
('premium.pm@example.com', 'password123', 'Premium Property Management', 'Premium PM Co.', 'Property Manager', 4500.00),
('quality.pm@example.com', 'password123', 'Quality Property Management', 'Quality PM Co.', 'Property Manager', 3000.00),
('budget.pm@example.com', 'password123', 'Budget Property Management', 'Budget PM Co.', 'Property Manager', 1800.00);
