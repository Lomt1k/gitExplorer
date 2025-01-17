import "./_git-search.scss";
import { Input, Select } from "antd";
import { useState } from "react";
import GithubAPI from "../../api/GithubAPI";
import { SearchSortType } from "../../api/GithubTypes";

const GitSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sortType, setSortType] = useState(SearchSortType.Stars);
  const [searchText, setSearchText] = useState('');

  const handleChangeSortType = (type: SearchSortType) => {
    setSortType(type);
    tryFetch(searchText, type);
  }

  const handleSearch = (text: string) => {
    setSearchText(text);
    tryFetch(text, sortType);
  }

  const tryFetch = async (searchText: string, sortType: SearchSortType) => {
    if (searchText.length < 1) {
      return;
    }

    setIsLoading(true);
    await GithubAPI.fetchRepos(searchText, sortType);
    setIsLoading(false);
  }

  return (
    <div className="git-search">
      <Input.Search className="git-search__search" placeholder="Что искать на GitHub?" enterButton="Найти" size="large" autoFocus
        loading={isLoading} onSearch={(e) => handleSearch(e)} />
      <Select className="git-search__sort" defaultValue={SearchSortType.Stars} onChange={(e) => handleChangeSortType(e)} options={[
        { value: SearchSortType.Stars, label: <span>Самые популярные</span> },
        { value: SearchSortType.Forks, label: <span>Часто копируемые</span> },
        { value: SearchSortType.HelpWantedIssues, label: <span>Нуждаются в доработке</span> },
        { value: SearchSortType.Updated, label: <span>Недавно обновлённые</span> },
      ]} />
    </div>
  )
}

export default GitSearch;