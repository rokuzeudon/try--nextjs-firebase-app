import { NextApiRequest, NextApiResponse } from 'next'
import * as path from 'path'
import { createCanvas, registerFont } from 'canvas'

registerFont(path.resolve('./fonts/ipaexg.ttf'), {
  family: 'ipagp',
})

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
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
