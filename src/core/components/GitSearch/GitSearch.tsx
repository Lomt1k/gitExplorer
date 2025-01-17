import { Input } from "antd";
import { useState } from "react";
import GithubAPI from "../../api/GithubAPI";

const GitSearch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async(searchText: string) => {
    if (searchText.length < 1) {
      return;
    }
    
    setIsLoading(true);
    await GithubAPI.fetchRepos(searchText);
    setIsLoading(false);
  }

  return <Input.Search placeholder="Что будем искать?" enterButton="Искать" size="large" autoFocus loading={isLoading} onSearch={(e) => handleSearch(e)}/>
}

export default GitSearch;