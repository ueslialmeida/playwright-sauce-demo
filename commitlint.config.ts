import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Error, 'always' = enforcement rule, followed by the array of allowed types
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        'feat', // New test cases or framework features
        'fix', // Fixing a broken test or framework bug
        'docs', // Documentation changes (e.g., README)
        'style', // Formatting, missing semi-colons, etc.
        'refactor', // Refactoring test structures or Page Object Models (POMs)
        'test', // Adding missing tests or correcting existing tests
        'chore', // Updating build tasks, package dependencies, etc.
        'ci', // CI configuration changes (e.g., GitHub Actions, Jenkins)
      ],
    ],
  },
};

export default Configuration;
