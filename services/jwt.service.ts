import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from '../config/config';
import { BadRequest, Unauthorized } from '../errors/api-errors';
import { ITokenPayload } from '../src/auth/auth.models';

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const checkPasswords = async (hash: string, password: string) => {
    const isPasswordsEquals = await bcrypt.compare(password, hash);

    if (!isPasswordsEquals) {
        throw new BadRequest('Email or password is wrong');
    }
};

export const generateAccessToken = (encodeData: ITokenPayload) => {
    return  jwt.sign(encodeData, config.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
};

export const validateAccessToken = (token: string = ''): ITokenPayload => {
    try {
        return jwt.verify(token, config.ACCESS_TOKEN_SECRET) as ITokenPayload;
    } catch (error: any) {
        throw new Unauthorized(error.message || 'Invalid token');
    }
};

