import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types/enums';
import { errorResponse } from '../utils/response';

/**
 * Authorization middleware - checks user role
 */
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return errorResponse(res, 401, 'Not authenticated');
    }
    
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 403, 'Access denied');
    }
    
    next();
  };
};
