// person.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { Person } from './Person';

describe('PersonController', () => {
  let app: INestApplication;
  let service: jest.Mocked<PersonService>;

  beforeAll(async () => {
    const serviceMock = {
      findAll: jest.fn(),
      findOneById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [{ provide: PersonService, useValue: serviceMock }],
    }).compile();

    app = module.createNestApplication();
    service = module.get(PersonService);
    await app.init();
  });

  afterAll(async () => await app.close());
  afterEach(() => jest.clearAllMocks());

  it('GET /person → sollte alle Personen zurückgeben', async () => {
    const persons: Person[] = [{ id: 1, vorname: 'Anna' } as Person];
    service.findAll.mockResolvedValue(persons);

    const res = await request(app.getHttpServer()).get('/person').expect(200);

    expect(res.body).toEqual(persons);
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('GET /person/:id → sollte eine Person zurückgeben', async () => {
    const person: Person = { id: 1, vorname: 'Anna' } as Person;
    service.findOneById.mockResolvedValue(person);

    const res = await request(app.getHttpServer()).get('/person/1').expect(200);

    expect(res.body).toEqual(person);
    expect(service.findOneById).toHaveBeenCalledWith('1');
  });

  it('POST /person → sollte eine neue Person erstellen', async () => {
    const person: Person = { id: 1, vorname: 'Ben' } as Person;
    service.create.mockResolvedValue(person);

    const res = await request(app.getHttpServer())
      .post('/person')
      .send(person)
      .expect(201);

    expect(res.body).toEqual(person);
    expect(service.create).toHaveBeenCalledWith(person);
  });

  it('PUT /person/:id → sollte eine Person updaten', async () => {
    const updated: Person = { id: 1, vorname: 'Anna Maria' } as Person;
    service.update.mockResolvedValue(updated);

    const res = await request(app.getHttpServer())
      .put('/person/1')
      .send(updated)
      .expect(200);

    expect(res.body).toEqual(updated);
    expect(service.update).toHaveBeenCalledWith('1', updated);
  });

  it('DELETE /person/:id → sollte Person löschen', async () => {
    service.remove.mockResolvedValue(undefined);

    await request(app.getHttpServer()).delete('/person/1').expect(200);

    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
