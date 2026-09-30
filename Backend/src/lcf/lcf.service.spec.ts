import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LcfService } from './lcf.service';

describe('LcfService', () => {
  let service: LcfService;
  let configService: ConfigService;

  // Test hash for "test-password-123" (generated with bcrypt cost 12)
  const testAccessCodeHash = '$2b$12$WDXVy.Yk7jvDCsPxVFSPAe8DhM0fKD9P8nFk7X8VrcP7lbNe9NwGK';
  const testTokenSecret = '7f5b4e9d2c8a6d3e2a4f5c6b7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1';

  beforeEach(async () => {
    const mockConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'LCF_ACCESS_CODE_HASH') return testAccessCodeHash;
        if (key === 'LCF_TOKEN_SECRET') return testTokenSecret;
        return null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LcfService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<LcfService>(LcfService);
  });

  describe('onModuleInit', () => {
    it('should initialize with valid config', () => {
      expect(() => service.onModuleInit()).not.toThrow();
    });
  });

  describe('verifyCode', () => {
    beforeEach(() => {
      service.onModuleInit();
    });

    it('should return a valid token for the correct code', async () => {
      // Test code is "test-password-123"
      const result = await service.verifyCode('test-password-123');
      expect(result).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.expiresIn).toBe('24h');
    });

    it('should return null for an incorrect code', async () => {
      const result = await service.verifyCode('wrong-password');
      expect(result).toBeNull();
    });

    it('should return null for empty code', async () => {
      const result = await service.verifyCode('');
      expect(result).toBeNull();
    });
  });

  describe('verifyToken', () => {
    beforeEach(async () => {
      service.onModuleInit();
    });

    it('should verify a valid token', async () => {
      const { token } = await service.verifyCode('test-password-123');
      const isValid = service.verifyToken(token);
      expect(isValid).toBe(true);
    });

    it('should reject an invalid token', () => {
      const isValid = service.verifyToken('invalid-token');
      expect(isValid).toBe(false);
    });

    it('should reject an expired or tampered token', () => {
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoibGNmX2FjY2VzcyIsImlhdCI6MTYwMDAwMDAwMH0.invalid-signature';
      const isValid = service.verifyToken(fakeToken);
      expect(isValid).toBe(false);
    });
  });
});
