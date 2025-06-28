module.exports = {
  // 繼承標準的 conventional commits 規範
  extends: ['@commitlint/config-conventional'],

  // 自定義規則
  rules: {
    // commit 類型必須是以下之一
    'type-enum': [
      2, // 錯誤級別：0=disable, 1=warning, 2=error
      'always',
      [
        'feat', // 新功能
        'fix', // 修復 bug
        'docs', // 文件更新
        'style', // 代碼格式調整（不影響功能）
        'refactor', // 重構（既不是新功能也不是修復）
        'perf', // 性能優化
        'test', // 測試相關
        'chore', // 雜項任務（構建、依賴管理等）
        'build', // 構建系統或外部依賴變更
        'ci' // CI 配置文件和腳本變更
      ]
    ],

    // 類型必須是小寫
    'type-case': [2, 'always', 'lower-case'],

    // 類型不能為空
    'type-empty': [2, 'never'],

    // 範圍格式：小寫
    'scope-case': [2, 'always', 'lower-case'],

    // 主題（描述）不能為空
    'subject-empty': [2, 'never'],

    // 主題格式：不能是 start-case, pascal-case, upper-case
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],

    // 主題不能以句號結尾
    'subject-full-stop': [2, 'never', '.'],

    // 主題最大長度 50 字符（GitHub 顯示最佳實踐）
    'subject-max-length': [2, 'always', 50],

    // 主題最小長度 10 字符（確保描述性）
    'subject-min-length': [1, 'always', 10],

    // 標題（type + scope + subject）最大長度 72 字符
    'header-max-length': [2, 'always', 72],

    // 正文每行最大長度 72 字符
    'body-max-line-length': [2, 'always', 72],

    // 正文前必須有空行
    'body-leading-blank': [2, 'always'],

    // 頁腳前必須有空行
    'footer-leading-blank': [2, 'always'],

    // 頁腳最大行長度
    'footer-max-line-length': [2, 'always', 100]
  }
};
