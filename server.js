import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import { faker } from '@faker-js/faker'

const app = express()
const PORT = 3000

// JSON 요청 본문을 파싱하기 위한 미들웨어
app.use(bodyParser.json())

// 데이터베이스 파일 경로
const dbFilePath = './db/data.json'

// 사용자 목록 가져오기
app.get('/api/users', (req, res) => {
  fs.readFile(dbFilePath, (err, data) => {
    if (err) return res.status(500).send('데이터베이스 오류')
    const db = JSON.parse(data)
    res.json(db.users)
  })
})

// 사용자 추가하기
app.post('/api/users', (req, res) => {
  const newUser = {
    id: faker.string.uuid(),
    name: faker.internet.username(),
    email: faker.internet.email(),
  }

  fs.readFile(dbFilePath, (err, data) => {
    if (err) return res.status(500).send('데이터베이스 오류')
    const db = JSON.parse(data)
    db.users.push(newUser)

    fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), (err) => {
      if (err) return res.status(500).send('데이터베이스 오류')
      res.status(201).json(newUser)
    })
  })
})

// 사용자 삭제하기
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id

  fs.readFile(dbFilePath, (err, data) => {
    if (err) return res.status(500).send('데이터베이스 오류')
    const db = JSON.parse(data)
    db.users = db.users.filter((user) => user.id !== userId)

    fs.writeFile(dbFilePath, JSON.stringify(db, null, 2), (err) => {
      if (err) return res.status(500).send('데이터베이스 오류')
      res.status(204).send() // 삭제 성공 응답
    })
  })
})

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`)
})
