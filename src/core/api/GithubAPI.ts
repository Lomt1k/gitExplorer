import RootStore from "../store/RootStore";
import { isRepoResponse } from "./GithubTypes";

class GithubAPI {
  private _baseUrl: string = 'https://api.github.com/search/repositories?';
  private _itemsPerPage = 30;
  private _lastPage: number = 0;
  private _lastSearchParams: URLSearchParams | null = null;
  private _isNextPageAvailable: boolean = false;

  public async fetchRepos(searchText: string) {
    // если вдруг подгрузка уже идёт
    if (RootStore.repoStore.isLoading) {
      return;
    }

    this._lastPage = 1;
    this._lastSearchParams = new URLSearchParams({
      q: searchText,
      sort: 'stars',
      page: this._lastPage.toString()
    });

    try {
      this._isNextPageAvailable = false;
      RootStore.repoStore.setRepos([], true);
      const response = await fetch(this._baseUrl + this._lastSearchParams);
      const data = await response.json();
      if (isRepoResponse(data)) {
        RootStore.repoStore.setRepos(data.items, false);
        this._isNextPageAvailable = data.items.length >= this._itemsPerPage;
        return;
      }
    }
    catch (error) {
      console.error(error);
    }

    console.error('Произошла ошибка при попытке получить репозитории из API');
    RootStore.repoStore.setRepos([], false);
  }

  public async tryFetchNextPage() {
    // если вдруг еще не делали запрос первой страницы
    if (this._lastSearchParams == null) {
      return;
    }

    // если уже идёт подгрузка или уже загружены все страницы
    if (RootStore.repoStore.isLoading || !this._isNextPageAvailable) {
      return;
    }

    const nextSearchParams = new URLSearchParams({
      q: this._lastSearchParams.get('q')!,
      sort: this._lastSearchParams.get('sort')!,
      page: `${this._lastPage + 1}`
    });
    
    try {
      RootStore.repoStore.setLoadingState(true);
      const response = await fetch(this._baseUrl + nextSearchParams);
      const data = await response.json();
      if (isRepoResponse(data)) {
        this._isNextPageAvailable = data.items.length >= this._itemsPerPage;
        RootStore.repoStore.addRepos(data.items);
        this._lastSearchParams = nextSearchParams;
        this._lastPage++;
        return;
      }
    }
    catch (error) {
      console.error(error);
    }

    console.error('Произошла ошибка при попытке догрузить список репозиториев из API');
    RootStore.repoStore.setLoadingState(false);
  }
}

export default new GithubAPI();