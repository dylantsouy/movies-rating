import inquirer from 'inquirer';

/** 類型定義 */
const types = [
  { value: 'feat', name: 'feat: 新功能' },
  { value: 'fix', name: 'fix: Bug修復' },
  { value: 'docs', name: 'docs: 文檔改變（README、API 說明等）' },
  { value: 'style', name: 'style: 代碼格式調整（不影響功能）' },
  { value: 'refactor', name: 'refactor: 重構（既不是新功能也不是修復）' },
  { value: 'perf', name: 'perf: 性能優化' },
  { value: 'test', name: 'test: 測試相關' },
  { value: 'chore', name: 'chore: 雜項任務（構建、依賴管理等）' },
  { value: 'build', name: 'build: 構建系統或外部依賴變更' },
  { value: 'ci', name: 'ci: CI 配置文件和腳本變更' }
];

const scopes = [
  'pages',
  'components',
  'ui',
  'auth',
  'api',
  'config',
  'security',
  'test',
  'locales',
  'deps',
  'setup'
];

/** 建構 Commit Message */
function buildCommitMessage(answers) {
  const { type, scope, customScope, subject, body, breaking, signedOffBy, closes, refs } = answers;

  // Header
  let header = type;
  const finalScope = scope === 'custom' ? customScope : scope;

  if (finalScope) {
    header += `(${finalScope})`;
  }

  header += `: ${subject}`;
  let commitMessage = header;

  // Body
  if (body) {
    const formattedBody = body
      .split('|')
      .map((line) => line.trim())
      .filter((line) => line && line !== 'N/A')
      .join('\n');

    if (formattedBody) {
      commitMessage += '\n\n' + formattedBody;
    }
  }

  const footerLines = [];

  // Always include these, fallback to N/A
  footerLines.push(`BREAKING CHANGE: ${breaking || 'N/A'}`);
  footerLines.push(`Closes: ${closes || 'N/A'}`);
  footerLines.push(`Refs: ${refs || 'N/A'}`);
  footerLines.push(`Signed-off-by: ${signedOffBy || 'N/A'}`);

  // 添加 footer，確保前面有足夠的空白行
  if (footerLines.length > 0) {
    const hasBodyContent =
      body && body.split('|').some((line) => line.trim() && line.trim() !== 'N/A');

    const separator = hasBodyContent ? '\n\n' : '\n\n';
    commitMessage += separator + footerLines.join('\n');
  }

  return commitMessage;
}

// 匯出 prompter
export const prompter = (cz, commit) => {
  const questions = [
    {
      type: 'list',
      name: 'type',
      message: '選擇你要提交的變更類型:',
      choices: types
    },
    {
      type: 'list',
      name: 'scope',
      message: '此變更的影響範圍 (可選):',
      choices: [
        ...scopes.map((s) => ({ name: s, value: s })),
        { name: '自定義', value: 'custom' },
        { name: '跳過', value: '' }
      ]
    },
    {
      type: 'input',
      name: 'customScope',
      message: '請輸入自定義的影響範圍:',
      when: (answers) => answers.scope === 'custom'
    },
    {
      type: 'input',
      name: 'subject',
      message: '簡短描述此變更 (必填):',
      validate: (input) => input.length > 0 || '主題不能為空'
    },
    {
      type: 'input',
      name: 'body',
      message: '詳細描述此變更 (可選，使用 "|" 分行):'
    },
    {
      type: 'input',
      name: 'signedOffBy',
      message: 'Signed-off-by: 請輸入你的全名和 email (例如: Dylan Tsou <bear817005@gmail.com>):',
      validate: (input) => {
        if (!input) return '此欄位為 21 CFR Part 11 合規要求，不能為空';
        const emailRegex = /^.+\s+<.+@.+\..+>$/;
        return emailRegex.test(input) || '格式應為: FullName <email@domain.com>';
      }
    },
    {
      type: 'input',
      name: 'breaking',
      message: '列出所有的 BREAKING CHANGES (可選，使用 "|" 分行):'
    },
    {
      type: 'input',
      name: 'closes',
      message: 'Closes: 請輸入要關閉的 issue 編號 (可選，例如: #123):'
    },
    {
      type: 'input',
      name: 'refs',
      message: 'Refs: 請輸入追蹤的規格文件 (可選，例如: SRS-101, SIT-034, RM-001):'
    },
    {
      type: 'confirm',
      name: 'confirmCommit',
      message: (answers) => {
        const preview = buildCommitMessage(answers);
        return `\n${preview}\n\n確定要提交以上的 commit 嗎?`;
      },
      default: true
    }
  ];

  inquirer.prompt(questions).then((answers) => {
    if (answers.confirmCommit) {
      const message = buildCommitMessage(answers);
      commit(message);
    } else {
      console.log('取消提交');
    }
  });
};
