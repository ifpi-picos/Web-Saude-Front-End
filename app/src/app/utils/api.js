export const chamarAPI = async (
  url,
  { metodo = "GET", headers = {}, dados = {} } = {}
) => {
  const config = {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: metodo !== "GET" ? JSON.stringify(dados) : undefined,
  };

  try {
    const resposta = await fetch(url, config);

    if (!resposta.ok) {
      throw new Error(
        `Erro na resposta da API: ${resposta.status} - ${resposta.statusText}`
      );
    }

    return await resposta.json();
  } catch (erro) {
    console.error("Erro ao chamar a API:", erro.message);
    throw erro;
  }
};
