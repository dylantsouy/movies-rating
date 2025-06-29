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
        'feat',     // 新功能
        'fix',      // 修復 bug
        'docs',     // 文件更新
        'style',    // 代碼格式調整（不影響功能）
        'refactor', // 重構（既不是新功能也不是修復）
        'perf',     // 性能優化
        'test',     // 測試相關
        'chore',    // 雜項任務（構建、依賴管理等）
        'build',    // 構建系統或外部依賴變更
        'ci',       // CI 配置文件和腳本變更
        'revert'    // 回滾提交
      ]
    ],

    // 類型必須是小寫
    'type-case': [2, 'always', 'lower-case'],

    // 類型不能為空
    'type-empty': [2, 'never'],

    // 範圍格式：小寫，允許kebab-case
    'scope-case': [2, 'always', 'lower-case'],

    // 主題（描述）不能為空
    'subject-empty': [2, 'never'],

    // 主題格式：允許更靈活的格式
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],

    // 主題不能以句號結尾
    'subject-full-stop': [2, 'never', '.'],

    // 主題最大長度調整為更實用的 60 字符
    'subject-max-length': [2, 'always', 60],

    // 主題最小長度降低為 5 字符（更實際）
    'subject-min-length': [1, 'always', 5],

    // 標題最大長度調整為 80 字符（更現代的標準）
    'header-max-length': [2, 'always', 80],

    // 正文每行最大長度調整為 80 字符
    'body-max-line-length': [1, 'always', 80],

    // 正文前必須有空行
    'body-leading-blank': [1, 'always'],

    // 頁腳前必須有空行
    'footer-leading-blank': [1, 'always'],

    // 頁腳最大行長度
    'footer-max-line-length': [1, 'always', 100]
  }
};
