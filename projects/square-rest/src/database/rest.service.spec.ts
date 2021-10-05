import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './data.service';
import { RestService } from './rest.service';

type ID = number;
const ACTEURS = "acteurs";
type Acteur = { id?: ID, nom?: string, prenom?: string };

describe('RestService', () => {
  let service: RestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(
          DataService, {
          dataEncapsulation: false,
          passThruUnknownUrl: true,
          put204: false // return entity after PUT/update
        }
        )
      ]
    });
    service = TestBed.inject(RestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /** C R E A T E */

  it("Création", async () => {
    const acteur: Acteur = { nom: 'Cruise' };

    // create
    let id = undefined;
    await service.create(ACTEURS, acteur, 'id').then(data => id = data);
    expect(acteur.id).toBeDefined();
    expect(acteur.id).toEqual(id);

    // delete
    if (id)
      await service.delete(ACTEURS, id);
  });

  // /** R E A D */

  it("Lecture", async () => {
    const acteurIn: Acteur = { nom: 'Redford' };

    // create
    await service.create(ACTEURS, acteurIn);
    if (!acteurIn.id)
      return;

    // retrieve
    let acteurOut: Acteur = {};
    await service.read<Acteur>(ACTEURS, acteurIn.id).then(data => acteurOut = data);
    // Object.assign(personne2, data) permet de conserver le type Personne pour personne2
    expect(acteurOut).toEqual(acteurIn);

    // delete
    if (acteurOut.id)
      await service.delete(ACTEURS, acteurOut.id);
  });

  /** U P D A T E */

  it("Mise à jour", async () => {
    let acteurIn: Acteur = { nom: 'Auteuil' };

    // create
    await service.create(ACTEURS, acteurIn);
    if (!acteurIn.id)
      return;

    // update
    acteurIn.nom = 'Auteuil Daniel';
    await service.update(ACTEURS, acteurIn.id, acteurIn);

    // retrieve
    let acteurOut: Acteur = {};
    await service.read<Acteur>(ACTEURS, acteurIn.id).then(data => acteurOut = data);
    expect(acteurOut).toEqual(acteurIn);

    // delete
    if (acteurOut.id)
      await service.delete(ACTEURS, acteurOut.id);
  });

  /** S E L E C T */

  it("Sélection", async () => {
    let acteurs: Acteur[] = [];
    await service.select<Acteur>(ACTEURS, { nom: 'Aut' }).then(
      data => acteurs = data,
      err => console.error(err)
    )
    expect(acteurs).toBeDefined();
    expect(acteurs.length).toEqual(1);
    const acteur = acteurs[0];
    expect(acteur.nom).toEqual("Auteuil");
  });

});
