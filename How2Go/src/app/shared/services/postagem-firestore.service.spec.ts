import { TestBed } from '@angular/core/testing';

import { PostagemFirestoreService } from './postagem-firestore.service';

describe('PostagemFirestoreService', () => {
  let service: PostagemFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostagemFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
