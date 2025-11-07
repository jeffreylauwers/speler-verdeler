import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BELANGRIJK: Vervang 'REPOSITORY-NAME' met de naam van je GitHub repository
// Bijvoorbeeld: als je repo 'soccer-team-balancer' heet, dan wordt dit:
// base: '/soccer-team-balancer/'

export default defineConfig({
  plugins: [react()],
  base: '/REPOSITORY-NAME/',
})