/**
 * Exportação de todas as tools do MCP Server
 */

export { gitCloneTool, executeGitClone } from './clone.js';
export { gitStatusTool, executeGitStatus } from './status.js';
export { gitCommitTool, executeGitCommit } from './commit.js';
export { gitPushTool, executeGitPush } from './push.js';
export { gitPullTool, executeGitPull } from './pull.js';
export { gitBranchTool, executeGitBranch } from './branch.js';
export { gitCheckoutTool, executeGitCheckout } from './checkout.js';

// Lista de todas as tools disponíveis
export const allTools = [
  'git_clone',
  'git_status',
  'git_commit',
  'git_push',
  'git_pull',
  'git_branch',
  'git_checkout'
];

// Made with Bob
