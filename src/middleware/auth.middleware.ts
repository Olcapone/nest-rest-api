import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const apps = getApps();
if (!apps.length) {
  initializeApp({
    credential: cert("src/config/serviceAccountKey.json"),
  });
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const {authorization = ''} = req.headers
    const [bearer, token] = authorization.split(' ')
    
    if (bearer !== 'Bearer') {
      return res.status(401).json({ error: 'Please include id token' });
    } else {
      try {
        const {uid} = await getAuth().verifyIdToken(token);
        req.body.uid = uid;
      } catch (error) {
        return res.status(401).json({error: error.message});
      }
    }
    next();
  }
}
