import simpleGit from 'simple-git';
import { main as dependencyDriftTracker } from 'dependency-drift-tracker';

export async function main() {
  const git = simpleGit();
  await dependencyDriftTracker();
  await commitChange(git);
  await pushChange(git);
}

export async function commitChange(simpleGit) {
  await simpleGit.addConfig('user.name', 'Dependency drift tracker');
  await simpleGit.addConfig('user.email', 'dependency-drift-tracker@users.noreply.github.com');
  await simpleGit.add('data');
  await simpleGit.commit('Update data');
}

export async function pushChange(simpleGit) {
  await simpleGit.push();
}
