import { makeAutoObservable } from "mobx";
import { RepositoryData } from "../api/GithubTypes";

class RepoStore {
  datas: RepositoryData[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  addRepos(newDatas: RepositoryData[]) {
    this.datas = [...this.datas, ...newDatas];
    this.isLoading = false;
  }

  setRepos(newDatas: RepositoryData[], isLoading: boolean) {
    this.datas = newDatas;
    this.isLoading = isLoading;
  }

  setLoadingState(state: boolean) {
    this.isLoading = state;
  }
}

export default RepoStore;