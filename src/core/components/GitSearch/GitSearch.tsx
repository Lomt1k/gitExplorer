import { Input } from "antd";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import GithubAPI from "../../api/GithubAPI";

const GitSearch = observer(() => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async(searchText: string) => {
    setIsLoading(true);
    await GithubAPI.fetchRepos(searchText);
    setIsLoading(false);
  }

  return <Input.Search placeholder="Что будем искать?" enterButton="Искать" size="large" loading={isLoading} onSearch={(e) => handleSearch(e)}/>
})

export default GitSearch;