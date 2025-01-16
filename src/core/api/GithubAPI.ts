import RootStore from "../store/RootStore";

class GithubAPI {
  private _baseUrl: string = 'https://api.github.com/search/repositories?';

  public async fetchRepos(searchText: string) {
    const searchParams = new URLSearchParams({
      q: searchText
    });

    try {
      const response = await fetch(this._baseUrl + searchParams);
      const data = await response.json();
      if (isRepoResponse(data)) {
        RootStore.repoStore.setRepos(data.items);
        return;
      }
    }
    catch (error) {
      console.error(error);
    }

    console.error('Произошла ошибка при попытке получить репозитории из API');
    RootStore.repoStore.setRepos([]);
  }
}

type RepoResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: RepositoryData[];
}

function isRepoResponse(obj: any): obj is RepoResponse {
  return typeof obj.total_count === 'number'
    && typeof obj.incomplete_results === 'boolean'
    && obj.items instanceof Array && (obj.items.length < 1 || isRepositoryData(obj.items[0]));
}

type RepositoryData = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  created_at: string;
  forks: number;
  stargazers_count: number;
}

function isRepositoryData(obj: any): obj is RepositoryData {
  return typeof obj.id === 'number'
    && typeof obj.name === 'string'
    && typeof obj.description === 'string'
    && typeof obj.html_url === 'string'
    && typeof obj.created_at === 'string'
    && typeof obj.forks === 'number'
    && typeof obj.stargazers_count === 'number';
}

export default new GithubAPI();
export type { RepositoryData };