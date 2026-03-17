const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// API placeholder for live demo/code simulation

app.post('/api/git-demo', (req, res) => {
  const { command } = req.body;
  const responses = {
    'git status': `On branch main\nnothing to commit, working tree clean`,
    'git init': `Initialized empty Git repository in /demo-project/.git/`,
    'git add .': ``,
    'git commit -m "Initial commit"': `[main (root-commit) abc1234] Initial commit\n 1 file changed, 1 insertion(+)\n create mode 100644 index.txt`,
    'git log': `commit abc1234 (HEAD -> main)\nAuthor: Your Name <your@email.com>\nDate:   Today\n\n    Initial commit`,
    'git branch': `* main`,
    'git checkout -b feature1': `Switched to a new branch 'feature1'`,
    'git checkout main': `Switched to branch 'main'`,
    'git push': `Everything up-to-date`,
    'git pull': `Already up to date.`,
    'git remote add origin <repo-link>': ``,
    'git clone <repo-link>': `Cloning into 'repo-name'...\ndone.`,
    'git revert abc1234': `[main abc1234] Revert "Initial commit"\n 1 file changed, 1 deletion(-)`,
    'git reset --hard abc1234': `HEAD is now at abc1234 Initial commit`,
  };

  // Normalize command for matching
  const normalized = command.trim().replace(/\s+/g, ' ');
  let output = responses[normalized];

  if (output !== undefined) {
    res.json({ output: output || `Command ran successfully.` });
    return;
  }

  // Suggest closest valid command if possible
  const validCommands = Object.keys(responses);
  const suggestion = validCommands.find(cmd => {
    // Simple suggestion: starts with same word
    return cmd.split(' ')[1] === normalized.split(' ')[1];
  });

  if (suggestion) {
    res.json({ output: `⚠️ Unknown or invalid command. Did you mean: \n${suggestion}` });
  } else {
    res.json({ output: `❌ Unknown or invalid command. Please try a valid git command.` });
  }
});

// Serve frontend (build) in production
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
