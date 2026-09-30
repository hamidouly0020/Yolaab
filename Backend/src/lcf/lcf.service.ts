import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface LcfTokenPayload {
  type: string;
  iat: number;
}

@Injectable()
export class LcfService implements OnModuleInit {
  private lcfAccessCodeHash: string;
  private lcfTokenSecret: string;
  private readonly tokenExpiresIn = '24h';

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    // Validate required LCF environment variables at startup
    this.lcfAccessCodeHash = this.configService.get<string>('LCF_ACCESS_CODE_HASH');
    this.lcfTokenSecret = this.configService.get<string>('LCF_TOKEN_SECRET');

    if (!this.lcfAccessCodeHash) {
      throw new Error(
        '❌ LCF_ACCESS_CODE_HASH is missing. Set it in your .env file with the bcrypt hash (cost 12) of the access code.',
      );
    }

    if (!this.lcfTokenSecret) {
      throw new Error(
        '❌ LCF_TOKEN_SECRET is missing. Set it in your .env file with a random 64+ character hex string.',
      );
    }

    if (this.lcfTokenSecret.length < 64) {
      throw new Error(
        '❌ LCF_TOKEN_SECRET must be at least 64 characters. Generate a strong random hex string.',
      );
    }

    console.log('✅ LCF configuration loaded and validated');
  }

  async verifyCode(providedCode: string): Promise<{ token: string; expiresIn: string } | null> {
    // Use bcrypt.compare to securely check the provided code against the hash
    const isValid = await bcrypt.compare(providedCode, this.lcfAccessCodeHash);

    if (!isValid) {
      return null;
    }

    // Generate JWT token valid for 24 hours
    const token = jwt.sign(
      {
        type: 'lcf_access',
        iat: Math.floor(Date.now() / 1000),
      },
      this.lcfTokenSecret,
      { expiresIn: this.tokenExpiresIn },
    );

    return {
      token,
      expiresIn: this.tokenExpiresIn,
    };
  }

  verifyToken(token: string): boolean {
    try {
      const decoded = jwt.verify(token, this.lcfTokenSecret) as LcfTokenPayload;
      return decoded && decoded.type === 'lcf_access';
    } catch (err) {
      return false;
    }
  }
}
