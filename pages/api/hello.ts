// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserView from '@/backend/Views/user.view';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userModel: any = new UserView();
  const users = await userModel.getById(3)
  res.status(200).json({ ...users })
}
