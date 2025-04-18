// parser.js
// Functions to extract structured entities from free text (brainstorm notes)

// ✅ Extract test from a sentence
function analyzeBrainstormInput(text) {
  const testRegex = /(verifica|test)\s+di\s+(\w+).*(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)/i;

  const match = text.match(testRegex);
  if (!match) return null;

  const [, , subject, date] = match;
  const parsedDate = parseDate(date);
  const title = `Verifica di ${subject}`;

  const test = createTest(subject, title, parsedDate);
  const sessions = generateSessionsForTest(test.id, title, parsedDate);

  return { test, sessions };
}

// ✅ Extract project and its tasks from a sentence
function analyzeProjectInput(text) {
  const projectRegex = /progetto\s+(.+?)(?:\s+entro\s+(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?))?(?::\s*(.+))?$/i;

  const match = text.match(projectRegex);
  if (!match) return null;

  const rawTitle = match[1].trim();
  const deadline = match[2] ? parseDate(match[2]) : null;
  const taskListRaw = match[3];

  const project = createProject(rawTitle, deadline);

  if (taskListRaw) {
    const taskTitles = taskListRaw.split(',').map(t => t.trim()).filter(Boolean);
    project.tasks = taskTitles.map(title => createProjectTask(title));
  }

  return project;
}