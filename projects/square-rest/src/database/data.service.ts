import { InMemoryDbService } from 'angular-in-memory-web-api';

export class DataService implements InMemoryDbService {
  createDb() {
    const acteurs = [
      { id: 1, nom: 'Auteuil' },
      { id: 2, nom: 'Depardieu' },
    ];
    return { acteurs };
  }
}