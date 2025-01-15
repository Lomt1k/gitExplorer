import RepoStore from "./RepoStore";

class RootStore {
  repoStore: RepoStore;

  constructor() {
    this.repoStore = new RepoStore();
  }
}

export default new RootStore();