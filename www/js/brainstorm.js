// brainstorm.js
// Logic for handling the Brainstorm page, triggered when it's loaded

function initBrainstormLogic() {
  console.log("🧠 Brainstorm logic initialized");

  const saveBtn = document.getElementById("saveBrainstorm");
  const input = document.getElementById("brainstormInput");
  const saveMessage = document.getElementById("saveMessage");

  if (!saveBtn || !input) return;

  saveBtn.addEventListener("click", () => {
    const rawText = input.value.trim();
    if (!rawText) return;

    // 🔍 Split the input by line and analyze each separately
    rawText
      .split(/\n|\r/) // split on new lines
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .forEach(line => processBrainstormInput(line));

    input.value = "";
    if (saveMessage) {
      saveMessage.classList.remove("hidden");
      setTimeout(() => saveMessage.classList.add("hidden"), 3000);
    }
  });
}

// ✅ Simple note parser with subject + deadline
function parseNote(text) {
  const regexDeadline = /(?:entro|scadenza|per)\s+(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)/i;
  const regexSubject = /(?:materia|subject|materia:)\s*(\w+)/i;

  const deadlineMatch = text.match(regexDeadline);
  const subjectMatch = text.match(regexSubject);

  const deadline = deadlineMatch ? parseDate(deadlineMatch[1]) : null;
  const subject = subjectMatch ? subjectMatch[1] : null;

  return {
    id: Date.now(),
    subject,
    description: text,
    deadline,
    created_at: new Date().toISOString()
  };
}

// ✅ Save note to backend
function saveNote(note) {
  postData("http://localhost:3000/brainstorm", note).then(data => {
    console.log("✅ Note saved:", data);
  }).catch(err => console.error("❌ Error saving note:", err));
}

// ✅ Save project to backend
function saveProject(project) {
  postData("http://localhost:3000/projects", project).then(data => {
    console.log("📁 Project saved:", data);
  }).catch(err => console.error("❌ Error saving project:", err));
}

// ✅ Save test and sessions to backend
function saveTestAndSessions({ test, sessions }) {
  postData("http://localhost:3000/tests", test).then(data => {
    console.log("🧪 Test saved:", data);
  });

  sessions.forEach(session => {
    postData("http://localhost:3000/sessions", session).then(data => {
      console.log("📚 Session saved:", data);
    });
  });
}

// ✅ Save general task to backend
function saveTask(task) {
  postData("http://localhost:3000/tasks", task)
    .then(data => console.log("✅ Task saved:", data))
    .catch(err => console.error("❌ Error saving task:", err));
}

// 🧠 Process a single line of input and trigger the appropriate saves
function processBrainstormInput(text) {
  const note = parseNote(text);
  saveNote(note);

  const testData = analyzeBrainstormInput(text);
  if (testData) saveTestAndSessions(testData);

  const project = analyzeProjectInput(text);
  if (project) saveProject(project);

  const isTask = /(compito|studia|esercizio|fare|completare)/i.test(text);
  if (isTask) {
    const task = createTask(note.description, note.deadline);
    saveTask(task);
  }

  return note;
}
