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

---

### 3. Listar todos os feedbacks

- **Método:** `GET`
- **Endpoint:** `/feedbacks`
- **Descrição:** Retorna todos os feedbacks registrados no sistema, incluindo campos de timestamp (`createdAt`, `updatedAt`).

---

### 4. Listar feedbacks positivos (rota dedicada)

- **Método:** `GET`
- **Endpoint:** `/feedbacks/positive`
- **Query param opcional:** `limit` (ex: `/feedbacks/positive?limit=10`)
- **Descrição:** Retorna apenas os feedbacks positivos.

---

### 5. Listar feedbacks negativos

- **Método:** `GET`
- **Endpoint:** `/feedbacks/negative`
- **Query param opcional:** `limit` (ex: `/feedbacks/negative?limit=10`)
- **Descrição:** Retorna apenas os feedbacks negativos.

---

### 6. Listar feedbacks por tipo

- **Método:** `GET`
- **Endpoint:** `/feedbacks/type`
- **Query params obrigatórios:**
  - `type`: `"positivo"` ou `"negativo"`
  - `limit` (opcional, ex: `/feedbacks/type?type=negativo&limit=10`)
- **Descrição:** Retorna feedbacks filtrados por tipo.

---

### 7. Criar feedback manualmente

- **Método:** `POST`
- **Endpoint:** `/feedbacks`
- **Body (JSON):**
  ```json
  {
    "prompt": "Qual o melhor óleo para motor?"
  }
  ```
- **Descrição:** Cria um novo feedback manualmente.

---

### 8. Atualizar feedback do usuário

- **Método:** `PUT`
- **Endpoint:** `/feedbacks`
- **Body (JSON):**
  ```json
  {
    "feedbackId": 1,
    "rating": 5,
    "comment": "Muito bom!",
    "userFeedback": "positivo"
  }
  ```
- **Descrição:** Atualiza a avaliação do usuário para um feedback já criado.

---

### 9. Deletar feedback

- **Método:** `DELETE`
- **Endpoint:** `/feedbacks/:id`
- **Descrição:** Deleta um feedback pelo seu ID.
- **Exemplo:**
  ```
  DELETE /feedbacks/1
  ```

---

## Como testar

Você pode testar as rotas usando ferramentas como **Insomnia** ou **Postman**:

- Para rotas `POST`, `PUT` e `DELETE`, selecione o método, insira a URL e o body em JSON (quando necessário).
- Para rotas `GET`, basta acessar a URL no navegador ou na ferramenta.

---
