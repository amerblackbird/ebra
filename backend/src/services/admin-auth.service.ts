import type {AccountsService} from "./accounts.service";
import {ExceptionModel, UnauthorizedException} from "../models/exception";
import ERROR_CODES from "../constants/errors";
import {PasswordUtils} from "../utils/password";
import {JwtUtils} from "../utils/jwt";


/**
 * AdminAuthService handles the authentication logic for admin users.
 */
export class AdminAuthService {

    /**
     * Constructs the AdminAuthService.
     * @param accountsService - The service to manage accounts.
     */
    constructor(
        private readonly accountsService: AccountsService
    ) {
    }

    /**
     * Authorizes an admin user based on username and password.
     * @param username - The username of the admin.
     * @param password - The password of the admin.
     * @returns An object containing access and refresh tokens.
     * @throws ExceptionModel if the user is not found or credentials are invalid.
     * @throws UnauthorizedException if the user is not an admin or login is not found.
     */
    async authorize({username, password}: { username: string, password: string }): Promise<{
        accessToken: string,
        refreshToken: string
    }> {
        // Find user by username
        const user = await this.accountsService.findOneByUsername(username);
        if (!user) {
            throw new ExceptionModel(ERROR_CODES.USER_NOT_FOUND)
        }

        // Check if user is an admin
        if (user.role != "admin") {
            throw new UnauthorizedException()
        }
        // Find login details by user ID
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