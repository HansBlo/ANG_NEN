// person.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './Person';
import { NotFoundException } from '@nestjs/common';

describe('PersonService', () => {
  let service: PersonService;
  let repo: jest.Mocked<Repository<Person>>;

  beforeEach(async () => {
    const repoMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        { provide: getRepositoryToken(Person), useValue: repoMock },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
    repo = module.get(getRepositoryToken(Person));
  });

  afterEach(() => jest.clearAllMocks());

  it('findAll() → sollte alle Personen zurückgeben', async () => {
    const persons = [{ id: 1, vorname: 'Anna' }] as Person[];
    repo.find.mockResolvedValue(persons);

    const result = await service.findAll();
    expect(result).toEqual(persons);
    expect(repo.find).toHaveBeenCalledTimes(1);
  });

  it('create() → sollte eine neue Person speichern', async () => {
    const person = { id: 1, vorname: 'Ben' } as Person;
    repo.save.mockResolvedValue(person);

    const result = await service.create(person);
    expect(result).toEqual(person);
    expect(repo.save).toHaveBeenCalledWith(person);
  });

  it('remove() → sollte Person löschen, wenn vorhanden', async () => {
    repo.delete.mockResolvedValue({ affected: 1, raw: undefined });

    await service.remove(1);
    expect(repo.delete).toHaveBeenCalledWith(1);
  });

  it('remove() → sollte NotFoundException werfen, wenn Person nicht existiert', async () => {
    repo.delete.mockResolvedValue({ affected: 0, raw: undefined });

    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });

  it('findOneById() → sollte eine Person zurückgeben', async () => {
    const person = { id: 1, vorname: 'Anna' } as Person;
    repo.findOne.mockResolvedValue(person);

    const result = await service.findOneById(1);
    expect(result).toEqual(person);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('findOneById() → sollte NotFoundException werfen, wenn Person nicht existiert', async () => {
    repo.findOne.mockResolvedValue(null);

    await expect(service.findOneById(42)).rejects.toThrow(NotFoundException);
  });

  it('update() → sollte Person updaten', async () => {
    const existing = { id: 1, vorname: 'Anna', nachname: 'Müller' } as Person;
    const updated = { vorname: 'Anna Maria' };
    repo.findOne.mockResolvedValue(existing);
    repo.save.mockResolvedValue({ ...existing, ...updated });

    const result = await service.update(1, updated);
    expect(result.vorname).toBe('Anna Maria');
    expect(repo.save).toHaveBeenCalled();
  });
});
