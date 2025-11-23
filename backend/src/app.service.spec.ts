import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('App', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();
    service = module.get(AppService);
  });

  describe('getHello()', () => {
    it('should return hello world', () => {
      expect(service.getHello()).toEqual('Hello World!');
    });
  });
});
