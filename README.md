# 🎓 SchooInc Backend

Microservices backend for student & professor school management (GraphQL + Federation + JWT)

## 🔧 Stack
- Apollo Federation Gateway
- Express + Apollo Subgraph
- MongoDB (1 shared instance)
- Typescript
- Docker Compose

## 🧪 Features
- 🔐 Auth with JWT
- 👤 Users (Students / Professors)
- 🏫 Classes (with student assignments)
- 📊 Grades (by course and class)

## 🚀 Start (Dev)

For each services:
```bash
cp .env.example .env
```

```bash
docker-compose up --build
```

Access gateway at http://localhost:4000/graphql
