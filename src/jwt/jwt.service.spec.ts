import { CONFIG_OPTIONS } from "src/common/common.constants";
import * as jwt from 'jsonwebtoken';
import { JwtService } from "./jwt.service";
import { Test } from "@nestjs/testing";

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => 'TOKEN'),
  };
});

describe('JwtService', () => {
  let service: JwtService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: CONFIG_OPTIONS,
          useValue: { privateKey : 'TEST_KEY' },
        },
      ],
    }).compile();
    service = module.get<JwtService>(JwtService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('sign', ()=>{
    it('should return a signed token', ()=>{
      const ID = 1;
      const token = service.sign(ID);
      console.log('token 확인 : ', token)
      expect(typeof token).toBe('string')
      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(jwt.sign).toHaveBeenLastCalledWith({ id: ID }, 'TEST_KEY');
    })
  })
  describe('verify', () => {
    it('should return the decoded token', () => {});
  });
});