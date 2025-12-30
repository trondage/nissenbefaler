# 🎅 Nissen Befaler - Poengtavle 🎄

En julepreget desktop-applikasjon for å holde styr på poeng i "Nissen Befaler" - den norske versjonen av Taskmaster!

![React](https://img.shields.io/badge/React-17.0.2-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.1.2-blue.svg)
![Electron](https://img.shields.io/badge/Electron-23.3.13-green.svg)

## 📋 Om prosjektet

Nissen Befaler Poengtavle er en Windows-applikasjon designet spesielt for å holde styr på poeng under julekonkurranser inspirert av TV-programmet Taskmaster. Appen har et festlig juletema og gir en profesjonell og morsom måte å følge med på konkurransene.

### ✨ Funksjoner

- ➕ **Legg til deltakere** med navn og emoji-avatar
- 🎯 **Oppdater poeng** enkelt med +1, +2, +3, +5 eller -1 knapper
- 👑 **Marker vinner** med spesielt vinnerbadge som alltid vises øverst
- 🗑️ **Slett deltakere** via høyreklikk-meny
- 🔄 **Nullstill poeng** eller hele spillet
- 💾 **Automatisk lagring** i localStorage
- 🖥️ **Fullskjerm-modus** for presentasjon
- 🎨 **Juledesign** med rød gradient-bakgrunn og snømann-tema

### 🖼️ Skjermbilder

Appen viser en oversiktlig poengtavle med:
- Deltakerkort med emoji, navn og poengsum
- Interaktive knapper for poengoppdatering
- Høyreklikk-meny for sletting og vinner-markering
- Modale vinduer for å legge til deltakere og nullstille

## 🚀 Ta i bruk

### Alternativ 1: Last ned ferdig Windows-applikasjon (anbefalt)

1. Last ned `Nissen Befaler Poengtavle-Portable.exe` fra [Releases](../../releases)
2. Dobbeltklikk på filen for å starte appen
3. Ingen installasjon nødvendig - portable versjon!

### Alternativ 2: Kjør fra kildekode

#### Forutsetninger
- Node.js (v14 eller nyere)
- npm

#### Installasjon

1. Klon repositoriet:
```bash
git clone https://github.com/dittbrukernavn/nissen-befaler-poengtavle.git
cd nissen-befaler-poengtavle
```

2. Installer avhengigheter:
```bash
npm install
```

3. Start appen i utviklingsmodus:
```bash
npm start
```

Appen åpnes i nettleseren på `http://localhost:3000`

#### Bygg desktop-applikasjon

For å bygge din egen Windows .exe-fil:

```bash
npm run build
npx electron-builder --win portable
```

Den ferdige portable .exe-filen ligger i `release/`-mappen.

## 📖 Bruksanvisning

1. **Legg til deltakere**: Klikk på "➕ Legg til deltaker" og velg emoji og navn
2. **Gi poeng**: Klikk på poengknappene (+1, +2, +3, +5, -1) for hver deltaker
3. **Marker vinner**: Høyreklikk på en deltaker og velg "👑 Vinner"
4. **Slett deltaker**: Høyreklikk og velg "🗑️ Slett deltaker"
5. **Fullskjerm**: Klikk på "🖥️ Fullskjerm" for presentasjonsmodus
6. **Nullstill**: Klikk på "🔄 Nullstill" for å nullstille poeng eller hele spillet

## 🛠️ Teknisk stack

- **Frontend**: React 17.0.2 med TypeScript
- **Desktop**: Electron 23.3.13
- **Build**: electron-builder
- **Styling**: Vanilla CSS med julefarger
- **State management**: React Hooks + localStorage

## 📁 Prosjektstruktur

```
nissen-befaler-poengtavle/
├── public/
│   ├── index.html          # HTML-template
│   └── electron.js         # Electron main process
├── src/
│   ├── App.tsx             # Hovedkomponent med state management
│   ├── components/
│   │   ├── Scoreboard.tsx      # Poengtavle-visning
│   │   ├── PlayerCard.tsx      # Deltakerkort
│   │   └── AddPlayerForm.tsx   # Skjema for nye deltakere
│   ├── styles/
│   │   └── main.css        # All styling
│   └── index.js            # React entry point
├── electron.js             # Electron konfigurasjons for bygg
├── package.json
└── README.md
```

## 🎨 Tilpasning

Du kan enkelt tilpasse appen ved å endre:
- **Farger**: Se `src/styles/main.css` for gradient-farger
- **Emojis**: Legg til flere i `AddPlayerForm.tsx`
- **Poengknapper**: Endre verdier i `PlayerCard.tsx`

## 🤝 Bidra

Bidrag er velkomne! Hvis du har forslag til forbedringer:

1. Fork prosjektet
2. Lag en feature branch (`git checkout -b feature/MinFunksjon`)
3. Commit endringene (`git commit -m 'Legger til MinFunksjon'`)
4. Push til branchen (`git push origin feature/MinFunksjon`)
5. Åpne en Pull Request

## 📝 Lisens

Dette prosjektet er åpen kildekode og tilgjengelig under MIT-lisensen.

## 🎄 God jul!

Laget med ❤️ for alle som elsker "Nissen Befaler" og julekonkurranser!