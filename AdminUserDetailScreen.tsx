import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

interface Perfil {
  id: number;
  nome: string;
  email: string;
  createdAt: string;
}

interface Feedback {
  id: number;
  mensagem: string;
  createdAt: string;
}

interface Pergunta {
  id: number;
  texto: string;
  votos: number;
  createdAt: string;
}

interface Presenca {
  id: number;
  atividade: string;
  createdAt: string;
}

interface Quiz {
  id: number;
  score: number;
  createdAt: string;
}

interface AdminUserDetailResponse {
  perfil: Perfil;
  resumo: {
    totalFeedbacks: number;
    totalPerguntas: number;
    totalVotosPerguntas: number;
    totalPresencas: number;
    totalQuizScore: number;
  };
  feedbacks: Feedback[];
  perguntas: Pergunta[];
  presencas: Presenca[];
  quizzes: Quiz[];
}

export default function AdminUserDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<AdminUserDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadUser() {
      try {
        const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/admin/sorteio/users/${id}`
        );

        if (!res.ok) {
          throw new Error("Não foi possível carregar os dados.");
        }

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Erro: {error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Nenhum dado encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Detalhes do Usuário
      </Text>

      {/* Perfil */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Perfil</Text>
        <Text>ID: {data.perfil.id}</Text>
        <Text>Nome: {data.perfil.nome}</Text>
        <Text>Email: {data.perfil.email}</Text>
        <Text>Criado em: {data.perfil.createdAt}</Text>
      </View>

      {/* Resumo */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Resumo</Text>
        <Text>Total de Feedbacks: {data.resumo.totalFeedbacks}</Text>
        <Text>Total de Perguntas: {data.resumo.totalPerguntas}</Text>
        <Text>Total de Votos nas Perguntas: {data.resumo.totalVotosPerguntas}</Text>
        <Text>Total de Presenças: {data.resumo.totalPresencas}</Text>
        <Text>Pontuação total no Quiz: {data.resumo.totalQuizScore}</Text>
      </View>

      {/* Feedbacks */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Feedbacks</Text>
        {data.feedbacks.length === 0 && <Text>Nenhum feedback.</Text>}

        {data.feedbacks.map((f) => (
          <View key={f.id} style={{ marginTop: 10 }}>
            <Text>ID: {f.id}</Text>
            <Text>Mensagem: {f.mensagem}</Text>
            <Text>Data: {f.createdAt}</Text>
          </View>
        ))}
      </View>

      {/* Perguntas */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Perguntas</Text>
        {data.perguntas.length === 0 && <Text>Nenhuma pergunta.</Text>}

        {data.perguntas.map((p) => (
          <View key={p.id} style={{ marginTop: 10 }}>
            <Text>ID: {p.id}</Text>
            <Text>Pergunta: {p.texto}</Text>
            <Text>Votos: {p.votos}</Text>
            <Text>Data: {p.createdAt}</Text>
          </View>
        ))}
      </View>

      {/* Presenças */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Presenças</Text>
        {data.presencas.length === 0 && <Text>Nenhuma presença registrada.</Text>}

        {data.presencas.map((p) => (
          <View key={p.id} style={{ marginTop: 10 }}>
            <Text>ID: {p.id}</Text>
            <Text>Atividade: {p.atividade}</Text>
            <Text>Data: {p.createdAt}</Text>
          </View>
        ))}
      </View>

      {/* Quizzes */}
      <View style={{ marginTop: 20, marginBottom: 40 }}>
        <Text style={{ fontSize: 18 }}>Quizzes</Text>
        {data.quizzes.length === 0 && <Text>Nenhum quiz.</Text>}

        {data.quizzes.map((q) => (
          <View key={q.id} style={{ marginTop: 10 }}>
            <Text>ID: {q.id}</Text>
            <Text>Pontuação: {q.score}</Text>
            <Text>Data: {q.createdAt}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
