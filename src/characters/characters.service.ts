import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

const disneyUrl = 'https://api.disneyapi.dev/character';

@Injectable()
export class CharactersService {
  async create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  // this handles all GET search filters, too
  async findAll(query: object) {
    console.log('service query: ', query);
    let search = '';

    // build the search string to call external api
    for (const prop in query) {
      console.log(`${prop}: ${query[prop]}`);
      // make sure the name is encoded and & at end
      search = search + `${prop}=${encodeURIComponent(query[prop])}&`;
    }

    console.log('search string: ', search);

    const completeDisneyUrl = `${disneyUrl}?${search}`;
    const res = await fetch(completeDisneyUrl);
    const charactersResponse = await res.json();
    return charactersResponse;
  }

  async findOne(id: number) {
    console.log('findOne id: ', id);

    const completeDisneyUrl = `${disneyUrl}/${id}`;
    const res = await fetch(completeDisneyUrl);
    const characterResponse = await res.json();
    return characterResponse;
  }

  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
