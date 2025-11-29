import { getUserDetailForSorteioService } from "../services/adminSorteioService.js";

export const getUserDetailForSorteio = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const data = await getUserDetailForSorteioService(userId);

    if (!data) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.json(data);

  } catch (error) {
    console.error("Erro ao buscar detalhes do usuário:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
