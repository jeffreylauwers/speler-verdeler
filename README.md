# ⚽ Speler Verdeler

Een web applicatie om voetbalspelers eerlijk te verdelen over twee teams voor een wedstrijd.

## Features

- ✅ Spelers toevoegen, bewerken en verwijderen.
- ✅ Spelerkenmerken: naam, positie, conditie, kracht, techniek, ervaring.
- ✅ Persistente opslag in browser (localStorage).
- ✅ Selecteer welke spelers vandaag spelen.
- ✅ Automatisch gebalanceerde teams genereren.
- ✅ Teams opnieuw verdelen.
- ✅ Volledig in het Nederlands.

## Live Demo

[Bekijk de live demo](https://jeffreylauwers.github.io/speler-verdeler/)

## Lokaal draaien

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev

# Build voor productie
npm run build
```

## 🔧 Technologieën

- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)
- localStorage voor data persistence

## Balanceringsalgoritme

Het algoritme houdt rekening met:
- **Prestatiefactoren**: conditie, kracht en techniek.
- **Ervaringsverdeling**: zorgt voor eerlijke verdeling van oudere/ervaren spelers.
- **Posities**: probeert posities eerlijk te verdelen.

## Licentie

MIT

## Auteur

Jeffrey Lauwers
