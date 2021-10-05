import { TestBed } from '@angular/core/testing';
import { ID } from '../util/id.type';
import { ConfigTests } from './config-tests';
import { FirestoreService } from './firestore.service';

const ACTEURS = "acteurs";
type Acteur = { id?: ID, nom?: string, prenom?: string };

describe('FirestoreService', () => {
  let service: FirestoreService;

  beforeAll(() => {
    ConfigTests.init();
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreService);
  })

  beforeEach(() => {
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /** C R E A T E */

  it("Création d'un document sans id en base", async () => {
    const acteur: Acteur = { nom: 'Chaplin' };

    // create
    let id = undefined;
    await service.create(ACTEURS, acteur).then(
      data => id = data,
      err => console.error(err)
    );
    expect(acteur.id).toBeUndefined();
    expect(id).toBeDefined();

    if (id)
      await service.delete(ACTEURS, id);
  });

  it("Création d'un document", async () => {
    const acteur: Acteur = { nom: 'Cruise' };

    // create
    let id = undefined;
    await service.create(ACTEURS, acteur, 'id').then(
      data => id = data,
      err => console.error(err)
    );
    expect(acteur.id).toBeDefined();
    expect(acteur.id).toEqual(id);

    // delete
    if (id)
      await service.delete(ACTEURS, id);
  });

  it("Création avec un id forcé", async () => {
    const acteur = { id: '1', nom: 'Clooney' };

    // create
    await service.create(ACTEURS, acteur, 'id').catch(
      err => console.error(err)
    );
    expect(acteur.id).toEqual('1');

    // delete
    if (acteur.id)
      await service.delete(ACTEURS, acteur.id);
  });

  /** R E A D */

  it("Lecture", async () => {
    const acteurIn: Acteur = { nom: 'Redford' };

    // create
    await service.create(ACTEURS, acteurIn, 'id');
    if (!acteurIn.id)
      return;

    // retrieve
    let acteurOut: Acteur = {};
    await service.read<Acteur>(ACTEURS, acteurIn.id).then(
      data => acteurOut = data,
      err => console.error(err)
    );
    // Object.assign(personne2, data) permet de conserver le type Personne pour personne2
    expect(acteurOut).toEqual(acteurIn);

    // delete
    if (acteurOut.id)
      await service.delete(ACTEURS, acteurOut.id);
  });

  it("Lecture d'une donnée inexistante", async () => {
    let acteur: Acteur = {};
    await service.read<Acteur>(ACTEURS, '100').then(
      data => acteur = data,
      err => console.error(err)
    );
    expect(acteur).toBeUndefined();
  });

  /** U P D A T E */

  it("Mise à jour", async () => {
    let acteurIn: Acteur = { nom: 'Auteuil' };

    // create
    await service.create(ACTEURS, acteurIn, 'id');
    if (!acteurIn.id)
      return;

    // update
    // L'instruction échoue sans Object.assign({}, data) dans la méthode update
    acteurIn.prenom = 'Daniel';
    await service.update(ACTEURS, acteurIn.id, acteurIn).catch(
      err => console.error(err)
    );

    // retrieve
    let acteurOut: Acteur = {};
    await service.read<Acteur>(ACTEURS, acteurIn.id).then(data => acteurOut = data);
    expect(acteurOut).toEqual(acteurIn);

    // delete
    if (acteurOut.id)
      await service.delete(ACTEURS, acteurOut.id);
  });

  it("Selection", async () => {
    const acteur1: Acteur = { nom: 'Adjani' };
    const acteur2: Acteur = { nom: 'Deneuve' };

    // create
    await service.create(ACTEURS, acteur1, 'id');
    await service.create(ACTEURS, acteur2, 'id');
    if (!acteur1.id || !acteur2.id)
      return;

    // selectAll
    // L'instruction échoue sans Object.assign({}, data) dans la méthode update
    let acteurs: Acteur[] = [];
    await service.select<Acteur>(ACTEURS, { nom: 'Deneuve' }).then(
      data => acteurs = data,
      err => console.error(err)
    )
    expect(acteurs.length).toEqual(1);
    if (acteurs.length == 1)
      expect(acteurs[0].nom).toEqual('Deneuve');

    // delete
    await service.delete(ACTEURS, acteur1.id);
    await service.delete(ACTEURS, acteur2.id);
  });

});
