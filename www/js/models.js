// 📁 models.js (frontend-ready version)

// 🧩 Task Model
function createTask(title, deadline = null, projectId = null, sessionId = null) {
    return {
      id: Date.now(),
      title,
      deadline,
      completed: false,
      type: "task",
      projectId,
      sessionId
    };
  }
  
  // 🧩 Test Model
  function createTest(subject, title, date, note = "") {
    return {
      id: Date.now(),
      subject,
      title,
      date,
      note,
      created_at: new Date().toISOString()
    };
  }
  
  // 🧩 Session Model
  function createSession(testId, title, date) {
    return {
      id: Date.now(),
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
  
  // 🧩 Project Model
  function createProject(title, deadline) {
    return {
      id: Date.now(),
      title,
      deadline,
      tasks: []
    };
  }
  
  function createProjectTask(title) {
    return {
      id: Date.now(),
      title,
      completed: false
    };
  }
  
  // 🧠 Bonus: Create 3 sessions backwards from test date
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
  
  // 🌐 Make models globally accessible in frontend
  window.createTask = createTask;
  window.createTest = createTest;
  window.createSession = createSession;
  window.createProject = createProject;
  window.createProjectTask = createProjectTask;
  window.generateSessionsForTest = generateSessionsForTest;
