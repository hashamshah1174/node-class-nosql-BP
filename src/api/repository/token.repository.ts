import { IToken } from "../../database/interfaces/token.interface";
import { Token } from "../../database/models/token.model";
import { BaseRepository } from "./base.repository";

export class TokenRepository extends BaseRepository<IToken> {
  constructor() {
    super(Token);
  }
}
