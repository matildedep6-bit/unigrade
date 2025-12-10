# Contributing to UniGrade

Thank you for your interest in contributing to UniGrade!

## Come Contribuire

### Bug Reports
1. Controlla se il bug è già stato segnalato
2. Fornisci una descrizione chiara del problema
3. Includi i passi per riprodurlo
4. Aggiungi screenshots se applicabile

### Feature Requests
1. Descrivi chiaramente la feature
2. Spiega i use case e benefici
3. Suggerisci possibili implementazioni

### Pull Requests
1. Fork il repository
2. Crea un branch per la tua feature (`git checkout -b feature/amazing-feature`)
3. Commit le tue changes (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

## Development Setup

```bash
npm install
npm install --workspace=frontend
npm install --workspace=backend
npm run dev
```

## Code Style

- Usa TypeScript per type safety
- Segui le convenzioni di naming:
  - `camelCase` per variabili e funzioni
  - `PascalCase` per componenti e classi
  - `UPPER_SNAKE_CASE` per costanti

## Testing

```bash
npm test
npm test --workspace=frontend
npm test --workspace=backend
```

## Commit Messages

- Usa commenti descrittivi
- Inizia con un verbo (Add, Fix, Update, etc)
- Esempi:
  - `Add grade calculation logic`
  - `Fix CORS configuration`
  - `Update documentation`

## License

Contribuendo a UniGrade, accetti che il tuo codice sia licensiato sotto la MIT License.

---

Per domande, apri una discussion su GitHub!
