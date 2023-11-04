import { cpSync } from 'node:fs';
import core from '@actions/core';
import simpleGit from 'simple-git';
import { main as dependencyDriftTracker, generateWebsite as dependencyDriftTrackerGenerateWebsite } from 'dependency-drift-tracker';

export async function main() {
  const command = core.getInput('command');
  switch (command) {
  case 'update-data':
    exportSecretsAsEnvironmentVariables();
    await updateData();
    break;
  case 'generate-website':
    await generateWebsite();
  }
}

function exportSecretsAsEnvironmentVariables() {
  const secretsJson = core.getInput('secrets');
  let secrets = {};
  try {
    secrets = JSON.parse(secretsJson);
  } catch (e) {}

  for (const [key, value] of Object.entries(secrets)) {
    process.env[key] = value;
  }
}

async function updateData() {
  const git = simpleGit();
  await dependencyDriftTracker();
  await commitDataChange(git);
  await pushChange(git);
}

async function commitDataChange(simpleGit) {
  const userName = core.getInput('user-name');
  await simpleGit.addConfig('user.name', userName);
  const userEmail = core.getInput('user-email');
  await simpleGit.addConfig('user.email', userEmail);
  await simpleGit.add('data');
  const commitMessage = core.getInput('commit-message');
  await simpleGit.commit(commitMessage);
}

async function commitWebsite(simpleGit) {
  const userName = core.getInput('user-name');
  await simpleGit.addConfig('user.name', userName);
  const userEmail = core.getInput('user-email');
  await simpleGit.addConfig('user.email', userEmail);
  await simpleGit.add('docs');
  const commitMessage = 'Update website';
  await simpleGit.commit(commitMessage);
}

async function pushChange(simpleGit) {
  await simpleGit.push();
}

async function generateWebsite() {
  const githubRepository = process.env.GITHUB_REPOSITORY;
  const url = `https://raw.githubusercontent.com/${githubRepository}/main`;

  try {
    const distDir = await dependencyDriftTrackerGenerateWebsite(url);
    cpSync(distDir, './docs', { recursive: true });
    await pushWebsite();
  } catch (err) {
    core.error(err);
  }
}

async function pushWebsite() {
  const git = simpleGit();
  await commitWebsite(git);
  await pushChange(git);
}
