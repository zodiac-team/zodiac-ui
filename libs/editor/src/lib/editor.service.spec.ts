import { TestBed } from '@angular/core/testing';

import { EditorService } from './editor.service';

describe('EditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorService = TestBed.get(EditorService);
    expect(service).toBeTruthy();
  });
});
