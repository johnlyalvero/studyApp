// models.js
// This file contains factory functions to generate data structures (Task, Test, Session, Project)

// ✅ Create a generic task
function createTask(title, deadline = null, projectId = null, sessionId = null) {
  return {
    id: generateId(),
    title,
    deadline,
    completed: false,
    type: "task",
    projectId,
    sessionId
  };
}

// ✅ Create a test entity
function createTest(subject, title, date, note = "") {
  return {
    id: generateId(),
    subject,
    title,
    date,
    note,
    created_at: new Date().toISOString()
  };
}

// ✅ Create a session associated with a test
function createSession(testId, title, date) {
  return {
    id: generateId(),
    testId,
    title,
    date,
    completed: false,
    feedback: {
      certainty: null,
      distraction: null,
      effectiveness: null,
      notes: ""
    }
  };
}

// ✅ Create a project container
function createProject(title, deadline) {
  return {
    id: generateId(),
    title,
    deadline,
    tasks: []
  };
}

// ✅ Create a task within a project
function createProjectTask(title) {
  return {
    id: generateId(),
    title,
    completed: false
  };
}

// ✅ Generate 3 sessions from a test date (Ali Abdaal method)
function generateSessionsForTest(testId, baseTitle, testDateStr) {
  const sessions = [];
  const testDate = new Date(testDateStr);

  for (let i = 3; i > 0; i--) {
    const sessionDate = new Date(testDate);
    sessionDate.setDate(sessionDate.getDate() - i);

    sessions.push(
      createSession(
        testId,
        `${baseTitle} - Session ${4 - i}`,
        sessionDate.toISOString().split("T")[0]
      )
    );
  }

  return sessions;
}

// Generate a unique ID for tasks, tests, sessions, and projects
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

// Export functions to global scope
window.createTask = createTask;
window.createTest = createTest;
window.createSession = createSession;
window.createProject = createProject;
window.createProjectTask = createProjectTask;
window.generateSessionsForTest = generateSessionsForTest;