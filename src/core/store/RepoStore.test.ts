import { RepositoryData } from "../api/GithubTypes";
import RepoStore from "./RepoStore";

const repoStore: RepoStore = new RepoStore();
let lastId: number = 0;

function createFakeDatas(count: number): RepositoryData[] {
  const result: RepositoryData[] = [];
  for (let i = 0; i < count; i++) {
    result.push(createFakeData());
  }
  return result;
}

function createFakeData(): RepositoryData {
  return {
    id: ++lastId,
    name: `Repo ${Math.floor(Math.random() * 10_000)}`,
    html_url: 'https://test-repo.com',
    created_at: Date.now().toLocaleString(),
    forks: 0,
    stargazers_count: 0,
  };
}

let fakeDatas: RepositoryData[];
describe('Проверка функциональности RepoStore', () => {
  test('setRepos корректно устанавливает данные в пустой стор', () => {
    fakeDatas = createFakeDatas(30);
    repoStore.setRepos(fakeDatas, false);
    expect(repoStore.datas).toEqual(fakeDatas);
  })
  test('addRepos корректно добавляет новые данные к уже имеющимся', () => {
    const newFakeDatas = createFakeDatas(20);
    fakeDatas = [...fakeDatas, ...newFakeDatas];
    repoStore.addRepos(newFakeDatas);
    expect(repoStore.datas).toEqual(fakeDatas);
  })
  test('setRepos корректно заменяет старые данные на новые', () => {
    fakeDatas = createFakeDatas(50);
    repoStore.setRepos(fakeDatas, false);
    expect(repoStore.datas).toEqual(fakeDatas);
  })
  test('remove корректно удаляет нужную дату', () => {
    const ids: number[] = [ fakeDatas[0].id, fakeDatas[15].id, fakeDatas[fakeDatas.length - 1].id ]
    fakeDatas = fakeDatas.filter(e => !ids.includes(e.id));
    for (let id of ids) {
      repoStore.remove(id);
    }
    expect(repoStore.datas).toEqual(fakeDatas);
  })
  test('setLoadingState корректно устанавливает флаг загрузки', () => {
    repoStore.setLoadingState(true);
    expect(repoStore.isLoading).toBeTruthy();
    repoStore.setLoadingState(false);
    expect(repoStore.isLoading).toBeFalsy();
  });
  test('hasBeenLoadings корректно отображает - были ли загрузки ранее', () => {
    const tempStore = new RepoStore();
    expect(tempStore.hasBeenLoadings).toBeFalsy();
    tempStore.setLoadingState(true);
    tempStore.setLoadingState(false);
    expect(tempStore.hasBeenLoadings).toBeTruthy();
  });
})