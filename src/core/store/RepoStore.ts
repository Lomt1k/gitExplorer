import { makeAutoObservable } from "mobx";
import { RepositoryData } from "../api/GithubAPI";

class RepoStore {
  datas: RepositoryData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addRepos(newDatas: RepositoryData[]) {
    this.datas = [...this.datas, ...newDatas];
  }

  setRepos(newDatas: RepositoryData[]) {
    this.datas = newDatas;
  }
}

export default RepoStore;