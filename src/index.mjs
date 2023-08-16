import { access, constants } from 'node:fs/promises';
import core from '@actions/core';
import simpleGit from 'simple-git';
import { main as dependencyDriftTracker } from 'dependency-drift-tracker';
import { cwd } from 'node:process';

export async function main() {
  const basePath = cwd();
  const filePath = join(basePath, 'data', `data/history-github-com-indoorequal-mapbox-gl-indoorequal-git-.json`);
  try {
    await access(filePath, constants.F_OK);
  } catch (e) {
    core.error(`Exception ${e}`);
  }

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
