// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type Data = {
  name: string
}

const createMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message } = req.body

  const messageCreated = await prisma.chat.create({ data: { message } })
  return res.status(201).json(messageCreated)
}

const getMessages = async (res: NextApiResponse) => {
  const messages = await prisma.chat.findMany()
  return res.status(200).json({ messages })
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method == 'POST') {
    return createMessage(req, res)
  }
  if (req.method == 'GET') {
    return getMessages(res)
  }
}