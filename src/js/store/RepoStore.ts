import { makeAutoObservable } from "mobx";
import { RepositoryData } from "../GithubAPI";

class RepoStore {
  repos: RepositoryData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addRepos(newRepos: RepositoryData[]) {
    console.log('addRepos', newRepos);
    this.repos = [...this.repos, ...newRepos];
  }

  setRepos(newRepos: RepositoryData[]) {
    console.log('setRepos', newRepos);
    this.repos = newRepos;
  }
}

export default RepoStore;