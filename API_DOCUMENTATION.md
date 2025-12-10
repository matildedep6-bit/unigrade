# UniGrade API Documentation

## Base URL

Development: `http://localhost:3001`
Production: `https://your-deployment-url.com`

## Endpoints

### Health Check

**GET** `/health`

Verifica se il server è online.

**Response (200):**
```json
{
  "status": "OK",
  "timestamp": "2024-12-10T10:30:00Z"
}
```

---

### Calculate Combinations

**POST** `/api/calculate`

Calcola tutte le possibili combinazioni di voti per raggiungere la media desiderata.

**Request Body:**
```json
{
  "num_exams": 5,
  "desired_mean": 25,
  "current_mean": 23.5,
  "passed_exams": 3
}
```

**Parameters:**
- `num_exams` (number, required): Numero di esami totali (1-100)
- `desired_mean` (number, required): Media desiderata (18-30)
- `current_mean` (number, optional): Media attuale
- `passed_exams` (number, optional): Esami già superati

**Response (200):**
```json
{
  "success": true,
  "combinations": [
    {
      "grades": [28, 27, 26],
      "mean": 27.0
    },
    {
      "grades": [29, 26, 25],
      "mean": 26.67
    }
  ],
  "totalCombinations": 2,
  "timestamp": "2024-12-10T10:30:00Z"
}
```

**Response (400):**
```json
{
  "message": "Error description",
  "error": "Validation error"
}
```

**Response (500):**
```json
{
  "message": "Errore nel calcolo delle combinazioni",
  "error": "Error details"
}
```

---

### Save Calculation

**POST** `/api/save-calculation`

Salva un calcolo nel database.

**Request Body:**
```json
{
  "user_id": "user123",
  "num_exams": 5,
  "desired_mean": 25,
  "combinations": [
    {
      "grades": [28, 27, 26],
      "mean": 27.0
    }
  ]
}
```

**Parameters:**
- `user_id` (string, required): ID dell'utente
- `num_exams` (number, required): Numero di esami
- `desired_mean` (number, required): Media desiderata
- `combinations` (array, required): Array di combinazioni

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "user_id": "user123",
    "num_exams": 5,
    "desired_mean": 25,
    "combinations": [...],
    "created_at": "2024-12-10T10:30:00Z"
  },
  "message": "Calcolo salvato con successo"
}
```

**Response (400):**
```json
{
  "message": "Error description",
  "error": "Validation error"
}
```

---

### Get User Calculations

**GET** `/api/calculations/:userId`

Recupera tutti i calcoli salvati di un utente.

**Parameters:**
- `userId` (string, required, in path): ID dell'utente

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "user_id": "user123",
      "num_exams": 5,
      "desired_mean": 25,
      "combinations": [...],
      "created_at": "2024-12-10T10:30:00Z",
      "updated_at": "2024-12-10T10:30:00Z"
    }
  ],
  "count": 1
}
```

**Response (400):**
```json
{
  "message": "Errore nel recupero dei calcoli",
  "error": "Error details"
}
```

---

## Error Codes

| Code | Message | Descrizione |
|------|---------|-------------|
| 200 | OK | Richiesta riuscita |
| 400 | Bad Request | Errore di validazione |
| 404 | Not Found | Risorsa non trovata |
| 500 | Internal Server Error | Errore del server |

## Rate Limiting

Non è attualmente implementato un rate limiting. Contatta per informazioni sulla produzione.

## CORS

CORS è abilitato per tutte le origin. Per limitare in produzione, modifica `backend/src/server.ts`.

## Autenticazione

Al momento non è implementata autenticazione. Le future versioni includeranno JWT.

## Pagination

Non implementata al momento.

## Versioning

API v1 (2024)

## Contatti

Per supporto: [Issues GitHub]
