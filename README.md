# ⚽ Soccer Team Balancer

Een web applicatie om voetbalspelers eerlijk te verdelen over twee teams voor een wedstrijd.

## ✨ Features

- ✅ Spelers toevoegen, bewerken en verwijderen
- ✅ Spelerattributen: naam, positie, conditie, kracht, techniek, ervaring
- ✅ Persistente opslag in browser (localStorage)
- ✅ Selecteer welke spelers vandaag spelen
- ✅ Automatisch gebalanceerde teams genereren
- ✅ Teams opnieuw verdelen (reshuffle)
- ✅ Moderne, responsive UI met Tailwind CSS
- ✅ Volledig in het Nederlands

## 🚀 Live Demo

[Bekijk de live demo](https://jeffreylauwers.github.io/speler-verdeler/)

## 💻 Lokaal draaien

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev

# Build voor productie
npm run build
```

## 🎯 Hoe te gebruiken

1. **Spelers toevoegen**: Klik op "Speler toevoegen" en vul de details in
2. **Wedstrijd opstellen**: Klik op "Wedstrijd opstellen"
3. **Spelers selecteren**: Vink aan welke spelers vandaag spelen
4. **Teams genereren**: Klik op "Teams genereren" om gebalanceerde teams te maken
5. **Opnieuw verdelen**: Niet tevreden? Klik op "Teams opnieuw verdelen"

## 🔧 Technologieën

- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)
- localStorage voor data persistence

## 📝 Balanceringsalgoritme

Het algoritme houdt rekening met:
- **Prestatiefactoren**: conditie, kracht en techniek
- **Ervaringsverdeling**: zorgt voor eerlijke verdeling van oudere/ervaren spelers
- **Posities**: probeert posities eerlijk te verdelen

## 📄 Licentie

MIT

## 👤 Auteur

Jeffrey Lauwers

---

Gemaakt met ❤️ en ⚽