export type RepoResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: RepositoryData[];
}

export function isRepoResponse(obj: any): obj is RepoResponse {
  return typeof obj.total_count === 'number'
    && typeof obj.incomplete_results === 'boolean'
    && obj.items instanceof Array && (obj.items.length < 1 || isRepositoryData(obj.items[0]));
}

export type RepositoryData = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  created_at: string;
  forks: number;
  stargazers_count: number;
}

export function isRepositoryData(obj: any): obj is RepositoryData {
  return typeof obj.id === 'number'
    && typeof obj.name === 'string'
    && typeof obj.description === 'string'
    && typeof obj.html_url === 'string'
    && typeof obj.created_at === 'string'
    && typeof obj.forks === 'number'
    && typeof obj.stargazers_count === 'number';
}
