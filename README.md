# 2030 Community Cooperative Platform

A comprehensive community cooperative platform with AI orchestration for energy-autonomous, financially inclusive communities.

## Features

- **Energy Management**: Solar generation tracking, energy trading marketplace, battery storage monitoring
- **Housing Portal**: Available units, maintenance requests, community planning tools
- **Financial Services**: Alternative credit scoring, micro-loans, community currency, savings goals
- **Governance Center**: Democratic proposals, voting system, community discussions
- **AI Assistant**: Multi-agent system with specialized assistants for each domain
- **Real-time Updates**: WebSocket connections for live data and notifications

## Quick Start

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Set up the environment**:
   \`\`\`bash
   node scripts/setup.js
   \`\`\`

3. **Start the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser** and navigate to `http://localhost:3000`

## Architecture

- **Frontend**: Next.js 14 with React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes with SQLite database
- **Real-time**: WebSocket server for live updates
- **Authentication**: JWT with refresh tokens
- **AI Integration**: OpenAI API ready (add your API key)
- **Database**: SQLite with better-sqlite3 (production-ready)

## Environment Variables

Create a `.env.local` file with:

\`\`\`env
JWT_SECRET=your-super-secure-jwt-secret-key
OPENAI_API_KEY=your-openai-api-key (optional)
\`\`\`

## Database

The SQLite database is automatically created and seeded with sample data on first run. No additional setup required!

## Community Features

### Energy System
- Real-time solar generation monitoring
- Peer-to-peer energy trading
- Battery storage optimization
- Carbon footprint tracking

### Housing Management
- Available unit listings with smart features
- Maintenance request system
- Community planning tools
- Energy efficiency ratings

### Financial Services
- Alternative credit scoring
- Community-backed micro-loans
- Local currency system
- Cooperative savings programs

### Democratic Governance
- Proposal creation and voting
- Impact assessment tools
- Community discussions
- Transparent decision making

### AI Coordination
- Energy optimization agent
- Housing allocation assistant
- Financial advisor
- Governance facilitator

## Production Deployment

1. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

2. Start the production server:
   \`\`\`bash
   npm start
   \`\`\`

3. For WebSocket functionality, also run:
   \`\`\`bash
   npm run websocket
   \`\`\`

## Contributing

This platform demonstrates the future of cooperative community living. Contributions welcome!

## License

MIT License - Built for the future of sustainable communities.
