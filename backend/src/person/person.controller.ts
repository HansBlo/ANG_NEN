import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './Person';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personService.findOneById(id);
  }

  @Post()
  create(@Body() person: Person) {
    return this.personService.create(person);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.personService.remove(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() person: Person) {
    return this.personService.update(id, person);
  }
}
