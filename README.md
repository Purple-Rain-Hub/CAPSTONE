# What2Game

What2Game è un applicazione che aiuta gli utenti a scoprire il loro prossimo videogioco ideale, basandosi su un rapido questionario di preferenze e su dati reali estratti da IGDB.

### 📋 Descrizione

What2Game è un sistema di raccomandazione videoludica che:

- Propone agli utenti un quiz su generi e stili di gioco
- Aggrega risposte e assegna “punti” alle risposte stesse
- Interroga l’[IGDB API](https://api-docs.igdb.com/) per reperire i titoli corrispondenti
- Restituisce i giochi consigliati, ordinati per punteggio

---

### 📖 Come funziona

Il quiz, creato da un utente admin tramite la relativa componente, permette di inserire a piacimento domande e risposte e assegnare ad ogni domanda la quantità di punti che vale.

I punti sono un sistema che aiuta a trovare il gioco perfetto per l'utente. A differenza di un generico sistema ad esclusione, quello a punti permette di non escludere nessun risultato a prescindere, ma bensì di premiare quei giochi che trovano quanta più corrispondenza in varie risposte dell'utente.

---

### ✨ Funzionalità principali

1. **Questionario interattivo**
2. **Raccomandazioni dinamiche**
3. **Gestione sessioni e storico quiz**
4. **Pannello admin**: crea/gestisci questionari

---

### 🛠️ Tecnologie utilizzate

- **Front-end**

  - [React](https://reactjs.org/)
  - [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Thunk](https://github.com/reduxjs/redux-thunk)
  - [React-Bootstrap](https://react-bootstrap.github.io/)
  - [React Router v6](https://reactrouter.com/)

- **Back-end**

  - [ASP.NET Core](https://docs.microsoft.com/aspnet/core)
  - [Entity Framework Core](https://docs.microsoft.com/ef/core)
  - [ASP.NET Identity](https://docs.microsoft.com/aspnet/core/security/authentication/identity)
  - [SQL Server](https://www.microsoft.com/sql-server)

- **Integrazione API**
  - [IGDB API](https://api-docs.igdb.com/) tramite wrapper [igdb-dotnet](https://github.com/kamranayub/igdb-dotnet)

---

## 🔧 Installazione

### 📦 Prerequisiti

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js ≥16](https://nodejs.org/) & npm o yarn
- SQL Server
- Chiavi IGDB: `Client-ID` e `Client-Secret` (inserire in variabili d’ambiente)
- Secret JWT per autenticazione (inserire in variabili d’ambiente)

## Clona la repository:

```bash
git clone https://github.com/Purple-Rain-Hub/CAPSTONE.git

cd CAPSTONE
```

### Front-end

```bash
cd ../CAPSTONE-FE
npm install
npm run dev
```

### Back-end

1. Apri la soluzione "CAPSTONE-BE.sln" in Visual Studio

2. Configura "appsetting.json" con la tua stringa di connessione per SQL Server a "DefaultConnection"

3. Configura "appsetting.json" con il "ClientId" e il "ClientSecret" di IGDB

   > Per ottenere "ClientId" e "ClientSecret":
   >
   > 1. Accedi su [Twitch](https://dev.twitch.tv/login)
   > 2. Premi su "Registra l'applicazione"
   > 3. Inserisci un URL (es. https://localhost) e scegli come "Informazioni Riservate" come tipo di client
   > 4. Genera un nuovo segreto

4. Effettua la migrazione sul tuo DB

```bash
add-migration Initial
update-database
```

5. Avvia il progetto

---

### 🔮 Funzionalità future

- Logger per giochi "giocati" "da giocare" "sto giocando"
- Notifiche sulle nuove uscite

---

### 💻 Autore

Sviluppato da Manuel Palmieri

#### GitHub — [Purple-Rain-Hub](https://github.com/Purple-Rain-Hub)
