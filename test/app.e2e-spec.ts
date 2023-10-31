import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('App end to end test', () => {
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it.todo('should be defined');
});
