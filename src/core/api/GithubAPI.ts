import RootStore from "../store/RootStore";
import { message } from "antd";
import { isErrorMessageResponse, isRepoResponse, SearchSortType } from "./GithubTypes";

class GithubAPI {
  private _baseUrl: string = 'https://api.github.com/search/repositories?';
  private _itemsPerPage = 30;
  private _lastPage: number = 0;
  private _lastSearchParams: URLSearchParams | null = null;
  private _isNextPageAvailable: boolean = false;

  public async fetchRepos(searchText: string, sortType: SearchSortType = SearchSortType.Stars) {
    // если вдруг подгрузка уже идёт
    if (RootStore.repoStore.isLoading) {
      return;
    }

    this._lastPage = 1;
    this._lastSearchParams = new URLSearchParams({
      q: searchText,
      sort: sortType,
      per_page: `${this._itemsPerPage}`,
      page: `${this._lastPage}`,
    });

    try {
      this._isNextPageAvailable = false;
      RootStore.repoStore.setRepos([], true);
      const response = await fetch(this._baseUrl + this._lastSearchParams);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(isErrorMessageResponse(data) ? data.message : `${response.status}: ${response.statusText}`);
      }
      if (isRepoResponse(data)) {
        RootStore.repoStore.setRepos(data.items, false);
        this._isNextPageAvailable = data.items.length >= this._itemsPerPage;
        return;
      }
      throw new Error('Пришел непонятный ответ от сервера');
    }
    catch (error) {
      console.error(error);
      if (error instanceof Error) {
        message.error(error.message, 5);
      }
      RootStore.repoStore.setLoadingState(false);
    }
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
      per_page: `${this._itemsPerPage}`,
      page: `${this._lastPage + 1}`
    });
    
    try {
      RootStore.repoStore.setLoadingState(true);
      const response = await fetch(this._baseUrl + nextSearchParams);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(isErrorMessageResponse(data) ? data.message : `${response.status}: ${response.statusText}`);
      }
      if (isRepoResponse(data)) {
        this._isNextPageAvailable = data.items.length >= this._itemsPerPage;
        RootStore.repoStore.addRepos(data.items);
        this._lastSearchParams = nextSearchParams;
        this._lastPage++;
        return;
      }
      throw new Error('Пришел непонятный ответ от сервера');
    }
    catch (error) {
      console.error(error);
      if (error instanceof Error) {
        message.error(error.message, 5);
      }
      RootStore.repoStore.setLoadingState(false);
    }
  }
}

export default new GithubAPI();