import { Router } from "express";
import { prisma } from "../db";

const router = Router();
const perPage = 10;

router.get('/taxis', async (req, res) => {
  const page: string = req.query.page?.toString() || '1';
  const pageNumber = parseInt(page);  

  if (isNaN(pageNumber)) {
    res.status(404).json({ error: "'page' debe ser un número." });
  } else {
    const offset = (pageNumber - 1) * perPage;

    try {
        const taxis = await prisma.taxis.findMany({
          take: perPage,
          skip: offset,
        });

        const resp = {
            data: taxis,
            currentPage: pageNumber,
        }
    
        res.json(resp);
      } catch (error) {
        console.error('Error al obtener los taxis:', error);
        res.status(500).json({ error: 'Error al obtener los taxis.' });
      }
  }
  
});

export default router;