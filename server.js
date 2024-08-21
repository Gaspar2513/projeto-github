import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.post('/produts', async (req, res) => {

    await prisma.user.create({
        data: {
            produt: req.body.produt,
            description: req.body.description,
            amount: req.body.amount,
            date: req.body.date
        }
    })

    res.status(201).json(req.body)
})

app.get('/produts', async (req, res) => {
    let produts = []

    if (req.query) {
        produts = await prisma.user.findMany({
            where: {
                produt: req.query.produt,
                description: req.query.description,
                amount: req.query.amount,
                date: req.query.date
            }
        })

    } else {
        produts = await prisma.user.findMany()
    }
    res.status(200).json(produts)
})

app.put('/produts/:id', async (req, res) => {


    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            produt: req.body.produt,
            description: req.body.description,
            amount: req.body.amount,
            date: req.body.date
        }
    })

    res.status(201).json(req.body)
})

app.delete('/produts/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ messege: 'Produto excluido com sucesso!' })
})

app.listen(3000)