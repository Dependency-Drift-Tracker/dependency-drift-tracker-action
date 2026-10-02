import { cpSync } from 'node:fs';
import { getInput, error } from '@actions/core';
import simpleGit from 'simple-git';
import { main as dependencyDriftTracker, generateWebsite as dependencyDriftTrackerGenerateWebsite } from 'dependency-drift-tracker';

const websiteDir = 'website';

export async function main() {
  const command = getInput('command');
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
  const secretsJson = getInput('secrets');
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
  const userName = getInput('user-name');
  await simpleGit.addConfig('user.name', userName);
  const userEmail = getInput('user-email');
  await simpleGit.addConfig('user.email', userEmail);
  await simpleGit.add('data');
  const commitMessage = getInput('commit-message');
  await simpleGit.commit(commitMessage);
}

async function commitWebsite(simpleGit) {
  const userName = getInput('user-name');
  await simpleGit.addConfig('user.name', userName);
  const userEmail = getInput('user-email');
  await simpleGit.addConfig('user.email', userEmail);
  await simpleGit.add(websiteDir);
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
    cpSync(distDir, `./${websiteDir}`, { recursive: true });
    await pushWebsite();
  } catch (err) {
    error(err);
  }
}

async function pushWebsite() {
  const git = simpleGit();
  await commitWebsite(git);
  await git.raw(['subtree', 'split', '--prefix', websiteDir, '--branch', 'gh-pages']);
  await git.raw(['push', '--force', 'origin', 'gh-pages:gh-pages']);
}
