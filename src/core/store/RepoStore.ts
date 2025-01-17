import { makeAutoObservable } from "mobx";
import { RepositoryData } from "../api/GithubTypes";

class RepoStore {
  datas: RepositoryData[] = [];
  isLoading: boolean = false;
  hasBeenLoadings: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  addRepos(newDatas: RepositoryData[]) {
    this.datas = [...this.datas, ...newDatas];
    this.setLoadingState(false);
  }

  setRepos(newDatas: RepositoryData[], isLoading: boolean) {
    this.datas = newDatas;
    this.setLoadingState(isLoading);
  }

  setLoadingState(state: boolean) {
    this.isLoading = state;
    this.hasBeenLoadings = state ? true : this.hasBeenLoadings;
  }

  replace(id: number, newData: RepositoryData) {
    this.datas = this.datas.map(data => data.id === id ? newData : data);
  }

  remove(id: number) {
    this.datas = this.datas.filter(e => e.id !== id);
  }
}

export default RepoStore;