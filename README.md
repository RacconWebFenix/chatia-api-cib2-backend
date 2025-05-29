# ChatIA API - Rotas

## Rotas disponíveis

---

### 1. Enviar mensagem para o chat

- **Método:** `POST`
- **Endpoint:** `/chat`
- **Descrição:** Envia uma mensagem para o chat, registra o feedback e retorna a resposta da IA.
- **Body (JSON):**
  ```json
  {
    "message": "Olá, IA! Como você está?"
  }
  ```
- **Exemplo de resposta:**
  ```json
  {
    "reply": {
      "citations": [],
      "images": [],
      "text": {
        "content": "Resposta gerada pela IA"
      }
    },
    "feedbackId": 1
  }
  ```

---

### 2. Listar feedbacks positivos para prompt dinâmico

- **Método:** `GET`
- **Endpoint:** `/chat/feedbacks`
- **Query param opcional:** `limit` (ex: `/chat/feedbacks?limit=5`)
- **Descrição:** Retorna os últimos feedbacks positivos, usados para montar o prompt dinâmico.
- **Exemplo de resposta:**
  ```json
  [
    {
      "id": 10,
      "prompt": "Pergunta do usuário",
      "response": "Resposta positiva",
      "userFeedback": "positivo",
      ...
    },
    ...
  ]
  ```

---

### 3. Listar todos os feedbacks

- **Método:** `GET`
- **Endpoint:** `/feedbacks`
- **Descrição:** Retorna todos os feedbacks registrados no sistema.

---

### 4. Listar feedbacks positivos (rota dedicada)

- **Método:** `GET`
- **Endpoint:** `/feedbacks/positive`
- **Query param opcional:** `limit` (ex: `/feedbacks/positive?limit=10`)
- **Descrição:** Retorna apenas os feedbacks positivos, útil para administração ou análise.

---

## Como testar

Você pode testar as rotas usando ferramentas como **Insomnia** ou **Postman**:

- Para rotas `POST`, selecione o método, insira a URL e o body em JSON.
- Para rotas `GET`, basta acessar a URL no navegador ou na ferramenta.

---
