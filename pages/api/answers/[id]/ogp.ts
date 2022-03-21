import { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, registerFont, loadImage } from 'canvas'
import * as path from 'path'
import '../../../../lib/firebase_admin'
import { firestore } from 'firebase-admin'
import { Answer } from '../../../../models/Answer'
import { Question } from '../../../../models/Question'


registerFont(path.resolve('./fonts/ipaexg.ttf'), {
  family: 'ipagp',
})

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string

  const answerDoc = await firestore().collection('answers').doc(id).get()
  const answer = answerDoc.data() as Answer
  const questionDoc = await firestore()
    .collection('questions')
    .doc(answer.questionId)
    .get()
  const question = questionDoc.data() as Question

  const width = 600
  const height = 315
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  context.fillStyle = '#f8f8f8'
  context.fillRect(0, 0, width, height)
  context.font = '20px ipagp'
  context.fillStyle = '#424242'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText('testテスト', 100, 50)

  const buffer = canvas.toBuffer()

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  })
  res.end(buffer, 'binary')
}
