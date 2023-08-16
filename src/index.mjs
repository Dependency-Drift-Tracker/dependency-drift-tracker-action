import core from '@actions/core';
import simpleGit from 'simple-git';
import { main as dependencyDriftTracker } from 'dependency-drift-tracker';
import { version } from 'node:process';

export async function main() {
  core.error(version);

  const git = simpleGit();
  await dependencyDriftTracker();
  await commitChange(git);
  await pushChange(git);
}

export async function commitChange(simpleGit) {
  const userName = core.getInput('user-name');
  await simpleGit.addConfig('user.name', userName);
  const userEmail = core.getInput('user-email');
  await simpleGit.addConfig('user.email', userEmail);
  await simpleGit.add('data');
  const commitMessage = core.getInput('commit-message');
  await simpleGit.commit(commitMessage);
}

export async function pushChange(simpleGit) {
  await simpleGit.push();
}
