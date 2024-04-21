import { Router } from "express";
import { prisma } from "../db";

const router = Router();

router.get("/taxis", async (req, res) => {
  const pageString = req.query.page?.toString();
  const page = pageString ? parseInt(pageString) : 1;

  const limitString = req.query.limit?.toString();
  const perPage = limitString ? parseInt(limitString) : 10;

  const query = req.query.query?.toString() || "";

  if (page < 1 || isNaN(page)) {
    return res
      .status(400)
      .json({ error: "'page' debe ser un número entero mayor o igual a 1." });
  }

  try {
    const whereClause = query
      ? { plate: { contains: query.toUpperCase() } }
      : {};

    const totalCountPromise = prisma.taxis.count({
      where: whereClause,
    });

    const [taxis, totalCount] = await Promise.all([
      prisma.taxis.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        where: whereClause, // termino de busqueda
        orderBy: {
          // ordena la tabla por placa ascendente
          plate: "asc",
        },
      }),
      totalCountPromise,
    ]);

    const totalPages = Math.ceil(totalCount / perPage);

    res.json({
      data: taxis,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error("Error al obtener los taxis:", error);
    res.status(500).json({ error: "Error al obtener los taxis." });
  }
});

export default router;
