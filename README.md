🤓 DOOT DOOT è un'app pensata per STUDENTI fatta da STUDENTI.
Ti aiutemero a organizzare il tuo lavoro e il tuo studio con un SEMPLICISSIMO sistema produttivo, ti daremo a disposizione DOPAMINA con il sistema a livelli e statistiche e un piccolo aiuto da parte di un'AI che sarà sempre accanto a te!


-------------------------------------------------------------------------------------------------------------------------------
📚 STUDY APP – STRUTTURA DEL PROGETTO E WORKFLOW COMPLETO
🔹 1. Punto di partenza – Pagina Brainstorm
🧠 Funzione:

La pagina Brainstorm (ispirata al metodo Time-Boxing) permette all’utente di scrivere liberamente tutti i compiti, verifiche, progetti o idee da svolgere.
📦 Output:

Ogni voce viene analizzata e convertita in una di queste entità:

    Task (es. “Fare esercizi di TPSI”)

    Test (es. “Verifica di storia il 22/04”)

    Project (es. “Creare sito portfolio entro maggio”)

Queste entità vengono salvate nel database e poi, al momento giusto, anche nel Google Calendar.
🔹 2. Gestione dei Test → Retrospective Revision Timetable (Ali Abdaal)
📌 Quando viene riconosciuto un test (es. "verifica di storia il 22/04"):

    Viene creata un’entità Test:

{
  "id": 1,
  "title": "Verifica di storia",
  "date": "2025-04-22"
}

Vengono generate automaticamente 3 sessioni di studio, a ritroso dalla data del test:

    {
      "sessions": [
        { "id": 101, "test_id": 1, "title": "Ripasso Capitolo 1", "date": "2025-04-20" },
        { "id": 102, "test_id": 1, "title": "Quiz e ripasso Capitolo 2", "date": "2025-04-21" },
        { "id": 103, "test_id": 1, "title": "Rilettura e tecniche attive", "date": "2025-04-22" }
      ]
    }

    Dopo ogni sessione, viene richiesto un feedback retrospettivo (vedi punto 5).

🔹 3. Gestione dei Progetti
✏️ Esempio:

Progetto TPSI:
- Creare backend
- Scrivere documentazione
- Fare presentazione orale

📦 Struttura consigliata:

{
  "projects": [
    {
      "id": 1,
      "title": "TPSI",
      "deadline": "2025-05-10",
      "tasks": [
        { "title": "Scrivere il backend", "completed": false },
        { "title": "Documentazione PDF", "completed": false },
        { "title": "Presentazione orale", "completed": false }
      ]
    }
  ]
}

I task dei progetti vengono inseriti automaticamente nella ToDo list giornaliera.
🔹 4. Pagina TASKS / TO-DO LIST

    ✅ Mostra task del giorno e della settimana

    📌 Modalità checklist minimale

    🔁 Se una task non viene completata, può essere reschedulata automaticamente

    ⏱ Quando si avvia una sessione di studio, si apre un pomodoro timer stile Forest

🔹 5. Studio con Feedback → Visual Process Mapping (Justin Sung)
🎯 Durante ogni sessione di studio:

L’utente risponde a domande rapide:
📌 PRIMA della sessione:

    WHEN: Quando stai studiando? (orario/giorno)

    WHAT: Che metodo/strumento stai usando? (es. Feynman, Quizlet, musica lo-fi)

    WHY: Perché proprio questo? (motivazione)

📌 DOPO la sessione:

    CERTAINTY: Com'è la tua sicurezza sugli argomenti?
    (slider o opzioni: Definite, Maybe, Not sure, Definitely not)

🔁 Il sistema riprogramma automaticamente una nuova sessione se la sicurezza è bassa (Ali Abdaal method).
🔹 6. CHAT PAGE – AI Study Coach

Un’intelligenza artificiale allenata a:

    📊 Analizzare le abitudini di studio

    💡 Suggerire metodi alternativi (es. “Hai mai provato la tecnica Feynman?”)

    🎯 Motivare l’utente (“La tua disciplina è migliorata del 12% questa settimana!”)

    🧠 Rispondere a domande (“Come preparo un'interrogazione in poco tempo?”)

🔹 7. STATS PAGE – Sistema motivazionale
📊 4 Metriche principali:
Metrica	Descrizione	Note
Focus	% del tempo speso studiando davvero rispetto a quanto pianificato	Si può chiedere: “Ti sei distratto?”
Disciplina	Rispetto delle scadenze	Bonus se recuperi task in ritardo
Efficienza	Quanto è stato utile il tempo speso?	Si basa su autovalutazione post-sessione
Dedizione	Uso attivo dell’app	Conta solo interazioni significative
💡 Miglioramenti motivazionali:
✅ 1. Suggerimenti automatici

    “Il tuo Focus è calato. Prova sessioni da 25 minuti.”

✅ 2. Trend settimanali e badge

    “📈 +15% Efficienza questa settimana – ben fatto!”

✅ 3. Correlazioni con risultati scolastici

Se l’utente inserisce i voti:

    “Hai usato la tecnica Pomodoro → voto alto. Continua così!”

🧠 CONSIDERAZIONI FINALI E PROPOSTE
Possibile Problema	| Soluzione
Feedback noioso	| Slider / emoji rapidi
Statistiche basse = demotivazione	| Mostrare progressi, non punizioni
Sistema complesso	| Mostrare solo il necessario, extra opzionali
Tentativo di “fregare il sistema”	| Correlare feedback soggettivo con dati oggettivi (es. tempo reale)

RELAZIONE TRA I DATI
Relazione / Esempio
Task ←→ Project	un task può appartenere a un progetto
Session ←→ Test	una sessione è sempre legata a un test
Task ←→ Session	una sessione può essere registrata anche come task, es: "Sessione di ripasso"

-------------------------------------------------------------------------------------------------------------------------------
# Configurazione
## 🛠️ 1. **Verifica cosa è già installato**

Apri un terminale (PowerShell o CMD) e digita:

```bash
node -v
npm -v
cordova -v
```

Se ti dice **“command not found”** o qualcosa del genere, allora devi installarli.

## 📦 2. **Installa Node.js + npm**

Vai su 👉 [https://nodejs.org](https://nodejs.org) e scarica la **versione LTS**.  
Durante l’installazione:
- ✅ Spunta “Add to PATH”
- ✅ Spunta anche “Install necessary tools” se te lo chiede

## 📲 3. **Installa Cordova**

Una volta installato Node, nel terminale digita:

```bash
npm install -g cordova
```

Questo renderà `cordova` disponibile ovunque.

## 📁 4. **Porta il tuo progetto nella cartella**

Se hai un file `.zip`:
- Estrailo in una cartella facile da raggiungere, tipo `C:\Users\tuo-nome\Documents\studyApp`

Altrimenti, se usi Git:

```bash
git clone https://github.com/tuo-progetto.git
```

## ✅ 5. **Installa le dipendenze locali**

Nel terminale, entra nella cartella del progetto:

```bash
cd C:\Users\tuo-nome\Documents\studyApp
```

Poi:

```bash
npm install
```

_(anche se non hai molte dipendenze, è buona pratica)_

## 🌐 6. **Avvia il backend (server.js)**

Se usi `server.js` come backend locale:

```bash
cd backend
node server.js
```

⚠️ Assicurati che esista il file `backend_data/data.json`, anche vuoto!

## 📱 7. **Avvia il frontend**

Torna nella cartella principale del progetto e avvia Cordova in modalità browser:

```bash
cordova platform add browser
cordova run browser
```

Se vuoi usare il livereload:

```bash
cordova run browser --livereload
```

## 🧪 8. **Test finale**

- Apri [http://localhost:8000](http://localhost:8000)
- Testa la pagina `brainstorm`
- Verifica i salvataggi nel file `data.json`
