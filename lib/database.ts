import Database from "better-sqlite3"
import path from "path"

let db: Database.Database | null = null

export function getDatabase() {
  if (!db) {
    const dbPath = path.join(process.cwd(), "database.sqlite")
    db = new Database(dbPath)
    db.pragma("journal_mode = WAL")
  }
  return db
}

export async function initDatabase() {
  const database = getDatabase()

  // Create tables
  const tables = [
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'member',
      community_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (community_id) REFERENCES communities(id)
    )`,

    `CREATE TABLE IF NOT EXISTS communities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      location TEXT,
      latitude REAL,
      longitude REAL,
      energy_capacity_kwh REAL DEFAULT 0,
      total_members INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS energy_generation (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      community_id INTEGER NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      solar_kwh REAL DEFAULT 0,
      battery_stored_kwh REAL DEFAULT 0,
      grid_imported_kwh REAL DEFAULT 0,
      total_consumption_kwh REAL DEFAULT 0,
      FOREIGN KEY (community_id) REFERENCES communities(id)
    )`,

    `CREATE TABLE IF NOT EXISTS energy_trading (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      seller_id INTEGER NOT NULL,
      buyer_id INTEGER,
      community_id INTEGER NOT NULL,
      kwh_amount REAL NOT NULL,
      price_per_kwh REAL NOT NULL,
      total_amount REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (seller_id) REFERENCES users(id),
      FOREIGN KEY (buyer_id) REFERENCES users(id),
      FOREIGN KEY (community_id) REFERENCES communities(id)
    )`,

    `CREATE TABLE IF NOT EXISTS housing_units (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      community_id INTEGER NOT NULL,
      address TEXT NOT NULL,
      unit_type TEXT,
      square_feet INTEGER,
      monthly_cost REAL,
      occupant_id INTEGER,
      energy_efficiency_rating TEXT,
      smart_features TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (community_id) REFERENCES communities(id),
      FOREIGN KEY (occupant_id) REFERENCES users(id)
    )`,

    `CREATE TABLE IF NOT EXISTS member_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      balance REAL DEFAULT 0,
      credit_score INTEGER DEFAULT 500,
      total_loans REAL DEFAULT 0,
      total_savings REAL DEFAULT 0,
      community_currency_balance REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`,

    `CREATE TABLE IF NOT EXISTS loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      borrower_id INTEGER NOT NULL,
      lender_id INTEGER,
      amount REAL NOT NULL,
      interest_rate REAL NOT NULL,
      term_months INTEGER NOT NULL,
      monthly_payment REAL NOT NULL,
      remaining_balance REAL NOT NULL,
      status TEXT DEFAULT 'active',
      purpose TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (borrower_id) REFERENCES users(id),
      FOREIGN KEY (lender_id) REFERENCES users(id)
    )`,

    `CREATE TABLE IF NOT EXISTS proposals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      community_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      proposal_type TEXT NOT NULL,
      proposed_by INTEGER NOT NULL,
      status TEXT DEFAULT 'active',
      voting_deadline DATETIME,
      yes_votes INTEGER DEFAULT 0,
      no_votes INTEGER DEFAULT 0,
      abstain_votes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (community_id) REFERENCES communities(id),
      FOREIGN KEY (proposed_by) REFERENCES users(id)
    )`,

    `CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      proposal_id INTEGER NOT NULL,
      voter_id INTEGER NOT NULL,
      vote TEXT NOT NULL,
      voted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (proposal_id) REFERENCES proposals(id),
      FOREIGN KEY (voter_id) REFERENCES users(id),
      UNIQUE(proposal_id, voter_id)
    )`,

    `CREATE TABLE IF NOT EXISTS ai_interactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      agent_type TEXT NOT NULL,
      conversation TEXT NOT NULL,
      action_taken TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`,

    `CREATE TABLE IF NOT EXISTS community_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      community_id INTEGER NOT NULL,
      metric_date DATE NOT NULL,
      energy_self_sufficiency_percent REAL DEFAULT 0,
      housing_affordability_index REAL DEFAULT 0,
      financial_inclusion_rate REAL DEFAULT 0,
      governance_participation_rate REAL DEFAULT 0,
      overall_health_score REAL DEFAULT 0,
      FOREIGN KEY (community_id) REFERENCES communities(id)
    )`,
  ]

  // Execute table creation
  for (const table of tables) {
    database.exec(table)
  }

  // Insert default community if it doesn't exist
  const existingCommunity = database.prepare("SELECT id FROM communities WHERE id = 1").get()
  if (!existingCommunity) {
    database
      .prepare(`
      INSERT INTO communities (id, name, description, location, latitude, longitude, energy_capacity_kwh, total_members)
      VALUES (1, 'Green Valley Cooperative', 'A sustainable community focused on renewable energy and cooperative living', 'Green Valley, CA', 37.4419, -122.1430, 5000.0, 247)
    `)
      .run()

    // Insert sample data
    insertSampleData(database)
  }

  return database
}

function insertSampleData(db: Database.Database) {
  // Sample energy generation data
  const energyData = [
    { community_id: 1, solar_kwh: 2400, battery_stored_kwh: 1800, total_consumption_kwh: 2100 },
    { community_id: 1, solar_kwh: 2200, battery_stored_kwh: 1600, total_consumption_kwh: 1950 },
    { community_id: 1, solar_kwh: 2600, battery_stored_kwh: 2000, total_consumption_kwh: 2300 },
  ]

  for (const data of energyData) {
    db.prepare(`
      INSERT INTO energy_generation (community_id, solar_kwh, battery_stored_kwh, total_consumption_kwh)
      VALUES (?, ?, ?, ?)
    `).run(data.community_id, data.solar_kwh, data.battery_stored_kwh, data.total_consumption_kwh)
  }

  // Sample housing units
  const housingUnits = [
    {
      community_id: 1,
      address: "123 Solar Street",
      unit_type: "2BR Apartment",
      square_feet: 850,
      monthly_cost: 1200,
      energy_efficiency_rating: "A+",
      smart_features: JSON.stringify(["Smart thermostat", "Solar panels", "EV charging"]),
    },
    {
      community_id: 1,
      address: "456 Wind Avenue",
      unit_type: "1BR Studio",
      square_feet: 600,
      monthly_cost: 900,
      energy_efficiency_rating: "A",
      smart_features: JSON.stringify(["Smart lighting", "Energy monitoring", "Shared garden"]),
    },
    {
      community_id: 1,
      address: "789 Green Lane",
      unit_type: "3BR House",
      square_feet: 1200,
      monthly_cost: 1800,
      energy_efficiency_rating: "A+",
      smart_features: JSON.stringify(["Full solar array", "Battery storage", "Smart home system"]),
    },
  ]

  for (const unit of housingUnits) {
    db.prepare(`
      INSERT INTO housing_units (community_id, address, unit_type, square_feet, monthly_cost, energy_efficiency_rating, smart_features)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      unit.community_id,
      unit.address,
      unit.unit_type,
      unit.square_feet,
      unit.monthly_cost,
      unit.energy_efficiency_rating,
      unit.smart_features,
    )
  }

  // Sample proposals
  const proposals = [
    {
      community_id: 1,
      title: "Community Solar Farm Expansion",
      description:
        "Proposal to expand our solar capacity by 50% with a new solar farm on the east side of the community.",
      proposal_type: "infrastructure",
      proposed_by: 1,
      voting_deadline: "2024-01-20",
      yes_votes: 156,
      no_votes: 23,
      abstain_votes: 12,
    },
    {
      community_id: 1,
      title: "Community Currency Interest Rate",
      description: "Adjust the community currency savings interest rate from 2.5% to 3.0% annually.",
      proposal_type: "policy",
      proposed_by: 1,
      voting_deadline: "2024-01-18",
      yes_votes: 89,
      no_votes: 45,
      abstain_votes: 8,
    },
  ]

  for (const proposal of proposals) {
    db.prepare(`
      INSERT INTO proposals (community_id, title, description, proposal_type, proposed_by, voting_deadline, yes_votes, no_votes, abstain_votes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      proposal.community_id,
      proposal.title,
      proposal.description,
      proposal.proposal_type,
      proposal.proposed_by,
      proposal.voting_deadline,
      proposal.yes_votes,
      proposal.no_votes,
      proposal.abstain_votes,
    )
  }
}
