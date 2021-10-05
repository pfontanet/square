import { TestBed } from '@angular/core/testing';
import { Entity, RepositoryInterface, RepositoryService } from 'square-database';
import { ConfigTests } from './config-tests';
import { FirestoreService } from './firestore.service';

class Acteur extends Entity {
  constructor(public nom?: string) { super() }
  entityName() { return "acteurs" }
}

describe('FirestoreService', () => {
  let repository: RepositoryInterface;

  beforeAll(() => {
    ConfigTests.init();
    TestBed.configureTestingModule({});
    const firestorService = TestBed.inject(FirestoreService);
    repository = new RepositoryService(firestorService);
  })

  beforeEach(() => {
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  /** C R E A T E */

  it("Création d'une Entity", async () => {
    const acteur = new Acteur('DiCaprio');

    // create
    let id = undefined;
    await repository.create(acteur).then(
      data => id = data,
      err => console.error(err)
    );
    expect(acteur.id).toBeDefined();
    expect(acteur.id).toEqual(id);

    // delete
    if (id)
      await repository.delete(Acteur, id);
  });

  /** R E A D */

  it("Lecture d'une Entity", async () => {
    const acteurIn = new Acteur('Depardieu');

    // create
    await repository.create(acteurIn);
    if (!acteurIn.id)
      return;

    // retrieve
    let acteurOut = new Acteur();
    await repository.read(Acteur, acteurIn.id).then(
      data => acteurOut = data,
      err => console.error(err)
    );
    expect(acteurOut).toEqual(acteurIn);
    expect(acteurOut).toBeInstanceOf(Acteur);

    // delete
    if (acteurOut.id)
      await repository.delete(Acteur, acteurOut.id);
  });

  /** U P D A T E */

  it("Mise à jour", async () => {
    let acteurIn = new Acteur('Auteuil');

    // create
    await repository.create(acteurIn);
    if (!acteurIn.id)
      return;

    // update
    // L'instruction échoue sans Object.assign({}, data) dans la méthode update
    acteurIn.nom = 'Auteuil Daniel';
    await repository.update(acteurIn).catch(
      err => console.error(err)
    );

    // retrieve
    let acteurOut = new Acteur();
    await repository.read(Acteur, acteurIn.id).then(data => acteurOut = data);
    expect(acteurOut).toEqual(acteurIn);

    // delete
    if (acteurOut.id)
      await repository.delete(Acteur, acteurOut.id);
  });

});
