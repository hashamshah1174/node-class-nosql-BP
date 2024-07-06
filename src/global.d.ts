declare namespace Express {
  export interface Request {
    locals: {
      auth?: {
        userId: number;
        role: import("./database/interfaces/enums").EUserRole;
      };
    };
  }
}
interface ApiResponse {
  code: number;
  status: boolean;
  msg: string;
  data?: string | object | any;
  total?: number | null;
  accessToken?: string;
  refreshToken?: string;
}

interface JwtToken {
  accessToken: string;
  refreshToken: string;
}
interface IKeyValue {
  [key: string]: number | string;
}
