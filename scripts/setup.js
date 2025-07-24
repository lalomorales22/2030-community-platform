const fs = require('fs')
const path = require('path')

console.log('🚀 Setting up 2030 Community Platform...')

// Create necessary directories
const dirs = ['public', 'database']
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`✅ Created ${dir} directory`)
  }
})

// Create environment file if it doesn't exist
const envPath = '.env.local'
if (!fs.existsSync(envPath)) {
  const envContent = `# 2030 Community Platform Environment Variables
JWT_SECRET=your-super-secure-jwt-secret-key-change-this-in-production
NODE_ENV=development
`
  fs.writeFileSync(envPath, envContent)
  console.log('✅ Created .env.local file')
}

console.log('🎉 Setup complete! Run "npm run dev" to start the application.')
console.log('📝 Don\'t forget to update your JWT_SECRET in .env.local')
