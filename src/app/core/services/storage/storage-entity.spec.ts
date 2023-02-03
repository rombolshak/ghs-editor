import { StorageEntity, StorageEntityList } from './storage-entity';
import { switchMap } from 'rxjs';

interface TestModel {
  name: string;
}

describe('StorageEntity', () => {
  let entity: StorageEntity<TestModel>;

  beforeEach(() => {
    entity = new StorageEntity<TestModel>('test', { name: '' });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return null if not prevously saved', () => {
    entity.get().subscribe(data => expect(data).toBeNull());
  });

  it('should return saved data', () => {
    localStorage.setItem('test', JSON.stringify({ name: '123' }));
    entity.get().subscribe(data => {
      expect(data).toBeTruthy();
      expect(data?.name).toBe('123');
    });
  });

  it('should save data to storage', () => {
    entity.set({ name: 'test' }).subscribe(() => {
      const data = localStorage.getItem('test');
      expect(data).toBeTruthy();
      expect(JSON.parse(data!).name).toBe('test');
    });
  });

  it('should remove data from storage', () => {
    entity
      .set({ name: 'test' })
      .pipe(switchMap(() => entity.remove()))
      .subscribe(() => {
        expect(localStorage.getItem('test')).toBeNull();
      });
  });
});

describe('StorageEntityList', () => {
  let entityList: StorageEntityList<TestModel>;

  beforeEach(() => {
    entityList = new StorageEntityList<TestModel>('test', { name: '' });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return all subitems ids', () => {
    localStorage.setItem('test/1', JSON.stringify({ name: 1 }));
    localStorage.setItem('test/3', JSON.stringify({ name: 3 }));
    localStorage.setItem('test/2', JSON.stringify({ name: 2 }));
    entityList.getAllIds().subscribe(data => {
      expect(data.length).toBe(3);
      expect(data.every(id => ['1', '2', '3'].includes(id))).toBeTrue();
    });
  });
});
