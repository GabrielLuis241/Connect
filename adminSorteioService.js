import prisma from "../lib/prisma.js";

export const getUserDetailForSorteioService = async (userId) => {

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      feedbacks: true,
      perguntas: true,
      presencas: true,
      quizzes: true
    }
  });

  if (!user) {
    return null;
  }

  const resumo = {
    totalFeedbacks: user.feedbacks.length,
    totalPerguntas: user.perguntas.length,
    totalVotosPerguntas: user.perguntas.reduce(
      (acc, p) => acc + (p.votos || 0), 
      0
    ),
    totalPresencas: user.presencas.length,
    totalQuizScore: user.quizzes.reduce(
      (acc, q) => acc + (q.score || 0), 
      0
    )
  };

  return {
    perfil: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      createdAt: user.createdAt
    },
    resumo,
    feedbacks: user.feedbacks,
    perguntas: user.perguntas,
    presencas: user.presencas,
    quizzes: user.quizzes
  };
};
