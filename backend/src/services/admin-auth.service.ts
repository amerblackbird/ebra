import type {AccountsService} from "./accounts.service";
import {ExceptionModel, UnauthorizedException} from "../models/exception";
import ERROR_CODES from "../constants/errors";
import {PasswordUtils} from "../utils/password";
import {JwtUtils} from "../utils/jwt";

export class AdminAuthService {

    constructor(
        private readonly accountsService: AccountsService
    ) {
    }

    async authorize({username, password}: { username: string, password: string }): Promise<{
        accessToken: string,
        refreshToken: string
    }> {
        const user = await this.accountsService.findOneByUsername(username);
        if (!user) {
            throw new ExceptionModel(ERROR_CODES.USER_NOT_FOUND)
        }
        if (user.role != "admin") {
            throw new UnauthorizedException()
        }
        // Check password
        const login = await this.accountsService.findLoginByUserId(user.id);

        if (!login) {
            throw new UnauthorizedException()
        }

        // Check password
        const hashedPassword = PasswordUtils.hashPassword(password, login.salt);
        if (hashedPassword !== login.password) {
            throw new ExceptionModel(ERROR_CODES.INVALID_CREDENTIALS)
        }

        return await JwtUtils.generateTokens({
            userId: user.id,
            role: user.role
        })
    }
}