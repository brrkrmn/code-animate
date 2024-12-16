import { Request, Response, Router } from "express";

const authRouter = Router();

authRouter.get('/', async (req: Request, res: Response) => {
  console.log(req.user)
})

export default authRouter