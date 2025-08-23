# Piksel Base - Instaliavimo Instrukcijos

## 🔧 Reikalingi įrankiai

### 1. Node.js įdiegimas

#### A) Su Homebrew (Rekomenduojama)
```bash
# Įdiegti Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Įdiegti Node.js
brew install node

# Patikrinti versiją
node --version
npm --version
```

#### B) Tiesiogiai iš oficialios svetainės
1. Atsisiųsti iš: https://nodejs.org/
2. Paleisti .pkg failą
3. Sekti instaliavimo instrukcijas

#### C) Su nvm (Node Version Manager)
```bash
# Įdiegti nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Perkrauti terminal
source ~/.zshrc

# Įdiegti Node.js
nvm install 18
nvm use 18
```

### 2. Git įdiegimas (jei nėra)
```bash
# Su Homebrew
brew install git

# Arba su Xcode Command Line Tools
xcode-select --install
```

## 🚀 Projekto paleidimas

### 1. Įdiegti dependencies
```bash
cd Piksel-base
npm install
```

### 2. Paleisti development server
```bash
npm run dev
```

### 3. Atidaryti naršyklę
```
http://localhost:3000
```

## 📱 Alternatyvūs būdai

### Su Yarn (jei npm neveikia)
```bash
# Įdiegti Yarn
npm install -g yarn

# Įdiegti dependencies
yarn install

# Paleisti projektą
yarn dev
```

### Su pnpm (greitesnis)
```bash
# Įdiegti pnpm
npm install -g pnpm

# Įdiegti dependencies
pnpm install

# Paleisti projektą
pnpm dev
```

## 🔍 Problemų sprendimas

### "command not found: npm"
- Node.js nėra įdiegtas arba PATH nėra sukonfigūruotas
- Perkrauti terminal po Node.js įdiegimo
- Patikrinti PATH: `echo $PATH`

### "permission denied"
- Naudoti `sudo` arba įdiegti su Homebrew
- Patikrinti failų teises

### Port 3000 užimtas
```bash
# Rasti procesą
lsof -ti:3000

# Sustabdyti procesą
kill -9 <PID>
```

## 📞 Pagalba

Jei kyla problemų:
1. Patikrinti Node.js versiją: `node --version`
2. Patikrinti npm versiją: `npm --version`
3. Patikrinti PATH: `echo $PATH`
4. Perkrauti terminal
5. Įdiegti iš naujo su Homebrew

---

**Piksel Base Team** 🚀
