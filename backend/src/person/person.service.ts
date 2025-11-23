import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './Person';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async create(person: Person): Promise<Person> {
    return this.personRepository.save(person);
  }

  async remove(id: number): Promise<void> {
    const result = await this.personRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Person mit ID ${id} wurde nicht gefunden`);
    }
  }

  async findOneById(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({ where: { id } });
    if (!person) {
      throw new NotFoundException(`Person mit ID ${id} wurde nicht gefunden`);
    }
    return person;
  }

  async update(id: number, updateData: Partial<Person>): Promise<Person> {
    const person = await this.findOneById(id);
    Object.assign(person, updateData);
    return this.personRepository.save(person);
  }
}
